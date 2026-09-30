/* ============================================================================
   ARPIT'S PORTFOLIO — holograms.js
   3D Holographic FX Objects (Aura, Scanner, Orbitals, Constellation, Beacon)
   ============================================================================ */

import * as THREE from "three";
import { fxGroup } from "./scene.js";

export let aboutAura = null;
export let projectsScanner = null;
export let skillsOrbitals = null;
export let experienceConstellation = null;
export let contactBeacon = null;

export const fxSpeeds = {
  scannerSpeedMult: 1.0,
  orbitalsSpeedMult: 1.0,
  constellationSpeedMult: 1.0,
  beaconPulseMult: 1.0
};

function createAboutFX() {
  const g = new THREE.Group();
  g.name = "aboutFX";

  // Celestial halo ring tilted around the head (centered at y: 0.55)
  const haloGeo = new THREE.TorusGeometry(1.35, 0.05, 16, 64);
  const haloMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#FF2A85"),
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  halo.position.y = 0.55;
  halo.rotation.x = Math.PI * 0.38;
  halo.rotation.y = Math.PI * 0.12;
  g.add(halo);

  // Soft secondary stardust ring
  const innerHaloGeo = new THREE.RingGeometry(1.15, 1.28, 48);
  const innerHaloMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#FFB830"),
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });
  const innerHalo = new THREE.Mesh(innerHaloGeo, innerHaloMat);
  innerHalo.position.y = 0.55;
  innerHalo.rotation.x = Math.PI * 0.38;
  innerHalo.rotation.y = Math.PI * 0.12;
  g.add(innerHalo);

  // 30 Floating shimmering stardust points orbiting the head
  const pCount = 30;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const angle = (i / pCount) * Math.PI * 2;
    const r = 1.25 + (Math.random() - 0.5) * 0.4;
    pPos[i * 3] = Math.cos(angle) * r;
    pPos[i * 3 + 1] = 0.55 + (Math.random() - 0.5) * 0.8;
    pPos[i * 3 + 2] = Math.sin(angle) * r;
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: new THREE.Color("#FFD700"),
    size: 0.18,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending
  });
  const starPoints = new THREE.Points(pGeo, pMat);
  g.add(starPoints);

  g.visible = false;
  fxGroup.add(g);
  return g;
}

function createProjectsFX() {
  const g = new THREE.Group();
  g.name = "projectsFX";

  // Cyan laser scanner ring (thick and luminous)
  const ringGeo = new THREE.TorusGeometry(1.45, 0.055, 16, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#00F0FF"),
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  g.add(ring);

  // Outer reticle ring with tick marks
  const outerRingGeo = new THREE.RingGeometry(1.5, 1.66, 48);
  const outerRingMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#2EC4B6"),
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });
  const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
  outerRing.rotation.x = Math.PI / 2;
  g.add(outerRing);

  // 4 Corner holographic brackets with thickness
  const cornerMat = new THREE.LineBasicMaterial({
    color: 0x00F0FF,
    transparent: true,
    opacity: 0.95
  });
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const bracketGeo = new THREE.BufferGeometry();
    const bx = Math.cos(angle) * 1.6;
    const bz = Math.sin(angle) * 1.6;
    bracketGeo.setAttribute('position', new THREE.Float32BufferAttribute([
      bx, 0.35, bz,
      bx, 0.0, bz,
      bx * 0.85, 0.0, bz * 0.85
    ], 3));
    const bracketLine = new THREE.Line(bracketGeo, cornerMat);
    g.add(bracketLine);
  }

  // MoCap HUD scanning crosslines
  const crossGeo = new THREE.BufferGeometry();
  crossGeo.setAttribute('position', new THREE.Float32BufferAttribute([
    -1.4, 0, 0, 1.4, 0, 0,
    0, 0, -1.4, 0, 0, 1.4
  ], 3));
  const crossMat = new THREE.LineBasicMaterial({
    color: 0x00F0FF,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  const crossLines = new THREE.LineSegments(crossGeo, crossMat);
  g.add(crossLines);

  g.visible = false;
  fxGroup.add(g);
  return g;
}

function createSkillsFX() {
  const g = new THREE.Group();
  g.name = "skillsFX";

  // Gyroscopic Ring 1 (Gold)
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#FFD700"),
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending
  });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.055, 16, 64), ringMat1);
  ring1.position.y = 0.35;
  ring1.rotation.x = Math.PI * 0.35;
  ring1.rotation.y = Math.PI * 0.15;
  g.add(ring1);

  // Gyroscopic Ring 2 (Arc Teal)
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#2EC4B6"),
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.055, 16, 64), ringMat2);
  ring2.position.y = 0.35;
  ring2.rotation.x = -Math.PI * 0.35;
  ring2.rotation.y = -Math.PI * 0.2;
  g.add(ring2);

  // 36 Orbital energy points
  const pCount = 36;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const a = (i / pCount) * Math.PI * 2;
    pPos[i * 3] = Math.cos(a) * 1.55;
    pPos[i * 3 + 1] = 0.35 + (Math.random() - 0.5) * 0.6;
    pPos[i * 3 + 2] = Math.sin(a) * 1.55;
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: new THREE.Color("#FFD700"),
    size: 0.20,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending
  });
  const orbitalPoints = new THREE.Points(pGeo, pMat);
  g.add(orbitalPoints);

  g.visible = false;
  fxGroup.add(g);
  return g;
}

