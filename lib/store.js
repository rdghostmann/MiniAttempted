// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  latitude: null,
  longitude: null,
  userAddress: '',
  setLocation: (latitude, longitude, userAddress) => set({
    latitude, longitude, userAddress
  }),
}));

export default useStore;
