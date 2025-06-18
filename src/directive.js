import zhCn from '@/assets/files/zh-cn';
import en from '@/assets/files/en';

let obj = {
  highlight: {
    mounted: (...t) => {
      // 只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令
      t[0].style.backgroundColor = t[1].arg;
      t[0].style.fontSize = t[1].value;
    },
  },
  In18: {
    beforeUpdate: (...t) => {
      let type = t[0].tagName.toLowerCase();
      if (type === 'span') {
        t[0].innerText = t[1].arg === 'en' ? en.el[type].lp : zhCn.el[type].lp;
      }
    },
  },
};
export function makeDirective(app) {
  Object.entries(obj).forEach(([key, value]) => {
    // 全局自定义指令
    app.directive(key, value);
  });
}
