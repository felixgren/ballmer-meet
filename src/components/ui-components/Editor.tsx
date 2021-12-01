import { button, folder, useControls } from 'leva';
import { debug } from '@/components/helpers/store';
import {useStore} from '@/components/helpers/store';

const initialValues = {
  debug,
};

export function Editor() {
  const [get, set, debug] = useStore((state) => [
      [state.debug]
    state.get,
    state.set,
    state.debug,
    state.dpr,
    state.shadows,
    state.stats,
  ]);
  return null;
}
