import { defineCustomElement } from 'vue';
import one from './self.ce.vue'; // 文件需要以 .ce.vue 结尾才能将组件内的样式也正确的引用上

export function makeCustomCom() {
  customElements.define('lp-text', defineCustomElement(one));
}
