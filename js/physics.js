const cannonMin = require('./cannon.min');

//setup Physics Cannonjs
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x383838, 1);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const world = new CANNON.World();
const fixedTimeStamp = 1.0 / 60;
const damping = 0.01;

world.broadphase = new CANNON.NaiveBroadphase();
world.gravity.set(0, -10, 0);
//const debugRenderer = new THREE.CannonDebugRenderer(scene, world);

const groundShape = new CANNON.Plane();
const groundMaterial = new CANNON.Material();
const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
groundBody.addShape(groundShape);
world.add(groundBody);

const shapes = {};
shapes.sphere = new CANNON.Sphere(0.5);
shapes.box = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));

function addBody(sphere = true) {
  const material = new CANNON.Material();
  const body = new CANNON.Body({ mass: 5, material: material });
  if (sphere) {
    body.addShape(shapes.sphere);
  } else {
    body.addShape(shapes.box);
  }
  const x = Math.random() * 0.3 + 1;
  body.position.set(sphere ? -x : x, 5, 0);
  body.linearDamping = damping;
  world.add(body);

  const material_ground = new CANNON.ContactMaterial(groundMaterial, material, {
    friction: 0.0,
    restitution: sphere ? 0.9 : 0.4,
  });
  world.addContactMaterial(material_ground);
}

function animate() {
  requestAnimationFrame(animate);
  world.step(fixedTimeStamp);

  renderer.render(scene, camera);
}
animate();
