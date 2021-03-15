import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { Player, PlayerController } from './player.js';

let isMovingH = false;
let isMovingV = false;
let isRight = false;
let isForward = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.x = 0;
camera.position.y = 50;
camera.position.z = 500;
// camera.rotation.y = 0;
// camera.rotation.x = 0;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Ground (Plane geometry)
const gPlane = new THREE.PlaneGeometry(200, 200);
const mPlane = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const plane = new THREE.Mesh(gPlane, mPlane);
//rotate the plane to use it as the ground
plane.rotation.x = -THREE.Math.degToRad(90); //.rotation is defined by raidans
plane.position.y = -100;
//add plane to the scene
scene.add(plane);

//Sphere
const gSphere = new THREE.SphereGeometry(4, 8, 8);
const mSphere = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const sphere = new THREE.Mesh(gSphere, mSphere);
sphere.position.y = -100;

const player = new Player(5, sphere);
const controller = new PlayerController(player);
console.log(controller.character);

//scene.add(sphere);
scene.add(player.getBody());

controller.init();

function animate() {
  requestAnimationFrame(animate);
  controller.move();

  renderer.render(scene, camera);
}

animate();
