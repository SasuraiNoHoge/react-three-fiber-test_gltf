import React, { Suspense, useRef } from "react";
import {
  Canvas,
  useLoader,
  useThree,
  useFrame,
  extend
} from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import model from "./assets/Test_Sketch_5.glb";
import "./index.css";

extend({ OrbitControls });

const Controls = props => {
  const { gl, camera } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

function Model() {
  const gltf = useLoader(GLTFLoader, model);
  return <primitive object={gltf.scene} position={[0, 0, 0]} />;
}

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        transparent
        color="red"
        opacity={0.5}
      />
    </mesh>
  );
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Controls
        autoRotate
        enablePan={true}
        enableZoom={true}
        enableDamping
        dampingFactor={0.5}
        rotateSpeed={1}
      />
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.8} position={[300, -300, 600]} />
      <spotLight intensity={0.8} position={[-300, 300, -600]} />
      <Suspense fallback={<Box />}>
        <Model />
      </Suspense>
    </Canvas>
  );
}

export default App;
