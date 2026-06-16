import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { saveUserModel, getAllUserModels } from "./idb.js";

const gallery = document.getElementById("gallery");
const fileInput = document.getElementById("fileInput");

const defaultModels = [
  {
    id: "teacher-model",
    title: "Модель преподавателя",
    description: "3D-модель по теме проекта",
    type: "default",
    models: ["models/teacher.glb"]
  }
];

async function init() {
  const userModels = await getAllUserModels();

  const preparedUserModels = userModels.map(item => ({
    id: item.id,
    title: item.name,
    description: "Пользовательская модель",
    type: "user",
    fileName: item.name
  }));

  const allModels = [...defaultModels, ...preparedUserModels];
  gallery.innerHTML = "";

  allModels.forEach(model => {
    const card = createCard(model);
    gallery.appendChild(card);
  });
}

function createCard(model) {
  const card = document.createElement("article");
  card.className = "model-card";

  const preview = document.createElement("div");
  preview.className = "preview-box";

  const info = document.createElement("div");
  info.className = "model-info";
  info.innerHTML = `
    <h3>${model.title}</h3>
    <p>${model.description}</p>
  `;

  card.appendChild(preview);
  card.appendChild(info);

  renderSingleFramePreview(preview, model);

  card.addEventListener("click", () => {
    const params = new URLSearchParams();
    params.set("id", model.id);
    params.set("type", model.type);
    location.href = `detail.html?${params.toString()}`;
  });

  return card;
}

function renderSingleFramePreview(container, model) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf8f8f8);

  const width = container.clientWidth || 300;
  const height = container.clientHeight || 220;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(3, 5, 4);
  scene.add(dirLight);

  const loader = new GLTFLoader();

  if (model.type === "default") {
    loadDefaultPreviewModels(loader, scene, camera, model.models, () => {
      renderer.render(scene, camera);
    });
  } else {
    loadUserPreviewModel(loader, scene, camera, model.id, () => {
      renderer.render(scene, camera);
    });
  }
}

function loadDefaultPreviewModels(loader, scene, camera, modelPaths, onDone) {
  let loadedCount = 0;

  modelPaths.forEach((path, index) => {
    loader.load(
      path,
      gltf => {
        const object = gltf.scene;
        object.position.x = index * 1.5 - ((modelPaths.length - 1) * 0.75);
        normalizeModelToFloor(object);
        scene.add(object);

        fitCameraToObject(camera, object, 1.8);

        loadedCount++;
        if (loadedCount === modelPaths.length) onDone();
      },
      undefined,
      error => {
        console.error("Ошибка загрузки модели:", path, error);
        loadedCount++;
        if (loadedCount === modelPaths.length) onDone();
      }
    );
  });
}

function normalizeModelToFloor(object) {
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());

  object.position.x -= center.x;
  object.position.z -= center.z;
  object.position.y -= box.min.y;
}

function fitCameraToObject(camera, object, offset = 1.5) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance = maxSize / (2 * Math.tan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = offset * Math.max(fitHeightDistance, fitWidthDistance);

  camera.position.set(center.x + distance, center.y + distance * 0.6, center.z + distance);
  camera.lookAt(center);
  camera.updateProjectionMatrix();
}

fileInput.addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;

  const buffer = await file.arrayBuffer();

  await saveUserModel({
    id: `user-${Date.now()}`,
    name: file.name,
    buffer
  });

  await init();
  fileInput.value = "";
});

init();