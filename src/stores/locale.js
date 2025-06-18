export const localStore = defineStore('localstore', () => {
  let locale = ref('en');
  return { locale };
});
