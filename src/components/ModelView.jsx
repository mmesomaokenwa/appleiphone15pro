import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import * as  THREE from "three";
import Lights from "./Lights"
import { Suspense } from "react"
import IPhone from "./IPhone"
import Loader from "./Loader";

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotation, item, size }) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${
        index === 2 && "right-[-100%]"
      }`}
    >
      <ambientLight intensity={0.5} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotation(controlRef.current.getAzimuthalAngle())}
      />
      <group ref={groupRef} name={index === 1 ? 'small' : 'large'} position={[0, 0, 0]}>
        <Suspense fallback={<Loader  />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
}

export default ModelView