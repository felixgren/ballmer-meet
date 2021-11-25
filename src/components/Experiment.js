import useStore from '@/components/helpers/store';
import { useEffect } from 'react';
import { useFrame } from 'react-three-fiber';

export default function Entity(id) {
  const ref = useRef();
  const [pos] = useState(() => new THREE.Vector3());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    useStore.subscribe(
      (xyz) => pos.set(...xyz),
      (state) => state.entities[id].position
    ),
    []
  );
  useFrame(() => ref.current.position.copy(pos));
  return <mesh ref={ref} />;
}
