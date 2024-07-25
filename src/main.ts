import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
const radius = .3;
let widthSegments = 1;
let heightSegments = 1;

const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
const geometry = new THREE.BoxGeometry()
//const thorusGeometry = new THREE.TorusGeometry()

const material = new THREE.MeshNormalMaterial({ wireframe: false })
const material2 = new THREE.MeshNormalMaterial({ wireframe: true })


/*const torRadius;
const torTubeRadius;
const torRaidialSegments;
const torTubularSegments; */


let cubeScale = .1;
//cubescaleFinalValue = .35
const sphere = new THREE.Mesh(sphereGeometry, material2);
const cube = new THREE.Mesh(geometry, material)


const btnSphere = document.querySelector('.btnSphere');
const btnSphereReset = document.querySelector('.btnSphereReset');
const btnCube = document.querySelector('.btnCube');
const btnCubeReset = document.querySelector('.btnCubeReset');

let resetSphere = false;
let resetCube = false;

cube.scale.set(cubeScale, cubeScale, cubeScale);
cube.position.set(0, .1, 0);
sphere.position.set(-1.3, .1, 0)
scene.add(cube)
scene.add(sphere);

btnSphere.addEventListener('click', function () {
  if (resetSphere === false) {
    animateSegments();
    btnSphere.disabled = true;
  }


})

function animateSegments() {
  let targetWidthSegments = 33;
  let targetHeightSegments = 33;
  let step = .25;

  function updateSegments() {
    if (widthSegments < targetWidthSegments) {
      widthSegments += step;
    }

    if (heightSegments < targetHeightSegments) {
      heightSegments += step;
    }

    const newSphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    sphere.geometry.dispose();
    sphere.geometry = newSphereGeometry;

    if (widthSegments < targetWidthSegments || heightSegments < targetHeightSegments) {
      requestAnimationFrame(updateSegments);// Request the browser to call updateSegments() on the next frame
    }
    else {
      resetSphere = true;
      btnSphere.disabled = false;
    }

  }

  updateSegments();

  // resetSphere = true;
}

btnSphereReset.addEventListener('click', function () {
  if (resetSphere === true) {
    resetSegments();
    btnSphereReset.disabled = true;
  }


})

function resetSegments() {
  let targetWidthSegments = 1;
  let targetHeightSegments = 1;
  let step = 0.3;

  function updateSegments() {
    if (widthSegments > targetWidthSegments) {
      widthSegments -= step;
    }

    if (heightSegments > targetHeightSegments) {
      heightSegments -= step;
    }

    const newSphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    sphere.geometry.dispose();
    sphere.geometry = newSphereGeometry;

    if (widthSegments > targetWidthSegments || heightSegments > targetHeightSegments) {
      requestAnimationFrame(updateSegments);
    }
    else {
      resetSphere = false;
      btnSphereReset.disabled = false;
    }

  }

  updateSegments();
  //resetSphere = false;
}

btnCube.addEventListener('click', function () {
  let targetCubeScale = 0.35;
  let scaleStep = 0.01;

  if (resetCube === false) {
    scaleCube();
    btnCube.disabled = true;
  }

  function scaleCube() {
    if (cubeScale < targetCubeScale) {
      cubeScale += scaleStep;
      cube.scale.set(cubeScale, cubeScale, cubeScale);
    }

    if (cubeScale < targetCubeScale) {
      requestAnimationFrame(scaleCube);
    }
    else {
      btnCube.disabled = false;
      resetCube = true;
    }
  }

  scaleCube();
});

btnCubeReset.addEventListener('click', function () {
  let targetCubeScale = 0.1; // Set the target scale to the initial scale
  let scaleStep = 0.01;

  if (resetCube === true) {
    scaleCubeReset();
    btnCubeReset.disabled = true;
  }

  function scaleCubeReset() { // Rename the function to avoid conflict
    if (cubeScale >= targetCubeScale) {
      cubeScale -= scaleStep;
      cube.scale.set(cubeScale, cubeScale, cubeScale);
    }

    if (cubeScale >= targetCubeScale) {
      requestAnimationFrame(scaleCubeReset);
    }
    else {
      btnCubeReset.disabled = false;
      resetCube = false;
    }
  }

  scaleCubeReset();
});

function animate() {
  requestAnimationFrame(animate)// Request the browser to call animate() on the next frame



  //const newSphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  //sphere.geometry.dispose(); // Dispose old geometry to free up memory
  //sphere.geometry = newSphereGeometry; // Assign the new geometry to the sphere


  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  sphere.rotation.x += 0.01
  sphere.rotation.y += 0.01



  renderer.render(scene, camera)
}

animate()