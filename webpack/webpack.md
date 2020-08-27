# webpack



## 文档

- [官方网站](https://webpack.js.org/ )



### 1.webpack简介

------

![]( https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3378498490,2105022646&fm=15&gp=0.jpg )

 webpack is a module bundler(模块打包⼯具) 

>  Webpack是⼀个打包模块化JavaScript的⼯具，它会从⼊⼝模块出发，识别 出源码中的模块化导⼊语句，递归地找出⼊⼝⽂件的所有依赖，将⼊⼝和其所 有的依赖打包到⼀个单独的⽂件中 

 是⼯程化、⾃动化思想在前端开发中的体现 

### 2.安装webpack

------

##### 2.1-环境准备

- [ nodeJs ](  https://nodejs.org/en/ )

 版本参考官⽹发布的最新版本，可以提升webpack的打包速度 

#####  2.2-全局安装 

```
# 安装webpack V4+版本时，需要额外安装webpack-cli
npm install webpack webpack-cli -g

# 检查版本
webpack -v

# 卸载
npm uninstall webpack webpack-cli -g
```

>  全局安装webpack，这会将你项⽬中的webpack锁定到指定版本，造成不同 的项⽬中因为webpack依赖不同版本⽽导致冲突，构建失败 

#####  2.3-项⽬安装 

```
# 安装最新的稳定版本
npm i -D webpack

# 安装指定版本
npm i -D webpack@<version>

# 安装最新的体验版本 可能包含bug,不要⽤于⽣产环境
npm i -D webpack@beta

# 安装webpack V4+版本时，需要额外安装webpack-cli
npm i -D webpack-cli
```

#####  2.4-检查安装 

```
webpack -v //command not found 默认在全局环境中查找

npx webpack -v// npx帮助我们在项⽬中的node_modules⾥查找webpack
./node_modules/.bin/webpack -v//到当前的node_modules模块⾥指定
webpack
```



###  3.启动webpack执⾏构建 

------

####  3.1- webpack默认配置 

-  webpack默认⽀持JS模块和JSON模块 
-  ⽀持CommonJS Es moudule AMD等模块类型 
-  webpack4⽀持零配置使⽤,但是很弱，稍微复杂些的场景都需要额外扩 展 

####  3.2- 准备执⾏构建 

-  新建src⽂件夹 
-  新建src/index.js、src/index.json、src/other.js 

```
### index.js
const json = require("./index.json");//commonJS
import { add } from "./other.js";//es module
console.log(json, add(2, 3));

### index.json
{
 "name": "JOSN"
}

### other.js
export function add(n1, n2) {
 return n1 + n2;
}
```

####  3.3- 执⾏构建 

```
# npx⽅式
npx webpack

# npm script
npm run test
```

>  原理就是通过shell脚本在node_modules/.bin⽬录下创建⼀个软链接。 

####  3.4-构建成功 

 我们会发现⽬录下多出⼀个 dist ⽬录，⾥⾯有个 main.js ，这个⽂件是 ⼀个可执⾏的JavaScript⽂件，⾥⾯包含webpackBootstrap启动函数。 

####  3.5-默认配置 

```
const path = require("path");
module.exports = {
 // 必填 webpack执⾏构建⼊⼝
 entry: "./src/index.js",
 output: {
 // 将所有依赖的模块合并输出到main.js
 filename: "main.js",
 // 输出⽂件的存放路径，必须是绝对路径
 path: path.resolve(__dirname, "./dist")
 }
};
```

###  

### 4.webpack配置核⼼概念 

------

 零配置是很弱的，特定的需求，总是需要⾃⼰进⾏配置 

 webpack有默认的配置⽂件，叫 webpack.config.js ，我们可以对这个 ⽂件进⾏修改，进⾏个性化配置 

-  使⽤默认的配置⽂件：webpack.config.js 
-  不使⽤⾃定义配置⽂件： ⽐如webpackconfig.js，可以通过--config webpackconfig.js来指定webpack使⽤哪个配置⽂件来执⾏构建 

 **webpack.config.js配置基础结构** 

```
module.exports = {
 entry: "./src/index.js", //打包⼊⼝⽂件
 output: "./dist", //输出结构
 mode: "production", //打包环境
 module: {
     rules: [
        //loader模块处理
         {
             test: /\.css$/,
             use: "style-loader"
         }
     ]
 },
 plugins: [new HtmlWebpackPlugin()] //插件配置
};
```

####  4.1-entry: 

 指定webpack打包⼊⼝⽂件:Webpack 执⾏构建的第⼀步将从 Entry 开始， 可抽象成输⼊ 

```
//单⼊⼝ SPA，本质是个字符串
entry:{
 main: './src/index.js'
}
==相当于简写===
entry:"./src/index.js"

//多⼊⼝ entry是个对象
entry:{
 index:"./src/index.js",
 login:"./src/login.js"
}
```

####  4.2-output: 

 打包转换后的⽂件输出到磁盘位置:输出结果，在 Webpack 经过⼀系列处理 并得出最终想要的代码后输出结果。 

```
output: {
 filename: "bundle.js",//输出⽂件的名称
 path: path.resolve(__dirname, "dist")//输出⽂件到磁盘的⽬录，必
须是绝对路径
},

//多⼊⼝的处理
output: {
 filename: "[name][chunkhash:8].js",//利⽤占位符，⽂件名称不要重
复
 path: path.resolve(__dirname, "dist")//输出⽂件到磁盘的⽬录，必
须是绝对路径
},
```

####  4.3-mode 

 Mode⽤来指定当前的构建环境 

-  production 
-  development 
-  none 

 设置mode可以⾃动触发webpack内置的函数，达到优化的效果 

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| development | 会将DefinePlugin中process.env.NODE_ENV的值设置为development。启用NameChunksPlugin和NameModulePlugin。 |
| production  | 会将DefinePlugin中process.env.NODE_ENV的值设置为production。启用FlagDependencyUsagePlugin和FlagIncludeChunksPlugin,ModuleConcatenationPlugin,NoEmitOnErrorsPlugin,OccurenceOrderPlugin,SideEffectsFlagPlugin和TerserPlugin。 |
| none        | 退出任何默认优化选项                                         |

如果没有设置，webpack会将mode的默认值设为production 。模式支持的值为

> 记住，设置NODE_ENV并不会自动地设置mode

 **开发阶段的开启会有利于热更新的处理，识别哪个模块变化 ⽣产阶段的开启会有帮助模块压缩，处理副作⽤等⼀些功能** 

####  4.4-loader 

 模块解析，模块转换器，⽤于把模块原内容按照需求转换成新内容。 

webpack是模块打包⼯具，⽽模块不仅仅是js，还可以是css，图⽚或者其他 格式 

但是webpack默认只知道如何处理js和JSON模块，那么其他格式的模块处 理，和处理⽅式就需要loader了 

 常⻅的loader 

```
style-loader
css-loader
less-loader
sass-loader
ts-loader //将Ts转换成js
babel-loader//转换ES6、7等js新特性语法
file-loader//处理图⽚⼦图
eslint-loader
...

```

####  4.5-moudle 

 模块，在 Webpack ⾥⼀切皆模块，⼀个模块对应着⼀个⽂件。Webpack 会 从配置的 Entry 开始递归找出所有依赖的模块。 

当webpack处理到不认识的模块时，需要在webpack中的module处进⾏配 置，当检测到是什么格式的模块，使⽤什么loader来处理。 

```
module:{
 rules:[
     {
         test:/\.xxx$/,//指定匹配规则
         use:{
         	loader: 'xxx-load'//指定使⽤的loader
         }
     }
 ]
}
```



-  loader: file-loader：处理静态资源模块 

 loader: file-loader 

原理是把打包⼊⼝中识别出的资源模块，移动到输出⽬录，并且返回⼀ 个地址名称 

所以我们什么时候⽤file-loader呢？

场景：就是当我们需要模块，仅仅是从源代码挪移到打包⽬录，就可以 使⽤file-loader来处理，txt，svg，csv，excel，图⽚资源啦等等 

```
npm install file-loader -D
```

案例：

```
module: {
 rules: [
     {
     test: /\.(png|jpe?g|gif)$/,
     //use使⽤⼀个loader可以⽤对象，字符串，两个loader需要⽤数组
         use: {
             loader: "file-loader",
                // options额外的配置，⽐如资源名称
                 options: {
                     // placeholder 占位符 [name]⽼资源模块的名称
                     // [ext]⽼资源模块的后缀
                     // https://webpack.js.org/loaders/fileloader#placeholders
                     name: "[name]_[hash].[ext]",
                     //打包后的存放位置
                     outputPath: "images/"
                 }
             }
         }
     ]
 },

```

```
import pic from "./logo.png";

var img = new Image();
img.src = pic;
img.classList.add("logo");

var root = document.getElementById("root");
root.append(img);

```



- [处理字体](https://www.iconfont.cn/?spm=a313x.7781069.1998910419.d4d0a486a)

```
//css
@font-face {
 font-family: "webfont";
 font-display: swap;
 src: url("webfont.woff2") format("woff2");
}

body {
 background: blue;
 font-family: "webfont" !important;
}

//webpack.config.js
{
 test: /\.(eot|ttf|woff|woff2|svg)$/,
 use: "file-loader"
}
```



-  url-loader file-loader加强版本 

 url-loader内部使⽤了file-loader,所以可以处理file-loader所有的事情，但 是遇到jpg格式的模块，会把该图⽚转换成base64格式字符串，并打包 到js⾥。对⼩体积的图⽚⽐较合适，⼤图⽚不合适。 

```
npm install url-loader -D
```

案例：

```
module: {
 rules: [
     {
     test: /\.(png|jpe?g|gif)$/,
         use: {
             loader: "url-loader",
                 options: {
                     name: "[name]_[hash].[ext]",
                     outputPath: "images/",
                     //⼩于2048，才转换成base64
                     limit: 2048
                 }
             }
         }
     ]
 },
```





-  样式处理： 

 Css-loader 分析css模块之间的关系，并合成⼀个css 

 Style-loader 会把css-loader⽣成的内容，以style挂载到⻚⾯的heade部分 

```
npm install style-loader css-loader -D
```

```
{
 test: /\.css$/,
 use: ["style-loader", "css-loader"]
}

{
 test:/\.css$/,
 use:[
 	{
        loader:
            "style-loader",
             options: {
                injectType: "singletonStyleTag" // 将所有的style标签合并成⼀个
             }
    },
 	"css-loader"
 ]
}
```



-  Less样式处理 

 less-load 把less语法转换成css 

```
$ npm install less less-loader --save-dev
```

案例：

 loader有顺序，从右到左，从下到上 

```
{
 test: /\.scss$/,
 use: ["style-loader", "css-loader", "less-loader"]
}
```



- 样式⾃动添加前缀： 

 Postcss-loader 

```
npm i postcss-loader autoprefixer -D
```

 新建postcss.config.js 

```
//webpack.config.js
{
 test: /\.css$/,
 use: ["style-loader", "css-loader", "postcss-loader"]
},

//postcss.config.js
module.exports = {
     plugins: [
         require("autoprefixer")({
         overrideBrowserslist: ["last 2 versions", ">1%"]
         })
     ]
};
```



###  5.Plugins 

------

 plugin 可以在webpack运⾏到某个阶段的时候，帮你做⼀些事情，类似于⽣ 命周期的概念 

扩展插件，在 Webpack 构建流程中的特定时机注⼊扩展逻辑来改变构建结 果或做你想要的事情。

 作⽤于整个构建过程 



####  HtmlWebpackPlugin 

######  htmlwebpackplugin会在打包结束后，⾃动⽣成⼀个html⽂件，并把打包⽣ 成的js模块引⼊到该html中。 

```
npm install --save-dev html-webpack-plugin
```

 配置： 

```
title: ⽤来⽣成⻚⾯的 title 元素
filename: 输出的 HTML ⽂件名，默认是 index.html, 也可以直接配置带有⼦
⽬录。
template: 模板⽂件路径，⽀持加载器，⽐如 html!./index.html
inject: true | 'head' | 'body' | false ,注⼊所有的资源到特定的
template 或者 templateContent 中，如果设置为 true 或者 body，所有的
javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素
中。
favicon: 添加特定的 favicon 路径到输出的 HTML ⽂件中。
minify: {} | false , 传递 html-minifier 选项给 minify 输出
hash: true | false, 如果为 true, 将添加⼀个唯⼀的 webpack 编译 hash
到所有包含的脚本和 CSS ⽂件，对于解除 cache 很有⽤。
cache: true | false，如果为 true, 这是默认值，仅仅在⽂件修改之后才会发
布⽂件。
showErrors: true | false, 如果为 true, 这是默认值，错误信息会写⼊到
HTML ⻚⾯中
chunks: 允许只添加某些块 (⽐如，仅仅 unit test 块)
chunksSortMode: 允许控制块在添加到⻚⾯之前的排序⽅式，⽀持的值：'none'
| 'default' | {function}-default:'auto'
excludeChunks: 允许跳过某些块，(⽐如，跳过单元测试的块)
```

案例：

```
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
 ...
 plugins: [
     new htmlWebpackPlugin({
         title: "My App",
         filename: "app.html",
         template: "./src/index.html"
     })
 ]
};

//index.html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initialscale=1.0" />
 <meta http-equiv="X-UA-Compatible" content="ie=edge" />
 <title><%= htmlWebpackPlugin.options.title %></title>
 </head>
 <body>
 <div id="root"></div>
 </body>
</html>
```



####  clean-webpack-plugin 

```
npm install --save-dev clean-webpack-plugin
```

```
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
...
plugins: [
 new CleanWebpackPlugin()
]
```



####  mini-css-extract-plugin 

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

{
 test: /\.css$/,
 use: [MiniCssExtractPlugin.loader, "css-loader"]
}

new MiniCssExtractPlugin({
 filename: "[name][chunkhash:8].css"
})
```



###  6.sourceMap 

------

 源代码与打包后的代码的映射关系，通过sourceMap定位到源代码。 在dev模式中，默认开启，关闭的话 可以在配置⽂件⾥ 

```
devtool:"none"
```

[ devtool的介绍 ]( https://webpack.js.org/configuration/devtool#devtool )

-  eval:速度最快,使⽤eval包裹模块代码, 
-  source-map： 产⽣ .map ⽂件 
-  cheap:较快，不包含列信息 
-  Module：第三⽅模块，包含loader的sourcemap（⽐如jsx to js ，babel的 sourcemap） 
-  inline： 将 .map 作为DataURI嵌⼊，不单独⽣成 .map ⽂件 

 配置推荐： 

```
devtool:"cheap-module-eval-source-map",// 开发环境配置

//线上不推荐开启
devtool:"cheap-module-source-map", // 线上⽣成配置
```



###  7.WebpackDevServer 

------

 提升开发效率的利器

 每次改完代码都需要重新打包⼀次，打开浏览器，刷新⼀次，很麻烦 

我们可以安装使⽤webpackdevserver来改善这块的体验 

启动服务后，会发现dist⽬录没有了，这是因为devServer把打包后的模块不 会放在dist⽬录下，⽽是放到内存中，从⽽提升速度 

```
 npm install webpack-dev-server -D
```

 修改下package.json 

```
"scripts": {
 "server": "webpack-dev-server"
 },
```

 在webpack.config.js配置： 

```
devServer: {
 contentBase: "./dist",
 open: true,
 port: 8081
}
```

 跨域： 

 联调期间，前后端分离，直接获取数据会跨域，上线后我们使⽤nginx转 发，开发期间，webpack就可以搞定这件事 

 启动⼀个服务器，mock⼀个接⼝： 

```
// npm i express -D
// 创建⼀个server.js 修改scripts "server":"node server.js"

//server.js
const express = require('express')

const app = express()

app.get('/api/info', (req,res)=>{
 res.json({
  name:'开课吧',
  age:5,
  msg:'欢迎来到开课吧学习前端⾼级课程'
  })
})

app.listen('9092')

//node server.js

http://localhost:9092/api/info

```



 项⽬中安装axios⼯具 

```
//npm i axios -D

//index.js
import axios from 'axios'
axios.get('http://localhost:9092/api/info').then(res=>{
 console.log(res)
})

会有跨域问题
```

 修改webpack.config.js 设置服务器代理 

```
proxy: {
 "/api": {
 	target: "http://localhost:9092"
 }
}
```

 修改index.js 

```
axios.get("/api/info").then(res => {
 console.log(res);
});
```

 搞定！ 

1.  和服务端约定好接⼝！！！！！，定义好字段！！！！！ 
2.  接⼝⽂档啥时候给到。 
3.  根据接⼝⽂档mock数据，mock接⼝ 





 ⽂件监听 

 轮询判断⽂件的最后编辑时间是否变化，某个⽂件发⽣了变化，并不会⽴ 刻告诉监听者，先缓存起来 

 webpack开启监听模式，有两种 

```
1.启动webpack命令式 带上--watch 参数，启动监听后，需要⼿动刷新浏览器


scripts:{
 	"watch":"webpack --watch"
}


2.在配置⽂件⾥设置 watch:true

watch: true, //默认false,不开启
    //配合watch,只有开启才有作⽤
    watchOptions: {
    //默认为空，不监听的⽂件或者⽬录，⽀持正则
    ignored: /node_modules/,
    //监听到⽂件变化后，等300ms再去执⾏，默认300ms,
    aggregateTimeout: 300,
    //判断⽂件是否发⽣变化是通过不停的询问系统指定⽂件有没有变化，默认每秒
    问1次
    poll: 1000 //ms
}
```



###  8.Hot Module Replacement (HMR:热模块替换) 

 启动hmr 

```
devServer: {
 contentBase: "./dist",
 open: true,
 hot:true,
 //即便HMR不⽣效，浏览器也不⾃动刷新，就开启hotOnly
 hotOnly:true
},
```

 配置⽂件头部引⼊webpack 

```
//const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const CleanWebpackPlugin = require("clean-webpack-plugin");

const webpack = require("webpack");
```



 在插件配置处添加： 

```
plugins: [
 new CleanWebpackPlugin(),
 new HtmlWebpackPlugin({
 	template: "src/index.html"
 }),
 new webpack.HotModuleReplacementPlugin()
],
```

 案例： 

```
//index.js
import "./css/index.css";

var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);
btn.onclick = function() {
 var div = document.createElement("div");
 div.innerHTML = "item";
 document.body.appendChild(div);
};

//index.css
div:nth-of-type(odd) {
 background: yellow;
}
```

>  注意启动HMR后，css抽离会不⽣效，还有不⽀持contenthash， chunkhash 

####  

#### 处理js模块HMR 

 需要使⽤module.hot.accept来观察模块更新 从⽽更新 

 案例： 

```
//counter.js
function counter() {
 var div = document.createElement("div");
 div.setAttribute("id", "counter");
 div.innerHTML = 1;
 div.onclick = function() {
     div.innerHTML = parseInt(div.innerHTML, 10) + 1;
 };
 document.body.appendChild(div);
}
export default counter;

//number.js
function number() {
 var div = document.createElement("div");
 div.setAttribute("id", "number");
 div.innerHTML = 13000;
 document.body.appendChild(div);
}
export default number;

//index.js
import counter from "./counter";
import number from "./number";
counter();
number();
if (module.hot) {
 module.hot.accept("./b", function() {
 	document.body.removeChild(document.getElementById("number"));
 	number();
 });
}
```

####  9.Babel处理ES6 

[ 官⽅⽹站]( https://babeljs.io/ )

[ 中⽂⽹站 ]( https://www.babeljs.cn/ )

 Babel是JavaScript编译器，能将ES6代码转换成ES5代码，让我们开发过程 中放⼼使⽤JS新特性⽽不⽤担⼼兼容性问题。并且还可以通过插件机制根 据需求灵活的扩展。 

 Babel在执⾏编译的过程中，会从项⽬根⽬录下的 .babelrc JSON⽂件中 读取配置。没有该⽂件会从loader的options地⽅读取配置。 

 **测试代码** 

```
//index.js
const arr = [new Promise(() => {}), new Promise(() => {})];

arr.map(item => {
 console.log(item);
});
```

 **安装** 

```
npm i babel-loader @babel/core @babel/preset-env -D
```

 **Webpack.config.js** 

```
{
 test: /\.js$/,
 exclude: /node_modules/,
 use: {
     loader: "babel-loader",
         options: {
         	presets: ["@babel/preset-env"]
         }
     }
}
```

 通过上⾯的⼏步 还不够，默认的Babel只⽀持let等⼀些基础的特性转换， Promise等⼀些还有转换过来，这时候需要借助@babel/polyfill，把es的新特 性都装进来，来弥补低版本浏览器中缺失的特性 

 **@babel/polyfill** 

 以全局变量的⽅式注⼊进来的。windows.Promise，它会造成全局对象的污 染 

```
npm install --save @babel/polyfill
```

```
//index.js 顶部
import "@babel/polyfill";
```

 **按需加载，减少冗余** 

 会发现打包的体积⼤了很多，这是因为polyfill默认会把所有特性注⼊进 来，假如我想我⽤到的es6+，才会注⼊，没⽤到的不注⼊，从⽽减少打包 的体积，可不可以呢 

 当然可以

 修改Webpack.config.js 

```
options: {
 presets: [
     [
         "@babel/preset-env",
         {
             targets: {
                 edge: "17",
                 firefox: "60",
                 chrome: "67",
                 safari: "11.1"
             },
             corejs: 2,//新版本需要指定核⼼库版本
             useBuiltIns: "usage"//按需注⼊
         }
     ]
 ]
```

 useBuiltIns 选项是 babel 7 的新功能，这个选项告诉 babel 如何配 置 @babel/polyfill 。

 它有三个参数可以使⽤：

 ①entry: 需要 在 webpack 的⼊⼝⽂件⾥ import "@babel/polyfill" ⼀次。 babel 会根据你的使⽤情况导⼊垫⽚，没有使⽤的功能不会被导⼊相应的垫⽚。 

②usage: 不需要 import ，全⾃动检测，但是要安装 @babel/polyfill 。（试验阶段）

③false: 如果你 import "@babel/polyfill" ，它不会排除掉没有使⽤的垫⽚，程序体积会庞 ⼤。(不推荐) 

 ***请注意： usage 的⾏为类似 babel-transform-runtime，不会造成全局污染， 因此也会不会对类似 Array.prototype.includes() 进⾏ polyfill。*** 



 **扩展：** 

babelrc⽂件： 

新建.babelrc⽂件，把options部分移⼊到该⽂件中，就可以了 

```
//.babelrc
{
 presets: [
     [
         "@babel/preset-env",
         {
             targets: {
                 edge: "17",
                 firefox: "60",
                 chrome: "67",
                 safari: "11.1"
             },
             corejs: 2, //新版本需要指定核⼼库版本
             useBuiltIns: "usage" //按需注⼊
        }
     ]
 ]
}

//webpack.config.js
{
 test: /\.js$/,
 exclude: /node_modules/,
 loader: "babel-loader"
}
```



 **配置React打包环境** 

 安装 

```
npm install react react-dom --save
```

 

编写react代码： 

```
//index.js
import React, { Component } from "react";
import ReactDom from "react-dom";

class App extends Component {
 render() {
 return <div>hello world</div>;
 }
}

ReactDom.render(<App />, document.getElementById("app"));
```

 

安装babel与react转换的插件： 

```
 npm install --save-dev @babel/preset-react 
```



 在babelrc⽂件⾥添加： 

```
{
 "presets": [
 [
     "@babel/preset-env",
     {
     "targets": {
         "edge": "17",
         "firefox": "60",
         "chrome": "67",
         "safari": "11.1",
         "Android":"6.0"
     },
     "useBuiltIns": "usage", //按需注⼊
 	}
 ],
 "@babel/preset-react"
 ]
}
```



 **扩展：** 

 **多⻚⾯打包通⽤⽅案** 

```
entry:{
 index:"./src/index",
 list:"./src/list",
 detail:"./src/detail"
}
new htmlWebpackPlugins({
 title: "index.html",
 template: path.join(__dirname, "./src/index/index.html"),
 filename:"index.html",
 chunks:[index]
})
```

 1.⽬录结构调整 

- src
  - index
    - index.js
    - index.html
  - list
    - index.js
    - index.html
  - detail
    - index.js
    - index.html

2. .使⽤ glob.sync 第三⽅库来匹配路径 

```
npm i glob -D
const glob = require("glob")

```

```
//MPA多⻚⾯打包通⽤⽅案
const setMPA = () => {
 const entry = {};
 const htmlWebpackPlugins = [];

 return {
     entry,
     htmlWebpackPlugins
 };
};
const { entry, htmlWebpackPlugins } = setMPA();
```

```
const setMPA = () => {
 const entry = {};
 const htmlWebpackPlugins = [];
 const entryFiles = glob.sync(path.join(__dirname,"./src/*/index.js"));
 entryFiles.map((item, index) => {
     const entryFile = entryFiles[index];
     const match = entryFile.match(/src\/(.*)\/index\.js$/);
     const pageName = match && match[1];
     entry[pageName] = entryFile;
     htmlWebpackPlugins.push(
         new htmlWebpackPlugin({
             title: pageName,
             template: path.join(__dirname,src/${pageName}/index.html`),
             filename: `${pageName}.html`,
             chunks: [pageName],
             inject: true
         })
 	);
 });
 return {
     entry,
     htmlWebpackPlugins
 };
};
```

```
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
 entry,
 output:{
     path: path.resolve(__dirname, "./dist"),
     filename: "[name].js"
 }
 plugins: [
     // ...
     ...htmlWebpackPlugins//展开数组
 ]
}
```

 

**@babel/plugin-transform-runtime** 

 当我们开发的是组件库，⼯具库这些场景的时候，polyfill就不适合了，因 为polyfill是注⼊到全局变量，window下的，会污染全局环境，所以推荐闭 包⽅式：@babel/plugin-transform-runtime，它不会造成全局污染 

 **安装** 

```
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

 修改配置⽂件：注释掉之前的presets，添加plugins 

```
options: {
 presets: [
     [
         "@babel/preset-env",
         {
             targets: {
                 edge: "17",
                 firefox: "60",
                 chrome: "67",
                 safari: "11.1"
             },
             useBuiltIns: "usage",
             corejs: 2
         }
     ]
 ],
"plugins": [
     [
         "@babel/plugin-transform-runtime",
         {
             "absoluteRuntime": false,
             "corejs": false,
             "helpers": true,
             "regenerator": true,
             "useESModules": false
         }
     ]
 ]
}
```

 