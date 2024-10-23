# Common CSS

代码位置：<https://github.com/windyeasy/common-frontend-code/blob/master/uni-vue3-template/src/assets/css/common.css>

## 代码

```css
/* common css */

/* 常用主题色 */
:root {
  --color-primary: #409eff;
  --color-success: #67c23a;
  --color-info: #909399;
  --color-warning: #e6a23c;
  --color-danger: #f56c6c;
}

/* 字体颜色 */
.c-primary {
  color: var(--color-primary);
}

.c-success {
  color: var(--color-success);
}

.c-info {
  color: var(--color-info);
}

.c-warning {
  color: var(--color-warning);
}

.c-danger {
  color: var(--color-danger);
}

.c-white {
  color: #fff;
}

/* 背景颜色 */
.bg-primary {
  background-color: var(--color-primary);
}

.bg-success {
  background-color: var(--color-success);
}

.bg-info {
  background-color: var(--color-info);
}

.bg-warning {
  background-color: var(--color-warning);
}

.bg-danger {
  background-color: var(--color-danger);
}

.bg-white {
  background-color: #fff;
}

/* 粗体 */
.fb {
  font-weight: bold;  
}

/* 常用字体颜色 */

.c-333 {
  color: #333;
}

.c-666 {
  color: #666;
}

.c-999 {
  color: #999;
}

/* 常用背景颜色 */
.bg-f5f5f5 {
  background-color: #f2f2f2;
}

.bg-f5f5f5 {
  background-color: #f5f5f5;
}

.bg-fff {
  background-color: #fff;
}

/* flex start */
/* 开启flex */
.d-f {
 display: flex;
}

.d-c-s {
 display: flex;
 justify-content: center;
 align-items: flex-start;
}

/* 水平垂直居中 */
.d-c-c {
 display: flex;
 justify-content: center;
 align-items: center;
}

/* 垂直居中，水平靠底 */
.d-c-e {
 display: flex;
 justify-content: center;
 align-items: flex-end;
}

/* 垂直居中 */
.d-s-c {
 display: flex;
 justify-content: flex-start;
 align-items: center;
}

/* 靠右 */
.d-s-e {
 display: flex;
 justify-content: flex-start;
 align-items: flex-end;
}


/* 垂直居中，水平靠右 */
.d-e-c {
 display: flex;
 justify-content: flex-end;
 align-items: center;
}

/* 向左右两边排布，垂直居中 */
.d-b-c {
 display: flex;
 justify-content: space-between;
 align-items: center;
}


/* 垂直居中，元素内容自动排列 */
.d-a-c {
 display: flex;
 justify-content: space-around;
 align-items: center;
}

/* 设置主轴为垂直 */
.d-c {
 flex-direction: column;
}

/* 设置元素为拉伸  */
.d-stretch {
 align-items: stretch;
 align-content: stretch;
}

/* flex布局允许换行 */
.f-w {
 flex-wrap: wrap;
}

/* 设置flex */
.f-1 {
 flex: 1;
}
/* flex end */

/* text */
.t-c {
  text-align: center;
}

/* overflow */
.o-hidden {
  overflow: hidden;
}

/* 圆角 */
.r-circle {
  border-radius: 50%;
}

/* box */
.box-border {
  box-sizing: border-box;
}
```

## 使用

### 方式一

- 创建一个CSS文件将代码拷贝到文件里面
- 在项目里面引入这个文件

### 方式二

- 在代码位置单独下载这个文件，在项目中
- 在项目里面引入这个文件
