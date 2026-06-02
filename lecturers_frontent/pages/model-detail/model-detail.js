import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class ModelDetailPage {
  constructor(parent, modelPath, onBack) {
    this.parent = parent;
    this.modelPath = modelPath;
    this.onBack = onBack;
    this.animationId = null;
  }

  render() {
    this.parent.innerHTML = `
      <div class="header">
        <button class="home-btn" id="backBtn">Домой</button>
        <h1>Детальный просмотр модели</h1>
      </div>

      <main class="detail-layout">
        <div class="viewer-wrapper">
          <canvas id="detailCanvas"></canvas>
        </div>

        <aside class="controls-panel">
          <button id="zoomIn">+</button>
          <button id="zoomOut">−</button>
          <button id="rightView">Вид справа</button>
          <button id="leftView">Вид слева</button>
          <button id="backView">Вид сзади</button>
          <button id="frontView">Вид спереди</button>
        </aside>
      </main>
    `;

    document.getElementById("backBtn").addEventListener("click", () => {
      cancelAnimationFrame(this.animationId);
      this.onBack();
    });

    this.initViewer();
  }

  initViewer() {
    const canvas = document.getElementById("detailCanvas");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    const width = canvas.clientWidth || canvas.parentElement.clientWidth || 800;
    const height = canvas.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(2.5, 2.5, 4);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.4));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(4, 5, 4);
    scene.add(dirLight);

    const loader = new GLTFLoader();

    loader.load(
      this.modelPath,
      gltf => {
        const object = gltf.scene;
        normalizeModelToFloor(object);
        scene.add(object);
        fitCameraToScene(camera, scene, 2.2);
      },
      undefined,
      error => console.error("Ошибка загрузки 3D-модели:", error)
    );

    document.getElementById("zoomIn").addEventListener("click", () => camera.position.multiplyScalar(0.9));
    document.getElementById("zoomOut").addEventListener("click", () => camera.position.multiplyScalar(1.1));

    document.getElementById("frontView").addEventListener("click", () => setView(camera, 0, 2, 5));
    document.getElementById("backView").addEventListener("click", () => setView(camera, 0, 2, -5));
    document.getElementById("leftView").addEventListener("click", () => setView(camera, -5, 2, 0));
    document.getElementById("rightView").addEventListener("click", () => setView(camera, 5, 2, 0));

    const resizeViewer = () => {
      if (!document.body.contains(canvas)) return;
      const newWidth = canvas.clientWidth || canvas.parentElement.clientWidth || 800;
      const newHeight = canvas.clientHeight || 500;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", resizeViewer);

    const animate = () => {
      if (!document.body.contains(canvas)) {
        window.removeEventListener("resize", resizeViewer);
        return;
      }
      this.animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  }
}

function setView(camera, x, y, z) {
  camera.position.set(x, y, z);
  camera.lookAt(0, 1, 0);
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
