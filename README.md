# fake-admin-system
一个检验学习成果的网页后台管理系统。实现了一些核心功能页面，剩下的页面等平时抽空做完。

技术栈：Vite+Vue3+TypeScript+Pinia+Axios+Element-Plus+Echarts：
* 使用Element-Plus组件库来设计页面的样式，对每个页面中重用的组件进行封装。
* 使用基于TypeScript的接口声明，对每个数据对象规范其内部数据类型，并通过编写配置文件的方式来决定每个组件的数据内容。
* 使用自动化工具生成路由与组件的映射，并通过注册动态路由的方式，为不同权限的人员展示不同的导航菜单。
* 使用Pinia来对数据进行统一的管理，通过封装Axios实例来统一网络请求的接口。在Pinia中进行统一的数据请求，进而方便数据的统一获取以及组件的封装与复用。
* 通过封装与使用Echarts组件来对商品数量、销量、收藏量以及在不同城市的销量进行可视化实现。

代码规范工具：
* ESLint+Prettier规范代码格式。
* Commitizen+Commitlint+husky规范git commit时的注释格式。
  * 每次commit时就用`npx cz`来替代，而不用`git commit`，Commitizen提供了规范好的注释。
  * husky钩子用来检查在pre-commit时的代码格式是否准确，以及commit时的注释是否符合规范。


## 网页展示
由于是开发后台系统，有很多页面是相似的，所以像弹框、搜索框这些组件直接单独抽取了出来进行封装。对于每种数据类型使用interface规范其内容，进而使得可以通过编写配置文件的方式来实现组件的开发。

此外，使用coderwhy这个自动化工具来生成路由与view组件的映射。

对于每一个组件的文件，都使用以下方式进行管理，比如main组件文件夹内部：
* 创建src文件夹来存放每个与之相关的.vue文件。
* 创建index.ts来作为统一封装的出口。
* 如果有要规定数据类型的话，创建type.ts来规定interface。
### 登录页面
目前只实现了帐号登录。登录页面用一个login-panel组件进行管理，其中又分为login-account+login-phone两个tab：
* 记住密码、忘记密码和登录按钮都是放在外面的。
* 当点击登录时，login-panel内部获取login-account或login-phone这两个tab的ref，然后调用它们的登录方法来进行登录。
* 登录态使用JWT来实现：发送用户名和密码到服务端，然后服务端检验用户名和密码的正确性，并创建一个jwt做返回。
  * 这里为了使用方便就将token放到了pinia和localstorage中进行管理，并且封装了一个localstorage的工具类cache来方便调用localstorage。
  * 后续每次请求数据的时候就先从pinia中取出(如果没有就从localstorage中拿)并放到Authorization中。

![alt text](./project_images/login.png)

### 基于echart的商品统计页面
由于每个echart组件都是传入一个options来实现不同的样式的，所以就封装一个base-echart组件，不同样式的组件就使用写配置文件的方式来写options。最后要用的时候就import配置文件，然后v-bind到base-echart就能直接用。
* 对每个组件添加了对窗口resize的监听事件，在内部调用echart实例的resize()，进而让其echart的大小能随着窗口的缩放而缩放。

![alt text](./project_images/product_summary.png)
