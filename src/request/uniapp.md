# Uniapp Request

Uniapp的请求封装，基于uniapp的请求方法
JS版本代代码位置：<https://github.com/windyeasy/common-frontend-code/blob/master/uni-vue3-template/src/services/request/index.js>

TS版本代码位置：<https://github.com/windyeasy/common-frontend-code/tree/master/uni-vue3-ts-template/src/services/request>

## 代码

JavaScript版本代码：

```javascript
export function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    })
    .join("&");
}

class WdRequest {
  config;
  url;

  constructor(config) {
    this.config = config;
  }

  _fetchUrl(url) {
    if (url.includes("http")) {
      this.url = url;
    } else {
      this.url = this.config.baseURL + url;
    }
    return this.url;
  }

  request(config) {
  
    return new Promise((resolve, reject) => {
      config.url = this._fetchUrl(config.url);

      // 实现全局请求拦截
      if (this.config?.interceptor?.requestSuccessFn) {
        config = this.config.interceptor.requestSuccessFn(config);
      }
      // 实现局部请求拦截
      if (config.interceptor?.requestSuccessFn) {
        config = config.interceptor.requestSuccessFn(config);
      }

      // 解析query方法
      if (config.query) {
        const queryStr = objectToQueryString(config.query);
        if (config.url.includes("?")) {
          config.url += `&${queryStr}`;
        } else {
          config.url += `?${queryStr}`;
        }
      }
      
      uni.request({
        timeout: this.config.timeout, // 延迟时间
        dataType: "json",
        responseType: "json",
        url: config.url,
        ...config,
        success: (res) => {
          // 有可能在执行的过程出现异常后抛出异常
          try {
            // 实现全局响应拦截
            if (this.config?.interceptor?.responseSuccessFn) {
              res = this.config.interceptor.responseSuccessFn(res);
            }
            // 实现局部响应拦截
            if (config?.interceptor?.responseSuccessFn) {
              res = config.interceptor.responseSuccessFn(res);
            }
            resolve(res);
          } catch (error) {
            reject(error);
          }
        },
        fail: (error) => {
          if (this.config?.interceptor?.responseErrorFn) {
            error = this.config.interceptor.responseErrorFn(error);
          }
          if (config?.interceptor?.responseErrorFn) {
            error = config?.interceptor?.responseErrorFn(error);
          }
          reject(error);
        },
      });
    });
  }

  get(url, data, config) {
    return this.request({
      url,
      method: "GET",
      data,
      ...config,
    });
  }

  post(url, data, config) {
    return this.request({
      url,
      method: "POST",
      data,
      ...config,
    });
  }

  put(url, data, config) {
    return this.request({
      url,
      method: "POST",
      data,
      ...config,
    });
  }

  delete(url, data, config) {
    return this.request({
      url,
      method: "DELETE",
      data,
      ...config,
    });
  }

  // 文件上传
  uploadFile(config) {
    return new Promise((resolve, reject) => {
      config.url = this._fetchUrl(config.url);

      // 实现全局请求拦截
      if (this.config?.interceptor?.requestSuccessFn) {
        config = this.config.interceptor.requestSuccessFn(config);
      }
      // 实现局部请求拦截
      if (config.interceptor?.requestSuccessFn) {
        config = config.interceptor.requestSuccessFn(config);
      }

      // 解析query方法
      if (config.query) {
        const queryStr = objectToQueryString(config.query);
        if (config.url.includes("?")) {
          config.url += `&${queryStr}`;
        } else {
          config.url += `?${queryStr}`;
        }
      }

      uni.uploadFile({
        ...config,
        success: (res) => {
          res.data = JSON.parse(res.data);
          // 实现全局响应拦截
          if (this.config?.interceptor?.responseSuccessFn) {
            res = this.config.interceptor.responseSuccessFn(res);
          }
          // 实现局部响应拦截
          if (config?.interceptor?.responseSuccessFn) {
            res = config.interceptor.responseSuccessFn(res);
          }
          resolve(res);
        },
        fail: (error) => {
          if (this.config?.interceptor?.responseErrorFn) {
            error = this.config.interceptor.responseErrorFn(error);
          }
          if (config?.interceptor?.responseErrorFn) {
            error = config?.interceptor?.responseErrorFn(error);
          }
          reject(error);
        },
      });
    });
  }
}
export default WdRequest;
```

TypeScript版本代码：