function createExperienceFX() {
  const g = new THREE.Group();
  g.name = "experienceFX";

  const nodeCount = 20;
  const nodeGeo = new THREE.SphereGeometry(0.08, 12, 12);
  const nodeMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#E0E7FF"),
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending
  });

  const nodePositions = [];
  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / nodeCount);
    const theta = Math.sqrt(nodeCount * Math.PI) * phi;
    const r = 1.6 + (i % 3) * 0.12;
    const pos = new THREE.Vector3(
      r * Math.cos(theta) * Math.sin(phi),
      0.35 + r * Math.sin(theta) * Math.sin(phi) * 0.65,
      r * Math.cos(phi)
    );
    nodePositions.push(pos);

    const mesh = new THREE.Mesh(nodeGeo, nodeMat);
    mesh.position.copy(pos);
    g.add(mesh);
  }

  // Interconnecting neural constellation lines
  const linePoints = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (nodePositions[i].distanceTo(nodePositions[j]) < 1.35) {
        linePoints.push(nodePositions[i], nodePositions[j]);
      }
    }
  }
  const linesGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
  const linesMat = new THREE.LineBasicMaterial({
    color: new THREE.Color("#8E2DE2"),
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  const lines = new THREE.LineSegments(linesGeo, linesMat);
  g.add(lines);

  g.visible = false;
  fxGroup.add(g);
  return g;
}

function createContactFX() {
  const g = new THREE.Group();
  g.name = "contactFX";

  const ringGeo = new THREE.RingGeometry(0.7, 0.88, 48);
  const rings = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? new THREE.Color("#FF2A85") : new THREE.Color("#00F5D4"),
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.Mesh(ringGeo, mat);
    mesh.position.y = -0.2;
    mesh.rotation.x = Math.PI / 2;
    mesh.userData = { phase: i * (Math.PI / 3) };
    rings.push(mesh);
    g.add(mesh);
  }
  g.userData.rings = rings;

  // Overhead communication halo
  const commGeo = new THREE.TorusGeometry(0.75, 0.04, 12, 48);
  const commMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#00F5D4"),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const commMesh = new THREE.Mesh(commGeo, commMat);
  commMesh.position.y = 1.05;
  commMesh.rotation.x = Math.PI / 2;
  g.add(commMesh);

  g.visible = false;
  fxGroup.add(g);
  return g;
}


export function initSectionFX() {
  aboutAura = createAboutFX();
  projectsScanner = createProjectsFX();
  skillsOrbitals = createSkillsFX();
  experienceConstellation = createExperienceFX();
  contactBeacon = createContactFX();
}

export function updateHologramFX(t) {
  if (aboutAura && aboutAura.visible) {
    aboutAura.children[0].rotation.z = t * 0.4;
    aboutAura.children[0].rotation.y = Math.sin(t * 0.6) * 0.25;
    aboutAura.children[1].rotation.z = -t * 0.3;
    aboutAura.children[2].rotation.y = t * 0.6;
  }
  if (projectsScanner && projectsScanner.visible) {
    const scanY = 0.4 + Math.sin(t * 2.2 * fxSpeeds.scannerSpeedMult) * 0.8;
    projectsScanner.children[0].position.y = scanY;
    projectsScanner.children[0].rotation.z = t * 0.4 * fxSpeeds.scannerSpeedMult;
    projectsScanner.children[1].position.y = scanY;
    projectsScanner.children[1].rotation.z = -t * 0.6 * fxSpeeds.scannerSpeedMult;
    if (projectsScanner.children[3]) {
      projectsScanner.children[3].position.y = scanY;
    }
  }
  if (skillsOrbitals && skillsOrbitals.visible) {
    skillsOrbitals.children[0].rotation.z = t * 1.8 * fxSpeeds.orbitalsSpeedMult;
    skillsOrbitals.children[1].rotation.z = -t * 1.5 * fxSpeeds.orbitalsSpeedMult;
    skillsOrbitals.children[2].rotation.y = t * 2.2 * fxSpeeds.orbitalsSpeedMult;
  }
  if (experienceConstellation && experienceConstellation.visible) {
    experienceConstellation.rotation.y = t * 0.28 * fxSpeeds.constellationSpeedMult;
    experienceConstellation.rotation.x = Math.sin(t * 0.25) * 0.12;
  }
  if (contactBeacon && contactBeacon.visible) {
    contactBeacon.userData.rings.forEach(r => {
      const s = 0.5 + ((t * 0.9 * fxSpeeds.beaconPulseMult + r.userData.phase) % 2.0);
      r.scale.set(s, s, s);
      r.material.opacity = Math.max(0, 0.85 * (1 - s / 2.3));
    });
    if (contactBeacon.children[3]) {
      contactBeacon.children[3].rotation.z = t * 1.2;
    }
  }
}
