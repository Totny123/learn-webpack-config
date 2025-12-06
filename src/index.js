import { a } from './a.js';
import { JSXDemo } from './jsx-demo.jsx';
import { typescriptStr } from './ts-demo.ts';
const b = import('./b.js');

console.log(typescriptStr);
console.log(JSXDemo);
const hi = () => {
  console.log(a);
  console.log(b);
  console.log(Promise.resolve('test-promise'));
};

hi();
