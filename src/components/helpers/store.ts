import create from 'zustand';

const useStore = create(() => {
  return {
    boxRef: null as any,
    boxAPI: null as any,
    showUI: false,
  };
});

export default useStore;
