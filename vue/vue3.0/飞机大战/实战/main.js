import { createApp } from "./src/runtime-canvas";
import App from "./src/App";
import { getRootContainer } from "./src/Game";


//根容器
// setup canvas 
createApp(App).mount(getRootContainer())