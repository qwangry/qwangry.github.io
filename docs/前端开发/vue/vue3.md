# vue3

## vue3优势
![Alt text](image.png)

![Alt text](image-1.png)

![Alt text](image-2.png)

## create-vue搭建vue3项目

![Alt text](image-3.png)
![Alt text](image-4.png)

### 项目目录和关键文件
![Alt text](image-5.png)

## 组合式API-setup选项

### setup选项的写法和执行时机
![Alt text](image-6.png)
1、setup执行时机比beforeCreate还要早

2、setup函数中，获取不到this

3、数据和函数，需要在setup最后return，才能在模板中应用
![Alt text](image-7.png)

### setup语法糖
![Alt text](image-8.png)

4、可以通过setup语法糖简化代码

![Alt text](image-9.png)

## 组合式API-reactive和ref函数

### reactive()

![Alt text](image-10.png)

### ref()
![Alt text](image-11.png)

## 组合式API - computed

### computed计算属性函数
![Alt text](image-12.png)

![Alt text](image-13.png)

## 组合式API - watch
### watch函数
![Alt text](image-14.png)

### 侦听单个数据
![Alt text](image-15.png)

### 侦听多个数据

![Alt text](image-16.png)

### immediate
![Alt text](image-17.png)

### deep
![Alt text](image-18.png)

### 精确侦听对象的某个属性

![Alt text](image-19.png)

![Alt text](image-20.png)

## 组合式API - 生命周期函数
![Alt text](image-21.png)

## 组合式API - 父子通信

### 父传子
![Alt text](image-22.png)

### 子传父
![Alt text](image-23.png)

![Alt text](image-24.png)

## 组合式API - 模板引用
![Alt text](image-25.png)

![Alt text](image-26.png)

### defineExpose()
![Alt text](image-27.png)

## 组合式API - provide 和inject
![Alt text](image-28.png)

![Alt text](image-29.png)

![Alt text](image-30.png)

## vue3.3新特性-defineOptions
![Alt text](image-31.png)

![Alt text](image-32.png)

## vue3.3新特性-defineModel
![Alt text](image-33.png)
![Alt text](image-34.png)

## Pinia快速入门
Pinia是vue最新的状态管理工具，是vuex的替代品

![Alt text](image-35.png)

![Alt text](image-36.png)

### 手动添加Pinia到vue项目
![Alt text](image-37.png)

### pinia持久化插件
![Alt text](image-39.png)


## vue3案例
![Alt text](image-38.png)

### Eslint配置代码风格
![Alt text](image-40.png)

### 提交前做代码检查
![Alt text](image-41.png)

![Alt text](image-42.png)

### vuerouter4
![Alt text](image-43.png)

### element plus插件
![Alt text](image-44.png)

## Pinia构建用户仓库和持久化
![Alt text](image-45.png)

### pinia独立维护

### 仓库统一导出

## 请求工具设计
![Alt text](image-46.png)
