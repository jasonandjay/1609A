# sign

> 面试管理软件

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 功能列表

- [x] 定位功能
- [x] 我的功能
    - [x] 绑定手机号
- [x] 面试功能
    - [x] 添加面试
    - [x] 面试列表
    - [x] 面试详情
    - [x] 面试分享
    - [x] 面试推送
    - [x] 打卡功能
    - [ ] 面试导航
- [ ] 支付功能


## 更新日志
### 1.1.0
  - 时间：2019.04.11
  - 增加面试打卡功能，100m以内

### 1.0.2
  - 时间：2019.03.27
  - 修复分页数据获取失败
  - 优化消息推送通知放大关键字
  - 修复手机号绑定之后，弹框还在
  - 修复消息推送之后状态没改
  - 修复非面试创建人不能查看面试消息
  - 开启用户进入小程序就获取位置

### 1.0.1
  - 时间: 2019.03.26
  - 修复手机号绑定失败
### 1.0.0
  - 时间: 2019.03.26
  - 初次提交
