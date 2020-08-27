import axios from 'axios'
import './index.css'
import './font.css'
import './index.less'
import pic from "./a.jpg";
import counter from "./counter.js";
import number from "./number.js";
debugger
var img = new Image();
img.src = pic;
img.style.width = '100px';
img.style.height = '100px'
img.classList.add("logo");

// var root = document.getElementById("app");
// root.append(img);

axios.get('api/info').then((res) => {
    document.querySelector('#child').innerHTML = res.data.name
}).catch(e => {
    console.log(e)
})

// var btn = document.createElement("button");
// btn.innerHTML = "新增";
// document.body.appendChild(btn);

// ? 热模块替换代码
console.log(counter)
counter();
number();
if (module.hot) {
    module.hot.accept("./number", function() {
        document.body.removeChild(document.getElementById("number"));
        number();
    });
}

// ? Babel测试代码
// const arr = [new Promise(() => {}), new Promise(() => {})];

// let k = []
// console.log(arr)
// arr.map(item => {
//  console.log(item);
// });

// ? react
import React, { Component } from "react";
import ReactDom from "react-dom";

class App extends Component {
 render() {
 return <div>hello world</div>;
 }
}

ReactDom.render(<App />, document.getElementById("react"));