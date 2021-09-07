## 2.0.6（2021-09-07）
【修复】未配置中间件的情况下导致无法访问到云函数方法  
【调整】现已将cloud.js重新封装为`explain-creq`，地址：[https://github.com/explaincloud/explain-creq](https://github.com/explaincloud/explain-creq)，cloud.js已从当前插件中移除
## 2.0.4（2021-08-19）
【新增】中间件的使用
【新增】云函数中`explain.request`可以获取请求信息，详情见`基类说明`->`explain对象`
【新增】云函数中`explain.response`可以设置响应信息，详情见`基类说明`->`explain对象`
【更新】explain对象属性，详情见`基类说明`->`explain对象`
【更新】cloud.js优化调整，现示例项目中已包含cloud.js的使用示例
【调整】依赖名称由原来的`explain`调整为`explain-unicloud`
【调整】已移除设置根路由方法`route.setRoot`，现可通过`route.add`然后将路由指定为`/`，并配置指定的HTTP Method
【调整】匹配模式与路由模式职责分离，匹配模式可由前端uniCloud.callFunction直接调用，路由模式需要云函数URL化后使用，完全支持RESTful，可使用uni.request进行请求或者使用ajax、axios等
## 1.0.2（2021-06-22）
URL化中URL重写现可将route与path合并。
## 1.0.1（2021-05-19）
新增cloud.js方便前端调用云函数。
## 1.0.0（2021-04-29）
调整为uni_modules目录规范。
