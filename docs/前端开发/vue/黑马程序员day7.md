# 黑马程序员day7

## vuex概述
![Alt text](image.png)

### 创建一个空仓库
![Alt text](image-1.png)

### 核心概念 - state状态
![Alt text](image-2.png)

![Alt text](image-3.png)

![Alt text](image-4.png)

### 核心概念 - mutations
vuex遵循单向数据流，组件中不能直接修改仓库中的值

strict:true可以开启严格模式，即在组件中直接修改则报错

最终上线不需要加strict(消耗性能)

![Alt text](image-5.png)

![Alt text](image-6.png)

**传参语法**
![Alt text](image-7.png)
不支持传多个参数，可以改成数组或者对象形式

**输入框“双向绑定”**
![Alt text](image-8.png)

store的数据不支持双向绑定，因为是单向流的，所以可以利用v-model拆分成:value和@input的形式进行绑定

**辅助函数mapMutations**
![Alt text](image-9.png)

### 核心概念 - actions
![Alt text](image-10.png)

**辅助函数**
![Alt text](image-11.png)

### 核心概念 - getters
![Alt text](image-12.png)

### 核心概念 - 模块module（进阶语法）
![Alt text](image-13.png)

**模块拆分**
![Alt text](image-14.png)

**访问模块内的内容**































































