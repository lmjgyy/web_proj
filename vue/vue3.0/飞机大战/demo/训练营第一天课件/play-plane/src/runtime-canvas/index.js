import { createRenderer } from "@vue/runtime-core";

import { Graphics, Text } from "pixi.js";
import { debug } from "webpack";
const renderer = createRenderer({
  createElement(type) {
    console.log(type, 'createElement');
    // 绘制一个 矩形
    // pixi.js
    let element;
    if (type === "rect") {
      //创建一个矩形
      element = new Graphics();
      element.beginFill(0xff0000);
      element.drawRect(0, 0, 500, 500);
      element.endFill();
    } else if (type === "circle") {
      //创建一个圆
      element = new Graphics();
      element.beginFill(0xffff00);
      element.drawCircle(0, 0, 50);
      element.endFill();
    }

    return element;
  },

  setElementText(node, text) {
    console.log(node, text, 'setElementText');
    const cText = new Text(text);
    node.addChild(cText);
  },

  createText(text) {
    console.log(text, 'createText');
    return new Text(text);
  },

  patchProp(el, key, prevValue, nextValue) {
    console.log(el, key, prevValue, nextValue, 'patchProp');
    // pixi
    // el.x = value
    // el.y = value
    el[key] = nextValue;
  },

  insert(el, parent) {
    console.log(el, parent, 'insert');
    // append()
    parent.addChild(el);
  },
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
