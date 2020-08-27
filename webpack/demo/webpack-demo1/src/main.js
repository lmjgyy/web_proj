require('./main.css')
require('./index.css')
document.write('hello world')
document.body.style = {
  fontSize: '100px',
  background: 'red'
}
let fn = () => {
  console.log('es666')
}
fn()
class Test {
  a = 2
}
let obj = new Test()
console.log(obj.a)
const a = 1
var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);
btn.onclick = function() {
 var div = document.createElement("div");
 div.innerHTML = "item";
 document.body.appendChild(div);
};