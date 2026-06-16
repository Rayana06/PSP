import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { getUserModelById } from "./idb.js";

const canvas = document.getElementById("detailCanvas");
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const frontViewBtn = document.getElementById("frontView");
const backViewBtn = document.getElementById("backView");
const leftViewBtn = document.getElementById("leftView");
const rightViewBtn = document.getElementById("rightView");

const params = new URLSearchParams(location.search);
const modelId = params.get("id");
const modelType = params.get("type");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);

const camera = new THREE.PerspectiveCamera(
  45,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.set(2.5, 2.5, 4);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.4);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(4, 5, 4);
scene.add(dirLight);

const loader = new GLTFLoader();

const defaultMap = {
  "teacher-model": ["models/teacher.glb"]
};

async function loadModel() {
  if (modelType === "default") {
    const paths = defaultMap[modelId] || [];
    await loadDefaultDetailModels(paths);
  } else {
    const item = await getUserModelById(modelId);
    if (item) {
      await loadUserDetailModel(item.buffer);
    }
  }
}

function loadDefaultDetailModels(paths) {
  return Promise.all(
    paths.map((path, index) => {
      return new Promise(resolve => {
        loader.load(
          path,
          gltf => {
            const object = gltf.scene;
            normalizeModelToFloor(object);
            object.position.x = index * 1.8 - ((paths.length - 1) * 0.9);
            scene.add(object);

            fitCameraToScene(camera, scene, 2.2);
            resolve();
          },
          undefined,
          error => {
            console.error("Ошибка загрузки detail-модели:", path, error);
            resolve();
          }
        );
      });
    })
  );
}

function loadUserDetailModel(buffer) {
  return new Promise(resolve => {
    loader.parse(
      buffer,
      "",
      gltf => {
        const object = gltf.scene;
        normalizeModelToFloor(object);
        scene.add(object);
        fitCameraToScene(camera, scene, 2.2);
        resolve();
      },
      error => {
        console.error("Ошибка чтения пользовательской модели:", error);
        resolve();
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

function fitCameraToScene(camera, scene, offset = 1.8) {
  const box = new THREE.Box3().setFromObject(scene);
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

zoomInBtn.addEventListener("click", () => {
  camera.position.multiplyScalar(0.9);
});

zoomOutBtn.addEventListener("click", () => {
  camera.position.multiplyScalar(1.1);
});

frontViewBtn.addEventListener("click", () => {
  camera.position.set(0, 2, 5);
});

backViewBtn.addEventListener("click", () => {
  camera.position.set(0, 2, -5);
});

leftViewBtn.addEventListener("click", () => {
  camera.position.set(-5, 2, 0);
});

rightViewBtn.addEventListener("click", () => {
  camera.position.set(5, 2, 0);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

await loadModel();
animate();