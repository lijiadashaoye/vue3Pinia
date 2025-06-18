/*
 使用函数方式定义store时，
 ref() 就是 state 属性
computed() 就是 getters
function() 就是 actions

*/
import { nowNavStore } from './nowNav';
export const appStore = defineStore(
  'nav',
  () => {
    let navList = ref([]);
    let { nowNav } = storeToRefs(nowNavStore()); // 调用其他store
    return {
      navList,
      nowNav,
    };
  },
  {
    persist: {
      storage: sessionStorage, // 存储方式
    },
  },
);

// 使页面支持热更新
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(appStore, import.meta.hot));
}

// export const appStore = defineStore('nav', {
//   state: () => ({
//     navList: [],
//   }),
//   actions: {
//     setMetaData() {
//       return new Promise(resolve => {
//         localStorage.setItem('nav', JSON.stringify(list));
//         resolve(list);
//       });
//     },
//   },
// persist: {
//   enabled: true,  // 启用持久化
//   strategies: [
//     {
//       storage: sessionStorage,  // 使用 sessionStorage 来持久化
//     },
//   ],
// }
// });
