### 应用的技术

`vue3`|`typescript`|`vite3`|`vant4`

### 环境搭建与项目执行

```sh
#安装nodejs(16+),推荐使用pnpm进行依赖安装
#全局安装pnpm
npm install -g pnpm

#下列命令需要在本项目目录下执行 (1~4)
#1安装依赖
pnpm install

#2. dev开发环境(默认端口8000)
pnpm dev

#3. 打包编译(默认编译到本项目的dist目录下)
pnpm build[:opt]
```

### 全局自定义 hooks

```sh
1. useCommon 公共方法
 useVant.moment (使用轻量级 moment-mini 插件做时间转换,具体用法可以参照moment文档，注意部分功能并不支持)
 [moment文档](https://momentjs.com/)

2. useVant 基于vant4封装的一些弹窗指令和loading，包含以下：
 useVant.vantToastMixin
 useVant.vantToastNoneMixin
 useVant.vantLoadingMixin
 useVant.vantCloseLoadingMixin
 useVant.vantConfirmNoCancelBtnMixin
 useVant.vantAlterMixin

3. useVueRouter 基于 Vue-Router4 封装的部分方法，包含以下：
 useVant.routerPushMixin
 useVant.routerReplaceMixin
 useVant.routerBackMixin
 useVant.getQueryParam
 useVant.getLocationParam
 useVant.vantAlterMixin

4. useTrack 埋点方法

5. useApp H5调用小程序方法
 useApp.goToLogin 跳转登录
 useApp.goBack 返回上一页
 useApp.goToHome 跳转主页
 useApp.goToPreviewFile 跳转小程序文件预览，需要传参 url 为文件地址
```

### 提交代码

```sh
#项目引入husky,请严格按照要求规范提交,规定的 commit 信息一般由两个部分: type 和 subject 组成，结构如下:
// type 指提交的类型
// subject 指提交的摘要信息
<type>: <subject>

#如发现husky执行异常，请手动执行一次命令解决:
pnpm prepare

#常用的 type 值包括如下:
feat: 添加新功能。
fix: 修复 Bug。
chore: 一些不影响功能的更改。
docs: 专指文档的修改。
perf: 性能方面的优化。
refactor: 代码重构。
test: 添加一些测试代码等等。
```

### 接口规范

````sh
`api` : 项目中接口做统一管理，按照模块来划分

#例如在 `api` 文件下新增 `login` 文件夹,用于存放登录模块的请求接口,login 文件夹下分别新增 `login.ts` `types.ts` :

`login.ts`:

```ts
import http from '@/service/http'
import * as T from './types'

const loginApi: T.ILoginApi = {
    login(params){
        return http.post('/login', params)
    }

}
export default loginApi
```

`types.ts`:

```ts
export interface ILoginParams {
  userName: string
  passWord: string | number
}
export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>
}
```
````
