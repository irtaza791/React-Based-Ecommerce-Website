import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { PerspectiveCamera, OrbitControls , Text} from '@react-three/drei';
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";


const Model = () => {
  const gltf = useGLTF('/models/scene.gltf', true);
  const ref = useRef();
  const { size } = useThree();
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState([0,-40,0]);
  const [shouldRotate, setShouldRotate] = useState(true);
   // set initial state to true

   useEffect(() => {
    // Change the scale according to the viewport size
    if (size.width < 500) {
      setScale([1, 1, 1]);
      setPosition([0,0,0])
      
    } else {
      setScale([2, 2, 2]);
    }
  }, [size.width]);


  useFrame(({ clock }) => {
    if (shouldRotate) {
      ref.current.rotation.y = clock.getElapsedTime();
    }
  });

  return (
    <primitive 
      ref={ref}
      object={gltf.scene} 
      scale={scale}
      position={position}
      // start rotating on mouse out
    />
  );
};

const Interactive3DProductDisplay = () => (
  <Canvas style={{backgroundColor:'black'}}>
    <PerspectiveCamera makeDefault position={[-120, 0, 100]} />
    <ambientLight intensity={0.2} />

    <pointLight  color="red" position={[0, 0, 15]} />
    <directionalLight  color="white" position={[0,0,5]} />
      {/* Create a dark back wall */}
      <mesh position={[0, 0, -200]}>
        <planeBufferGeometry attach="geometry" args={[400, 400]} />
        <meshStandardMaterial attach="material" color={'#000000'} />
      </mesh>

      {/* Create a floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -210, 0]}>
        <planeBufferGeometry attach="geometry" args={[400, 400]} />
        <meshStandardMaterial attach="material" color={'#666666'} />
      </mesh>

      {/* Create left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-200, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[400, 400]} />
        <meshStandardMaterial attach="material" color={'#000000'} />
      </mesh>

      {/* Create right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[200, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[400, 400]} />
        <meshStandardMaterial attach="material" color={'#000000'} />
      </mesh>

      {/* Create front wall */}
      <mesh position={[0, 0, 200]}>
        <planeBufferGeometry attach="geometry" args={[400, 400]} />
        <meshStandardMaterial attach="material" color={'#000000'} />
      </mesh>


    <Model />
    <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
    
  </Canvas>
);

export default Interactive3DProductDisplay;
