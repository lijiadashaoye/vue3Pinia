import './styles/main.scss';
import App from './App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // 持久化
import { makeDirective } from './directive';
import { makeCustomCom } from '@/components/customCom/makeElement';
const app = createApp(App);
makeDirective(app); // 插入自定义指令
makeCustomCom(); // 注册自定义标签

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia).use(router).mount('#app');

