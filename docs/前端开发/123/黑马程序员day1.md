# 黑马程序员day1

## Vue是什么
Vue是一个用于构建用户界面的渐进式框架

![Alt text](day1/image-3.png)

Vue的两种使用方式：

1、Vue核心包开发

场景：局部模块改造

2、Vue核心包&Vue插件 工程化开发

场景：整站开发

## 创建实例

创建Vue实例初始化渲染核心步骤：
![Alt text](day1/image-4.png)

## 插值表达式{{}}

![Alt text](day1/image-5.png)

## Vue核心特性：响应式

![Alt text](day1/image-6.png)

## 开发者工具下载

谷歌插件

## vue指令

vue会根据不同的`指令`，针对标签实现不同的`功能`

指令：带有`v-前缀`的特殊`标签属性`

### v-html
![Alt text](day1/image-7.png)

### v-show vs v-if
![Alt text](day1/image-10.png)

![Alt text](day1/image-11.png)

### v-else v-else-if
1、作用：辅助v-if进行判断渲染

2、语法：v-else  v-else-if="表达式"

3、注意：需要紧挨着v-if一起使用

### v-on

![Alt text](day1/image-12.png)

v-on:click可以写成@click，即@事件名

注意：methods函数内的this指向vue实例
![Alt text](day1/image-14.png)
![Alt text](day1/image-13.png)
**v-on调用传参**
![Alt text](day1/image-15.png)

![Alt text](day1/image-16.png)

### v-bind
![Alt text](day1/image-17.png)

### v-for
![Alt text](day1/image-19.png)

**key**

语法：key属性=“唯一标识”
作用：给列表项添加唯一标识。便于Vue进行列表项的正确排序复用

### v-model
![Alt text](day1/image-20.png)

![Alt text](day1/image-21.png)
