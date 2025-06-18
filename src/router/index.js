import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
});

router.beforeEach(async (to, from) => {
  // canUserAccess() 返回 `true` 或 `false`
  return true;
});

export default router;
