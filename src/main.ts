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

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: false })
const material2 = new THREE.MeshNormalMaterial({ wireframe: true })
const radius = .3;
let widthSegments = 1;
let heightSegments = 1;
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

const sphere = new THREE.Mesh(sphereGeometry, material2);
const cube = new THREE.Mesh(geometry, material)

const btnSphere = document.querySelector('.btnSphere');
const btnSphereReset = document.querySelector('.btnSphereReset');
let resetSphere = false;

cube.scale.set(.35, .35, .35);
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