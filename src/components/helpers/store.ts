import create from 'zustand';

const useStore = create(() => {
  return {
    dumbRef: null as any,
    dumbApi: null as any,
  };
});

export default useStore;
