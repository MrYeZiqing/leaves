## 简介
#### 该项目是基于webpack4 + react17 + antd-mobile 的移动端多页面项目模版

## 安装依赖
```sh
    npm install
```

## 开发环境
 ```sh
    npm start
```
## 生产环境
 ```sh
    npm run build
```
## 约定目录
```sh
src
    pages 页面组件
        pages1
        index.js // 入口文件
        app.jsx 入口组件
        index.html // html模版
    components 全局通用组件
    api api请求统一管理
    utils 工具函数
        __test__ 单元测试
    common 公用方法（默认是所有页面引入）
    styles 全局样式
leaces.json
    projectName 项目名称
    sourceMap 是否开启sourceMap
    BundleAnalyzer 是否开启 BundleAnalyzer
    devServer 本地serve配置
        openPage 打开页面
        proxy 跨域配置
public 
    index.html 默认html模版
config webpack 配置
```

## 遵循规则
```sh
1.最小化组件拆分    
2.单一职责模式  
3.多用函数式编程方式 map, filter, reduce, some, any, forEach, every 
4.页面文件不超过300行，超过考虑拆分组件 
5.命名规范  
    css 使用BEM命名规范  
    js 驼峰式命名  
    组件 大驼峰命名  
    文件和文件夹 驼峰式命名
```