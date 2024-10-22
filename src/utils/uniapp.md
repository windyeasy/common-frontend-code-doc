# Uniapp Utils

常用方法封装，基于uniapp或自定义常用方法封装。
JS版本代代码位置：<https://github.com/windyeasy/common-frontend-code/blob/main/uni-vue3-template/src/utils/common.js>

TS版本代码位置：<https://github.com/windyeasy/common-frontend-code/blob/main/uni-vue3-ts-template/src/utils/common.ts>

## 代码

JavaScript版本代码：

```javascript
// 友情提示
export function showFriendlyTips(msg) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: "友情提示",
      content: msg,
      showCancel: false,
      success: resolve,
      fail: reject,
    });
  });
}


/**
 *对showToast 封装
 */
 export function showToast(title, options={}) {
  return new Promise((resolve, reject) => {
    uni.showToast({
      title,
      duration: 1500,
      icon: 'none',
      ...options,
      success(res) {
        resolve(res)
      },
      fail(error) {
        reject(error)
      },
    })
  })
}


// 打电话
export function callPhone(phone) {
  uni.makePhoneCall({
    phoneNumber: phone,
  })
}
// 字符串到数组
export function strToArr(str, symbol = ',') {
  if (typeof str === 'string') {
    return str.split(symbol)
  }
  return []
}
// 数组到字符串
export function arrToStr(arr, symbol = ',') {
  if (Array.isArray(arr)) {
    return arr.join(symbol)
  }
  return ''
}
```

TypeScript版本代码：

```typescript
// 友情提示
export function showFriendlyTips(msg: string) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '友情提示',
      content: msg,
      showCancel: false,
      success: resolve,
      fail: reject,
    })
  })
}

/**
 *对showToast 封装
 */
export function showToast(
  title: string,
  options: UniApp.ShowToastOptions = {},
) {
  return new Promise((resolve, reject) => {
    uni.showToast({
      title,
      duration: 1500,
      icon: 'none',
      ...options,
      success(res) {
        resolve(res)
      },
      fail(error) {
        reject(error)
      },
    })
  })
}

// 打电话
export function callPhone(phone: string) {
  uni.makePhoneCall({
    phoneNumber: phone,
  })
}

// 字符串到数组
export function strToArr(str: string, symbol = ',') {
  if (typeof str === 'string') {
    return str.split(symbol)
  }
  return []
}

// 数组到字符串
export function arrToStr(arr: Array<string | number>, symbol = ',') {
  if (Array.isArray(arr)) {
    return arr.join(symbol)
  }
  return ''
}
```
