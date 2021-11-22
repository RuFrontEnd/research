"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
// yarn add typescript
// tsconfig.js 和 jsconfig.js 不能共存
// tsc Typescript.tsx 執行編譯 typescript
var macro_1 = require("styled-components/macro");
// function sayHello(person: string) {
//   return "Hello, " + person;
// }
// let user = [0, 1, 2];
// console.log(sayHello(user));
function Typescript(props) {
    var className = props.className;
    return <Container className={className}></Container>;
}
var Container = macro_1["default"].section(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
exports["default"] = Typescript;
var templateObject_1;
