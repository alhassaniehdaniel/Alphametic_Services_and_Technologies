import { Component } from "react";
//import three
import * as THREE from "three";
//imports to load Text
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
//import VR Button
// import { VRButton } from "three/addons/webxr/VRButton.js";

//360 Image
import equi_image from "../assets/360-Images/random.jpeg";

//CSS
import "./VRImplementation.css";

export default class VRImplementationEquiImg extends Component {
  componentDidMount() {
    //initializing variables
    let isUserInteracting = false,
      onPointerDownMouseX = 0,
      onPointerDownMouseY = 0,
      lon = 0,
      onPointerDownLon = 0,
      lat = 0,
      onPointerDownLat = 0,
      phi = 0,
      theta = 0;

    //create scene
    var scene = new THREE.Scene();
    //create camera
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1100
    );
    //set position of camera
    camera.position.set(0, 0, 20);
    //create the renderer
    const canvas = document.getElementById("bg");
    var renderer = new THREE.WebGLRenderer({
      canvas,
    });
    //set size of the rendered scene
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    //select where to render the scene
    this.mount.appendChild(renderer.domElement);
    // this.mount.appendChild(VRButton.createButton(renderer));
    // document.body.appendChild(VRButton.createButton(renderer));

    this.mount.style.touchAction = "none";

    this.mount.addEventListener("pointerdown", onPointerDown);

    this.mount.addEventListener("wheel", onDocumentMouseWheel);
    this.mount.addEventListener("dragover", function (event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    });

    this.mount.addEventListener("dragenter", function () {
      this.mount.body.style.opacity = 0.5;
    });

    this.mount.addEventListener("dragleave", function () {
      this.mount.body.style.opacity = 1;
    });

    this.mount.addEventListener("drop", function (event) {
      event.preventDefault();

      const reader = new FileReader();
      reader.addEventListener("load", function (event) {
        equimaterial.map.image.src = event.target.result;
        equimaterial.map.needsUpdate = true;
      });
      reader.readAsDataURL(event.dataTransfer.files[0]);

      this.mount.body.style.opacity = 1;
    });

    function onPointerDown(event) {
      if (event.isPrimary === false) return;

      isUserInteracting = true;

      onPointerDownMouseX = event.clientX;
      onPointerDownMouseY = event.clientY;

      onPointerDownLon = lon;
      onPointerDownLat = lat;

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    }

    function onPointerMove(event) {
      if (event.isPrimary === false) return;

      lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
      lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
    }

    function onPointerUp(event) {
      if (event.isPrimary === false) return;

      isUserInteracting = false;

      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    }

    function onDocumentMouseWheel(event) {
      const fov = camera.fov + event.deltaY * 0.05;

      camera.fov = THREE.MathUtils.clamp(fov, 10, 75);

      camera.updateProjectionMatrix();
    }

    function animate() {
      requestAnimationFrame(animate);
      update();
    }

    function update() {
      if (isUserInteracting === false) {
        // lon += 0.1;
      }

      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(x, y, z);

      renderer.render(scene, camera);
    }
    // if window resizes
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      //3D objects/texts... can cast shadows
      renderer.shadowMap.enabled = true;
    };
    window.addEventListener("resize", () => onWindowResize(), false);
    //Adding a 360 image
    const equigeometry = new THREE.SphereGeometry(500, 60, 40);
    equigeometry.scale(-1, 1, 1);
    const equitexture = new THREE.TextureLoader().load(equi_image);
    const equimaterial = new THREE.MeshBasicMaterial({ map: equitexture });
    const equirectangularImage = new THREE.Mesh(equigeometry, equimaterial);
    scene.add(equirectangularImage);
    //Text Loading
    const textLoader = new FontLoader();
    textLoader.load("/fonts/Soria_Soria.json", (soria) => {
      const textGeometry = new TextGeometry(
        "Hello There \n This is a Text Loaded   ",
        {
          size: 15,
          height: 2,
          font: soria,
        }
      );
      const textMaterial = new THREE.MeshNormalMaterial();
      const text = new THREE.Mesh(textGeometry, textMaterial);
      text.castShadow = true;
      text.position.x = 150;
      text.position.y = 35;
      text.position.z = 10;

      text.rotation.y = 4.5;
      scene.add(text);
    });

    animate();
    //For Web XR
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