```typescript
// request.ts
import * as qs from 'qs'
import type {
  WdRequestOptions,
  WdRequestConstructorConfig,
  WdUploadFileOptions,
} from './type'

class WdRequest {
  config: WdRequestConstructorConfig

  url?: string

  constructor(config: WdRequestConstructorConfig) {
    this.config = config
  }

  private _fetchUrl(url: string) {
    if (url.includes('http')) {
      this.url = url
    } else {
      this.url = this.config.baseURL + url
    }
    return this.url
  }

  request<T = any>(config: WdRequestOptions) {
    return new Promise<T>((resolve, reject) => {
      config.url = this._fetchUrl(config.url)

      // 实现全局请求拦截
      if (this.config?.interceptor?.requestSuccessFn) {
        config = this.config.interceptor.requestSuccessFn(config)
      }
      // 实现局部请求拦截
      if (config.interceptor?.requestSuccessFn) {
        config = config.interceptor.requestSuccessFn(config)
      }

      // 解析query方法，有可能拦截器里面也注入query方法
      if (config.query) {
        const queryStr = qs.stringify(config.query)
        if (config.url.includes('?')) {
          config.url += `&${queryStr}`
        } else {
          config.url += `?${queryStr}`
        }
      }

      uni.request({
        timeout: this.config.timeout, // 延迟时间
        dataType: 'json',
        responseType: 'json',
        url: config.url as string,
        ...config,
        success: (res: any) => {
          // 有可能在执行的过程出现异常后抛出异常
          try {
            // 实现全局响应拦截
            if (this.config?.interceptor?.responseSuccessFn) {
              res = this.config.interceptor.responseSuccessFn(res)
            }
            // 实现局部响应拦截
            if (config?.interceptor?.responseSuccessFn) {
              res = config.interceptor.responseSuccessFn(res)
            }
            resolve(res)
          } catch (error) {
            reject(error)
          }
        },
        fail: (error) => {
          if (this.config?.interceptor?.responseErrorFn) {
            error = this.config.interceptor.responseErrorFn(error)
          }
          if (config?.interceptor?.responseErrorFn) {
            error = config?.interceptor?.responseErrorFn(error)
          }
          reject(error)
        },
      })
    })
  }

  get<T = any>(
    url: string,
    data?: WdRequestOptions['data'],
    config?: WdRequestOptions,
  ) {
    return this.request<T>({
      url,
      method: 'GET',
      data,
      ...config,
    })
  }

  post<T = any>(
    url: string,
    data?: WdRequestOptions['data'],
    config?: WdRequestOptions,
  ) {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config,
    })
  }

  put<T = any>(
    url: string,
    data?: WdRequestOptions['data'],
    config?: WdRequestOptions,
  ) {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config,
    })
  }

  delete<T = any>(
    url: string,
    data?: WdRequestOptions['data'],
    config?: WdRequestOptions,
  ) {
    return this.request<T>({
      url,
      method: 'DELETE',
      data,
      ...config,
    })
  }

  // 文件上传
  uploadFile<T = any>(config: WdUploadFileOptions) {
    return new Promise<T>((resolve, reject) => {
      config.url = this._fetchUrl(config.url)

      // 实现全局请求拦截
      if (this.config?.interceptor?.requestSuccessFn) {
        config = this.config.interceptor.requestSuccessFn(config)
      }
      // 实现局部请求拦截
      if (config.interceptor?.requestSuccessFn) {
        config = config.interceptor.requestSuccessFn(config)
      }

      uni.uploadFile({
        ...config,
        success: (res: any) => {
          // 将json字符串先转为对象
          if (res && res.data) {
            res.data = JSON.parse(res.data)
          }

          // 实现全局响应拦截
          if (this.config?.interceptor?.responseSuccessFn) {
            res = this.config.interceptor.responseSuccessFn(res)
          }
          // 实现局部响应拦截
          if (config?.interceptor?.responseSuccessFn) {
            res = config.interceptor.responseSuccessFn(res)
          }
          resolve(res)
        },
        fail: (error) => {
          if (this.config?.interceptor?.responseErrorFn) {
            error = this.config.interceptor.responseErrorFn(error)
          }
          if (config?.interceptor?.responseErrorFn) {
            error = config?.interceptor?.responseErrorFn(error)
          }
          reject(error)
        },
      })
    })
  }
}
export default WdRequest
```

```typescript
// type.ts
interface IInterceptor {
  requestSuccessFn?: (config: WdUploadFileOptions | WdRequestOptions) => any
  responseSuccessFn?: (config: any) => any
  responseErrorFn?: (config: any) => any
}

// 构造函数的配置
export interface WdRequestConstructorConfig {
  baseURL?: string
  timeout?: number
  interceptor?: IInterceptor
}

/**
 * 请求配置接口
 * 通过Omit过滤掉url类型，重写url类型
 */
export type WdRequestOptions = Omit<UniApp.RequestOptions, 'url'> & {
  interceptor?: IInterceptor
  query?: Record<string, any>
  url?: string // 重写url类型
}

export type WdUploadFileOptions = UniApp.UploadFileOption & {
  interceptor?: IInterceptor
}
```

## 使用

- 创建实例

```typescript
import WdRequest from './request'

const request = new WdRequest({
  baseURL: 'https://api',
  timeout: 10000,
  interceptor: {
    // 请求拦截器，可以在请求发送前对config进行修改，比如添加token等
    requestSuccessFn: (config) => {
      // 判断token是否存在
      const token = uni.getStorageSync('token')
      if(token){
        config.header.Authorization = token
      }
      return config
    },
    /**
     * 1. 响应拦截器，因为请求成功后，有两data层，这里进行一层过滤，使用更简洁
     * 2. 响应拦截器，对请求失败的情况进行拦截，比如token过期，跳转到登录页
     * 3. 拦截code壮态码，不正确通promise.reject抛出异常，在使用时就可以不用单独判断code壮态码了
     */ 
    responseSuccessFn: (res) => {
      if(res.data.code === 401) {
        uni.removeStorageSync('token')
        uni.navigateTo({url: "/pages/login/login"})
        return Promise.reject(res)
      }
      if(res.data.code !== 200) {
        return Promise.reject(res)
      }
      return res.data
    },
  }
})

export default request
```

- 使用

```typescript
import request from "./index"

/**
 * get请求基本使用，ts支持泛型，可以返回指定类型
 * @param query get请求参数 
 */ 
export function getHomeInfos(query: Record<String, any>){
  return request.get<{list: any[]}>('/home/infos', query)
}

/**
 * post请求基本使用
 */ 
export function addUser(userInfo: {name: string, age: number}){
  return request.post<{code: number, msg: string}>('/home/infos', userInfo)
}

// 上传文件
export function uploadFile(filePath: string){
  return request.uploadFile<{code: number, msg: string}>({
    url: '/upload',
    filePath,
    name: 'file'
  })
} 
```
