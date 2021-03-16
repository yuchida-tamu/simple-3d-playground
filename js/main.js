import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

import { Player, PlayerController } from './player.js';
let tmp = new THREE.Vector3();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x383838, 1);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//Ground (Plane geometry)
const gPlane = new THREE.PlaneGeometry(500, 500);
const mPlane = new THREE.MeshStandardMaterial({
  color: 0xb0602c,
});
const plane = new THREE.Mesh(gPlane, mPlane);
//enable cast shadow
plane.receiveShadow = true;

//rotate the plane to use it as the ground
plane.rotation.x = -THREE.Math.degToRad(90); //.rotation is defined by raidans
plane.position.y = -100;
//add plane to the scene
scene.add(plane);

//Lighting
const intensity = 3;
const distance = 200;
const angle = 0.9;
const penumbla = 0.3;
const decay = 0.4;
const lightColor = [0x95cfa9, 0xba47b8, 0xcffff1];

// const light = new THREE.AmbientLight(0xffffff, 1);
// scene.add(light);

const directionalL = new THREE.DirectionalLight(lightColor[2]);
directionalL.position.y = 100;
directionalL.castShadow = true;
directionalL.intensity = 2;
scene.add(directionalL);

// const spotL = new THREE.SpotLight(
//   lightColor[0],
//   intensity,
//   distance,
//   angle,
//   penumbla,
//   decay
// );
// spotL.position.y = 15;
// spotL.castShadow = true;
// spotL.shadow.mapSize.width = 512; // default
// spotL.shadow.mapSize.height = 512; // default
// spotL.shadow.camera.near = 0.5; // default
// spotL.shadow.camera.far = 500; // default
// spotL.shadow.focus = 1; // default

// scene.add(spotL);

//Create a helper for the shadow camera (optional)
// const helper = new THREE.CameraHelper(spotL.shadow.camera);
// scene.add(helper);

//Sphere
const gSphere = new THREE.SphereGeometry(3, 16, 16);
const mSphere = new THREE.MeshStandardMaterial({
  color: 0xc18947,
});
const sphere = new THREE.Mesh(gSphere, mSphere);
sphere.position.y = -95;

//enable shadow
sphere.castShadow = true;
sphere.receiveShadow = true;

camera.position.set(
  sphere.position.x + 100,
  sphere.position.y + 100,
  sphere.position.z + 50
);
// camera.position.y = 100;
// camera.position.z = 200;
//camera.rotation.y = -THREE.Math.degToRad(-15);
// camera.rotation.x = -THREE.Math.degToRad(30);

const player = new Player(5, sphere);
const controller = new PlayerController(player);

//scene.add(sphere);
scene.add(player.getBody());

controller.init();

function animate() {
  requestAnimationFrame(animate);
  controller.move();
  camera.lookAt(player.body.position);
  tmp.set(
    sphere.position.x + 20,
    sphere.position.y + 100,
    sphere.position.z + 50
  );
  camera.position.lerp(tmp, 0.3);
  renderer.render(scene, camera);
}

animate();
