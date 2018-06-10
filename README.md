# douban-demo

##找到bug的源头
只能重新写了,逻辑搞得太复杂了,为了首页的布局,需要把content隐藏,当点击事件发生,隐藏欢迎页,展示content,第二次click时需要清空content,他的高度变为0就会触发判断是否到底部的函数,这个函数肯定会返回true,所以,会发请求(一次是click触发的,另一次是scroll事件触发的)