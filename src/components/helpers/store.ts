import create from 'zustand';

const useStore = create(() => {
  return {
    boxRef: null as any,
    boxAPI: null as any,
    showUI: null as any,
  };
});

export default useStore;
