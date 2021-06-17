import Choises from './../../node_modules/choices.js/public/assets/scripts/choices';
export default function customizeSelect(reference) {
  const choises = new Choises(reference, {
    // searchEnabled: false,
    position: 'bottom',
  });
  return choises;
}
