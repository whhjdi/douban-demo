# douban-demo

## 开发日志
1. 2018.6.5 开始思考设计界面.最终决定使用bootStrap,功能为电影,音乐,图书的搜索(豆瓣API)
2. 2018.6.6 图片加载非常多的403,最终找了个图片缓存的网站成功解决,感谢互联网
3. 2018.6.7 想着滑动到底部继续发请求加载,监听了scroll事件,发现scroll事件监听是连续的,频繁的触发,不能实现想要的结果,然后就学会了一点函数节流的方法,用一个setTimeout.
每次请求完,scrollTop不会回到0,也就是说,再次点击搜索,会出现想不到的情况
4. 2018.6.8~6.9 为了首页的布局,需要把content隐藏,当点击事件发生,隐藏欢迎页,展示content,第二次click时需要清空content,他的高度变为0就会触发判断是否到底部的函数,这个函数肯定会返回true,所以,会发请求(一次是click触发的,另一次是scroll事件触发的),最终决定放弃这个方案,重新设计整理
5. 2018.6.10~6.11 改用翻页的形式进行展示,优点是便于控制请求,不容易出现bug.
初步代码编写完成,功能基本实现
6. 2018.6.12 将代码分为 事件绑定,获取数据和渲染数据三部分以及一个入口,其他细节的优化
发现$.Ajax().done(),done里面如果调用了setData.那么setData后面的代码的this就是setData
增加数据条数的判断,如果没有更多数据,则跳转返回首页(这种解决方式太简单粗暴了),我想的是如果后边没有数据了,就告诉用户,然后显示之前的页面,但是我代码的组织方式好像不允许我这样做,我再想想
