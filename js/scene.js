/* ============================================================================
   ARPIT'S PORTFOLIO — scene.js
   Three.js Scene, Camera, Renderer, OrbitControls, Starfield, Lights & Model
   ============================================================================ */

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const container = document.getElementById("canvas-container");
export let W = window.innerWidth;
export let H = window.innerHeight;

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(W, H);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);
camera.position.z = W <= 820 ? Math.max(5.5, 5 / Math.min(1, W / 500)) : 5;

export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = W <= 820 ? 3.2 : 2.5;
controls.maxDistance = W <= 820 ? 10 : 9;
controls.minPolarAngle = Math.PI * 0.2;
controls.maxPolarAngle = Math.PI * 0.8;
controls.autoRotate = false;
controls.target.set(0, 0, 0);

(function buildStars() {
  const geo = new THREE.BufferGeometry();
  const N = 220;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const pal = [
    new THREE.Color("#E8198B"),
    new THREE.Color("#2EC4B6"),
    new THREE.Color("#FFB830"),
    new THREE.Color("#F0EBF4")
  ];
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - .5) * 18;
    pos[i * 3 + 1] = (Math.random() - .5) * 11;
    pos[i * 3 + 2] = (Math.random() - .5) * 5 - 2;
    const c = pal[Math.floor(Math.random() * pal.length)];
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size: .035, vertexColors: true, transparent: true, opacity: .55 });
  const stars = new THREE.Points(geo, mat);
  stars.name = "stars";
  scene.add(stars);
})();

export let character = null;
export let rawModel = null;
export let charGlow = null;
export let mixer = null;
export let baseScale = 1;
export let basePosY = 0;

export const fxGroup = new THREE.Group();
fxGroup.name = "fxGroup";
fxGroup.raycast = () => { };

export const cardHoverGazeOffset = { x: 0, y: 0, z: 0 };
export let hovering = false;
export function setHovering(val) { hovering = val; }

export const mouse = new THREE.Vector2();
export const ray = new THREE.Raycaster();
export const clock = new THREE.Clock();

export let mouseDownPos = { x: 0, y: 0 };
export let isDragging = false;
export function setIsDragging(val) { isDragging = val; }
export const DRAG_THRESHOLD = 5;

export function buildGlow() {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 16, 16),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color("#E8198B"),
      transparent: true, opacity: 0.04,
      blending: THREE.AdditiveBlending
    })
  );
  mesh.position.set(0, 0.25, -0.2);
  mesh.raycast = () => { };
  return mesh;
}

const onModelLoadedCallbacks = [];
export function onModelLoaded(cb) {
  if (character) {
    cb(character);
  } else {
    onModelLoadedCallbacks.push(cb);
  }
}

const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "./assets/Portrait_9044_autosave.glb",
  (gltf) => {
    rawModel = gltf.scene;

    const box = new THREE.Box3().setFromObject(rawModel);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.0 / maxDim;
    rawModel.scale.setScalar(scale);

    box.setFromObject(rawModel);
    box.getCenter(center);
    const scaledSize = box.getSize(new THREE.Vector3());

    const characterGroup = new THREE.Group();
    characterGroup.name = "characterPivot";

    rawModel.position.set(-center.x, -center.y - scaledSize.y * 0.08, -center.z);
    characterGroup.add(rawModel);

    charGlow = buildGlow();
    characterGroup.add(charGlow);

    characterGroup.add(fxGroup);
    fxGroup.position.set(0, 0, 0);

    character = characterGroup;
    baseScale = 1.0;
    basePosY = 0;
    character.position.set(0, 0, 0);

    scene.add(character);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(rawModel);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
    }

    console.log("GLB loaded and centered in pivot container:", "./assets/Portrait_9044_autosave.glb");
    onModelLoadedCallbacks.forEach(cb => {
      try { cb(character); } catch (e) { console.error("Model callback error:", e); }
    });
  },
  (xhr) => {
    const pct = Math.round((xhr.loaded / xhr.total) * 100);
    console.log("Loading GLB:", pct + "%");
  },
  (err) => {
    console.error("GLB failed to load:", err);
  }
);

export const ambLight = new THREE.AmbientLight(0xffffff, 0.55);
scene.add(ambLight);

export const mLight = new THREE.PointLight(0xE8198B, 2.2, 10);
mLight.position.set(-2.5, 1.5, 2.5);
scene.add(mLight);

export const tLight = new THREE.PointLight(0x2EC4B6, 1.6, 10);
tLight.position.set(2.5, -1, 2.5);
scene.add(tLight);

export const rimLight = new THREE.PointLight(0xFFB830, 1.8, 8);
rimLight.position.set(0, 2.5, -2.5);
scene.add(rimLight);

export function charScreenPos() {
  if (!character) return { x: W / 2, y: H / 2 };
  const v = new THREE.Vector3();
  character.getWorldPosition(v);
  v.y += 0.4;
  v.project(camera);
  return { x: (v.x + 1) / 2 * W, y: -(v.y - 1) / 2 * H };
}

export function handleWindowResize() {
  W = window.innerWidth;
  H = window.innerHeight;
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  renderer.setSize(W, H);

  controls.minDistance = W <= 820 ? 3.2 : 2.5;
  controls.maxDistance = W <= 820 ? 10 : 9;

  if (W <= 820) {
    camera.position.z = Math.max(5.5, 5 / Math.min(1, W / 500));
  } else {
    camera.position.z = 5;
  }
}
