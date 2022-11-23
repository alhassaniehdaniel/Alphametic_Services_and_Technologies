import React, { Component } from "react";
import * as THREE from "three";
//In order to navigate inside the 3D Scene that we created;
//we import OrbitControls from three js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//imports to load Text
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
//imports to load Models
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import head from "../assets/models/scene.gltf";
//import VR Button
// import { VRButton } from "three/addons/webxr/VRButton.js";

//CubeMap
import right from "../assets/skybox/right.png";
import left from "../assets/skybox/left.png";
import top from "../assets/skybox/top.png";
import bottom from "../assets/skybox/bottom.png";
import back from "../assets/skybox/back.png";
import front from "../assets/skybox/front.png";

//CSS
import "./VRImplementation.css";

export default class VRImplementationText extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    //camera.position.set allows you to set the
    //initial[x, y, z] of the camera position
    camera.position.set(0, 20, 100);
    const canvas = document.getElementById("bg");
    var renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.xr.enabled = true;
    this.mount.appendChild(renderer.domElement);
    // this.mount.appendChild(VRButton.createButton(renderer));

    //Adding a plane
    const planeGeometry = new THREE.PlaneGeometry(200, 200);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x0a7d15 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    //Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    //Adding SkyBox
    const skyBoxloader = new THREE.CubeTextureLoader();
    const texture = skyBoxloader.load([right, left, top, bottom, front, back]);
    scene.background = texture;

    //Adding Lights
    //Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    //Point Lights
    const pointLight1 = new THREE.PointLight(0xff6666, 1, 100);
    pointLight1.castShadow = true;
    pointLight1.shadow.mapSize.width = 4096;
    pointLight1.shadow.mapSize.height = 4096;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x33ff33, 1, 100);
    pointLight2.castShadow = true;
    pointLight2.shadow.mapSize.width = 4096;
    pointLight2.shadow.mapSize.height = 4096;
    scene.add(pointLight2);

    //Using helpers
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(gridHelper);

    //Text Loading
    const textLoader = new FontLoader();
    textLoader.load("/fonts/Soria_Soria.json", (soria) => {
      const textGeometry = new TextGeometry(
        "Hello There \n This is a Text Loaded \n with Shadows after shining Light on them",
        {
          size: 6,
          height: 2,
          font: soria,
        }
      );
      const textMaterial = new THREE.MeshNormalMaterial();
      const text = new THREE.Mesh(textGeometry, textMaterial);
      text.castShadow = true;
      text.position.x = -50;
      text.position.y = 25;
      scene.add(text);
    });

    //Model Loading
    const modelLoader = new GLTFLoader();
    modelLoader.load(head, (gtlf) => {
      gtlf.scene.traverse((h) => {
        h.castShadow = true;
      });
      scene.add(gtlf.scene);
    });

    // if window resizes
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      //3D objects/texts... can cast shadows
      renderer.shadowMap.enabled = true;
    };
    window.addEventListener("resize", () => onWindowResize(), false);

    //Setting up VR

    //Animate funtion
    var animate = function () {
      //Make the point lights move in a circular form
      const now = Date.now() / 1000;
      pointLight1.position.y = 15;
      pointLight1.position.x = Math.cos(now) * 20;
      pointLight1.position.z = Math.sin(now) * 20;

      pointLight2.position.y = 15;
      pointLight2.position.x = Math.cos(now) * 20;
      pointLight2.position.z = Math.sin(now) * 20;
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      controls.update();

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();
  }
  render() {
    return (
      <div ref={(ref) => (this.mount = ref)}>
        <canvas id="bg"></canvas>
      </div>
    );
  }
}
