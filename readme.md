> 借助菜鸟工具网站上（https://c.runoob.com/）的工具方法，自定义了遍历文件夹处理文件的方法

# 使用介绍
- compress.js 文件是可使用node命令运行的文件
- js文件夹中存放的是压缩/解压的功能函数文件
- examples文件夹中是用于测试压缩/解压的文件

# compress.js
1. 进入到该文件所在的目录下，执行命令：node compress.js -dir=examples -type=css -rwr
2. 参数：
	- -dir= xxx；xxx是目标文件夹，指定将要处理的文件位于什么文件夹下
	- -type= yyy； yyy是指定处理的文件类型，例如将要压缩js文件，这里指定-type=js
	- -rwr 加上该参数，表明会用每个文件处理之后的结果重写覆盖原文件；如果不加上该参数，则会生成新的文件（名为 原文件名去掉后缀+min+文件类型） 

# 功能函数的介绍