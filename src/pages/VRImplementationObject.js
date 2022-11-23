import { Component } from "react";
//import three
import * as THREE from "three";
//In order to navigate inside the 3D Scene that we created;
//we import OrbitControls from three js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//import VR Button
import { VRButton } from "three/addons/webxr/VRButton.js";

//Cubemap
import right from "../assets/skybox/right.png";
import left from "../assets/skybox/left.png";
import top from "../assets/skybox/top.png";
import bottom from "../assets/skybox/bottom.png";
import back from "../assets/skybox/back.png";
import front from "../assets/skybox/front.png";

//CSS
import "./VRImplementation.css";

export default class VRImplementationObject extends Component {
  componentDidMount() {
    //create scene
    var scene = new THREE.Scene();
    //create camera
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    //set position of camera
    camera.position.set(45, 15, 20);
    //create the renderer
    const canvas = document.getElementById("bg");
    var renderer = new THREE.WebGLRenderer({
      canvas,
    });
    //set size of the rendered scene
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.xr.enabled = true;
    //select where to render the scene
    this.mount.appendChild(renderer.domElement);
    this.mount.appendChild(VRButton.createButton(renderer));
    // document.body.appendChild(VRButton.createButton(renderer));

    //Adding Lights

    //Ambient Light: This light globally illuminates all objects in the scene equally.
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    //Spot Light:This light gets emitted from a single point in one direction,
    //along a cone that increases in size the further from the light it gets.
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    //Point Light:A light that gets emitted from a single point in all directions.
    //A common use case for this is to replicate the light emitted from a bare lightbulb.
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    //Using helpers
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);

    //Add orbit controls: to move inside our scene
    //listens to dom events on the mouse and updates the camera position accordingly
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.enableZoom = false;

    // if window resizes
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      //3D objects/texts... can cast shadows
      renderer.shadowMap.enabled = true;
    };
    window.addEventListener("resize", () => onWindowResize(), false);

    //Adding an object
    var cubeGeometry = new THREE.BoxGeometry(16, 16, 16);
    var cubeMaterial = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    //add the object to our scene
    scene.add(cube);

    //Adding SkyBox
    //SkyBox Loader
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([right, left, top, bottom, front, back]);
    //add the texture to our background
    scene.background = texture;

    //Animate funtion
    var animate = function () {
      //Uncomment the below two lines if you want to create an animation for the cube to rotate
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      //To make sure that the changes are reflected in the UI
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();

    // renderer.setAnimationLoop(function () {
    //   renderer.render(scene, camera);
    // });
  }
  render() {
    return (
      <div ref={(ref) => (this.mount = ref)}>
        <canvas id="bg"></canvas>
      </div>
    );
  }
}
