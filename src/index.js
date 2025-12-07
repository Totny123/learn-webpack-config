import { a } from '@/a.js';
import { JSXDemo } from './jsx-demo.jsx';
import { TSXDemo } from './tsx-demo.tsx';
import { typescriptStr } from './ts-demo.ts';
import '@/scss-demo.scss';
import '@/less-demo.less';
import styles from '@/scss-exports.scss';
const b = import('./b.js');

console.log('feng', styles);
console.log(typescriptStr);
console.log(JSXDemo);
console.log(TSXDemo);
const hi = () => {
  console.log(a);
  console.log(b);
  console.log(Promise.resolve('test-promise'));
};

hi();
