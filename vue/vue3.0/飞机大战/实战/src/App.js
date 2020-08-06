import { defineComponent, h } from "@vue/runtime-core";
import Circle from "./component/Circle";

export default defineComponent({
  render() {
    // 创建 vnode
    // <rect x=100 y=100>我的头发是真的！！<circle>11</circle></rect>
    // const vnode = h("rect", { x: 100, y: 100 },"我的头发是真的！！");
    const vnode = h("rect", { x: 100, y: 100 }, [
      "我的头发是真的！！",
      // h("circle", { x: 150, y: 150 }),
      h(Circle),
    ]);
    return vnode;
  },
});