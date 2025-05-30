# 基本语法

## shell和shell脚本的概念

shell是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

shell脚本（shell script），是一种为shell编写的脚本程序。

### 环境

shell变成与Java、PHP等编程一样，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了。

#### OS

目前主流的操作系统都支持shell编程

Linux：默认安装就带了shell解释器

Mac OS：不仅带了sh、bash这两个最基础的解释器，还内置了ksh、csh、zsh等不常用的解释器

Windows上的模拟器：Windows出厂时没有内置shell解释器，需要自行安装，cygwin或mingw模拟Linux环境

### 脚本解释器

#### sh
即 Bourne shell， POSIX（Portable Operating System Interface）标准的shell解释器，它的二进制文件路径通常是`/bin/bash`，由Bell Labs开发。

#### bash
Bash是Bourne shell的替代品，属于GNU Project，二进制文件路径通常是`/bin/bash`。业界通常混用bash、sh和shell。

在CentOS里，`/bin/sh`是指一个指向`/bin/bash`的符号链接

```sh
[root@centosraw ~]# ls -l /bin/*sh
-rwxr-xr-x. 1 root root 903272 Feb 22 05:09 /bin/bash
-rwxr-xr-x. 1 root root 106216 Oct 17  2012 /bin/dash
lrwxrwxrwx. 1 root root      4 Mar 22 10:22 /bin/sh -> bash
```

在Mac OS上不是，`/bin/sh`和`/bin/bash`是两个不同的文件

```sh
iMac:~ wuxiao$ ls -l /bin/*sh
-r-xr-xr-x  1 root  wheel  1371648  6 Nov 16:52 /bin/bash
-rwxr-xr-x  2 root  wheel   772992  6 Nov 16:52 /bin/csh
-r-xr-xr-x  1 root  wheel  2180736  6 Nov 16:52 /bin/ksh
-r-xr-xr-x  1 root  wheel  1371712  6 Nov 16:52 /bin/sh
-rwxr-xr-x  2 root  wheel   772992  6 Nov 16:52 /bin/tcsh
-rwxr-xr-x  1 root  wheel  1103984  6 Nov 16:52 /bin/zsh
```

## 基本语法

### 第一行

```sh
#! /bin/bash
#! /usr/bin/php
```

`#!`是一个约定的标记，告诉系统这个脚本需要什么解释器来执行

### 运行

#### 作为可执行程序

```sh
chmod +x test.sh
./tesh.sh
```

> 一定要写成./test.sh的形式，而不是test.sh

#### 作为解释器参数

直接运行解释器，其参数就是shell脚本的文件名

```sh
/bin/sh test.sh
```

### 传递参数
可以在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为 `$n`，`n` 代表一个数字，`1` 为执行脚本的第一个参数，`2` 为执行脚本的第二个参数。

 `$0` 为执行的文件名（包含文件路径）
```sh
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```

为脚本设置可执行权限，并执行脚本：

```sh
chomod +x test.sh
./test.sh 1 2 3
# 执行的文件名：./test.sh
# 第一个参数为：1
# 第二个参数为：2
# 第三个参数为：3
```

### 变量

#### 定义变量

```sh
name="xxx"
```
> 变量名和等号之间不能有空格

除了显式地赋值，还可以用语句给变量赋值：
```sh
for file in `ls /etc`
```

#### 使用变量
使用一个定义过的变量，只要在变量名前面加美元符号即可

```sh
name="xxx"
echo $name
echo ${name}
```

变量名外面的花括号是可选的，加不加都行，加上是为了帮助解释器识别变量的边界

```sh
for skill in Ada Coffe Action Java; do
    echo "I am good at ${skill}Script"
done
```

#### 重定义变量
已定义的变量，可以被重新定义

```sh
name="xxx"
echo $name

name="xxx2"
echo $name
```

### 注释

以`#`开头的行就是注释，会被解释器忽略

#### 多行注释

没有多行注释，只能每一行加一个`#`号

### 字符串
可以用单引号、双引号，也可以不用双引号

#### 单引号
```sh
str='this is a string'
```

单引号限制：

- 任何字符都会原样输出，单引号字符串中的变量是无效的

- 不能出现单引号，转义也不行

#### 双引号
```sh
name="xxx"
str="hello, I am \"$name\"! \n"
```

双引号里可以有变量，可以出现转义符

#### 字符串操作

**拼接**

```sh
name="xxx"
greeting="hello, "$name" !"
greeting2="hello, ${name}!"

echo $greeting $greeting2
```

**长度**
```sh
str="acbd"
echo ${#str}
```
变量为字符串时，`${#string}` 等价于 `${#string[0]}`

**提取子字符串**
```sh
str="alibaba is a great company"
echo ${str:1:4}
# liba
```

**查找字符串**
```sh
str="alibaba is a great company"
echo `expr index "$string is`
# 3
# 找出字母i在这名话中的位置
```

### 数组

shell中，用括号表示数组，用空格符号分割数组元素

```sh
array_name=(value0 value1 value2)
array_name=(
    value0 
    value1 
    value2
    )
array_name[0]=value0
array_name[1]=value1
array_name[n]=valuen
```

#### 读取数组
```sh
${数组名[下标]}
```

```sh
value=${array_name[n]}
```

`@`符号可以获取数组中的所有元素
```sh
echo ${array_name[@]}
```

#### 获取数组的长度
```sh
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lenght=${#array_name[n]}
```

### 运算符
Shell 和其他编程语言一样，支持多种运算符，包括：

- 算数运算符

- 关系运算符

- 布尔运算符

- 字符串运算符

- 文件测试运算符

原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 `awk` 和 `expr`，`expr` 最常用。

`expr` 是一款表达式计算工具，使用它能完成表达式的求值操作

```sh
#!/bin/bash

val=`expr 2 + 2`
echo "两数之和为 : $val"
```

> 表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2
>
> 完整的表达式要被 "` `" 包含

#### 算术运算符
+、-、*、/、%、=、==、!=

```sh
`expr $a + $b`

`expr $a - $b`

# 乘号(*)前边必须加反斜杠(\)才能实现乘法运算；
`expr $a \* $b`

`expr $b / $a`

`expr $b % $a`

a=$b

[ $a == $b ] 

[ $a != $b ]

# 条件表达式要放在方括号之间，并且要有空格，例如: [$a==$b] 是错误的，必须写成 [ $a == $b ]
```
```sh
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a=10
b=20

val=`expr $a + $b`
echo "a + b : $val"

val=`expr $a - $b`
echo "a - b : $val"

val=`expr $a \* $b`
echo "a * b : $val"

val=`expr $b / $a`
echo "b / a : $val"

val=`expr $b % $a`
echo "b % a : $val"

if [ $a == $b ]
then
   echo "a 等于 b"
fi
if [ $a != $b ]
then
   echo "a 不等于 b"
fi

# a + b : 30
# a - b : -10
# a * b : 200
# b / a : 2
# b % a : 0
# a 不等于 b
```

#### 关系运算符
只支持数字，不支持字符串

- `-eq`：是否相等，相等返回true

- `-ne`：是否不相等，不相等返回true

- `-gt`：左边是否大于右边，是，返回true

- `-lt`：左边是否小于右边，是，返回true

- `-ge`：左边是否大于等于右边，是，返回true

- `-le`：左边是否小于等于右边，是，返回true


```sh
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a=10
b=20

if [ $a -eq $b ]
then
   echo "$a -eq $b : a 等于 b"
else
   echo "$a -eq $b: a 不等于 b"
fi
if [ $a -ne $b ]
then
   echo "$a -ne $b: a 不等于 b"
else
   echo "$a -ne $b : a 等于 b"
fi
if [ $a -gt $b ]
then
   echo "$a -gt $b: a 大于 b"
else
   echo "$a -gt $b: a 不大于 b"
fi
if [ $a -lt $b ]
then
   echo "$a -lt $b: a 小于 b"
else
   echo "$a -lt $b: a 不小于 b"
fi
if [ $a -ge $b ]
then
   echo "$a -ge $b: a 大于或等于 b"
else
   echo "$a -ge $b: a 小于 b"
fi
if [ $a -le $b ]
then
   echo "$a -le $b: a 小于或等于 b"
else
   echo "$a -le $b: a 大于 b"
fi

# 10 -eq 20: a 不等于 b
# 10 -ne 20: a 不等于 b
# 10 -gt 20: a 不大于 b
# 10 -lt 20: a 小于 b
# 10 -ge 20: a 小于 b
# 10 -le 20: a 小于或等于 b
```

#### 布尔运算符

- `!`：非运算

- `-o`：或运算

- `-a`：与运算

```sh
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a=10
b=20

if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a == $b: a 等于 b"
fi
if [ $a -lt 100 -a $b -gt 15 ]
then
   echo "$a 小于 100 且 $b 大于 15 : 返回 true"
else
   echo "$a 小于 100 且 $b 大于 15 : 返回 false"
fi
if [ $a -lt 100 -o $b -gt 100 ]
then
   echo "$a 小于 100 或 $b 大于 100 : 返回 true"
else
   echo "$a 小于 100 或 $b 大于 100 : 返回 false"
fi
if [ $a -lt 5 -o $b -gt 100 ]
then
   echo "$a 小于 5 或 $b 大于 100 : 返回 true"
else
   echo "$a 小于 5 或 $b 大于 100 : 返回 false"
fi

# 10 != 20 : a 不等于 b
# 10 小于 100 且 20 大于 15 : 返回 true
# 10 小于 100 或 20 大于 100 : 返回 true
# 10 小于 5 或 20 大于 100 : 返回 false
```

#### 逻辑运算符

- `&&`：逻辑的AND

- `||`：逻辑的OR

```sh
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a=10
b=20

if [[ $a -lt 100 && $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
fi

if [[ $a -lt 100 || $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
fi

# 返回 false
# 返回 true
```
#### 字符串运算符
- `=`

- `!=`

- `-z`：检测长度是否为0，是，返回true

- `-n`：检测长度是否不为0，是，返回true

- `$`：检测是否不为空，不为空，返回true

```sh
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a="abc"
b="efg"

if [ $a = $b ]
then
   echo "$a = $b : a 等于 b"
else
   echo "$a = $b: a 不等于 b"
fi
if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a != $b: a 等于 b"
fi
if [ -z $a ]
then
   echo "-z $a : 字符串长度为 0"
else
   echo "-z $a : 字符串长度不为 0"
fi
if [ -n "$a" ]
then
   echo "-n $a : 字符串长度不为 0"
else
   echo "-n $a : 字符串长度为 0"
fi
if [ $a ]
then
   echo "$a : 字符串不为空"
else
   echo "$a : 字符串为空"
fi
# abc = efg: a 不等于 b
# abc != efg : a 不等于 b
# -z abc : 字符串长度不为 0
# -n abc : 字符串长度不为 0
# abc : 字符串不为空
```

#### 文件测试运算符

- `-b file`	检测文件是否是块设备文件，如果是，则返回 true。	

- `-c file`	检测文件是否是字符设备文件，如果是，则返回 true。	

- `-d file`	检测文件是否是目录，如果是，则返回 true。	

- `-f file`	检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。	

- `-g file`	检测文件是否设置了 SGID 位，如果是，则返回 true。	

- `-k file`	检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。	

- `-p file`	检测文件是否是有名管道，如果是，则返回 true。	

- `-u file`	检测文件是否设置了 SUID 位，如果是，则返回 true。	

- `-r file`	检测文件是否可读，如果是，则返回 true。	

- `-w file`	检测文件是否可写，如果是，则返回 true。	

- `-x file`	检测文件是否可执行，如果是，则返回 true。

- `-s file`	检测文件是否为空（文件大小是否大于0），不为空返回 true。	

- `-e file`	检测文件（包括目录）是否存在，如果是，则返回 true。	

#### 自增和自减运算符
使用let命令，let 命令允许对整数进行算术运算。

```sh
#!/bin/bash

# 初始化变量
num=5

# 自增
let num++

# 自减
let num--

echo $num
```

#### 使用$(())进行算术运算
`$(())`语法是进行算术运算的一种方式
```sh
#!/bin/bash

# 初始化变量
num=5

# 自增
num=$((num + 1))

# 自减
num=$((num - 1))

echo $num
```

#### 使用expr命令
`expr`命令可以用于算术运算，但在现代脚本中不如 `let` 和 `$(( ))` 常用
```sh
#!/bin/bash

# 初始化变量
num=5

# 自增
num=$(expr $num + 1)

# 自减
num=$(expr $num - 1)

echo $num
```

#### 使用(())进行算术运算
```sh
#!/bin/bash

# 初始化变量
num=5

# 自增
((num++))

# 自减
((num--))

echo $num
```



### 条件判断

#### if
```sh
if condition
then
    command1
    command2
    ...
    commandN
fi
```

```sh
if `ps -ef | grep ssh`;  then echo hello; fi
```


#### if else

```sh
if condition
then
    command1
    command2
    ...
    commandN
else
    command
fi
```

if else的`[...]`判断语句中大于使用`-gt`，小于使用`-lt`
```sh
if [ "$a" -gt "$b" ]; then
...
fi
```

使用`((...))`作为判断语句，大于和小于可以直接使用`>`和`<`
```sh
if (( a > b )); then
...
fi
```

经常和test命令结合使用
```sh
num1=$[2*3]
num2=$[1+5]
if test $[num1] -eq $[num2]
then
    echo '两个数字相等!'
else
    echo '两个数字不相等!'
fi
```


#### if else-if else
```sh
if condition1
then
	command1
elif condition2
	command2
else
	commandN
fi
```

### 流程控制

#### for

```sh
for var in item1 item2 ... itemN
do
	command1
	command2
	...
	commandN
done
```

#### C风格的for
```sh
for (( EXP1; EXP2; EXP3 ))
do
	command1
	command2
	command3
done
```

```sh
for ((i=0;i<10;i++)); do
    touch test_$i.txt
done
```

#### while

```sh
while condition
do
	command
done
```

#### 无限循环
```sh
while :
do
	command
done
```

```sh
while true
do
	command
done
```

```sh
for (( ; ; ))
```


#### util

```sh
until condition
do
	command
done
```

#### case
```sh
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2)
    command1
    command2
    ...
    commandN
    ;;
esac
```

```sh
case "${opt}" in
	"Install-Puppet-Server" )
		install_master $1
		exit
	;;

	"Install-Puppet-Client" )
		install_client $1
		exit
	;;

	"Config-Puppet-Server" )
		config_puppet_master
		exit
	;;

	"Config-Puppet-Client" )
		config_puppet_client
		exit
	;;

	"Exit" )
		exit
	;;

	* ) echo "Bad option, please choose again"
esac
```

### 函数
```sh
[ function ] funname [()]

{

    action;

    [return int;]

}
```

1、可以带 `function fun()` 定义，也可以直接 `fun()` 定义,不带任何参数。

2、参数返回，可以显示加：`return` 返回，如果不加，将以最后一条命令运行结果，作为返回值。 `return` 后跟数值 `n(0-255)`


```sh
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

funWithReturn(){
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum+$anotherNum))
}
funWithReturn
echo "输入的两个数字之和为 $? !"
# 这个函数会对输入的两个数字进行相加运算...
# 输入第一个数字: 
# 1
# 输入第二个数字: 
# 2
# 两个数字分别为 1 和 2 !
# 输入的两个数字之和为 3 !
```

函数返回值在调用该函数后通过 `$?` 来获得。

#### 函数参数

函数体内部，通过 $n 的形式来获取参数的值，当n>=10时，需要使用${n}来获取参数

```sh
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

funWithParam(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73
```

`$#`	传递到脚本或函数的参数个数

`$*`	以一个单字符串显示所有向脚本传递的参数

`$$`	脚本运行的当前进程ID号

`$!`	后台运行的最后一个进程的ID号

`$@`	与`$*`相同，但是使用时加引号，并在引号中返回每个参数。

`$-`	显示Shell使用的当前选项，与set命令功能相同。

`$?`	显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。


## 命令

### echo命令

用于字符串的输出

```sh
echo string
```

#### 显示普通字符串
```sh
# 双引号可以省略
echo "It is a test"
echo It is a test
```

#### 显示转义字符
```sh
# 双引号也可以省略
echo "\"It is a test\""
# "It is a test"
```

#### 显示变量
read命令从标准输入中读取一行，并把输入行的每个字段的值指定给shell变量
```sh
#!/bin/sh
read name 
echo "$name It is a test"
# [root@www ~]# sh test.sh
# OK                     #标准输入
# OK It is a test        #输出
```

#### 显示换行
```sh
echo -e "OK! \n" # -e 开启转义
echo "It is a test"
# OK!

# It is a test
```

#### 显示不换行
```sh
#!/bin/sh
echo -e "OK! \c" # -e 开启转义 \c 不换行
echo "It is a test"
# OK! It is a test
```

#### 显示结果定向至文件
```sh
echo "It is a test" > myfile
```

#### 原样输出字符串，不进行转移或取变量（用单引号）
```sh
echo '$name\"'
# $name\"
```

#### 显示命令执行结果
```sh
echo `date`
# Thu Jul 24 10:08:46 CST 2014
```

### printf命令
```sh
printf  format-string  [arguments...]
```

### test命令
用于检查某个条件是否成立，它可以进行数值、字符和文件三个方面的测试

#### 数值测试

- `-eq`：等于则为真

- `-ne`：不等于则为真

- `-gt`：大于则为真

- `-ge`：大于等于则为真

- `-lt`：小于则为真

- `-le`：小于等于则为真

```sh
num1=100
num2=100
if test $[num1] -eq $[num2]
then
    echo '两个数相等！'
else
    echo '两个数不相等！'
fi
# 两个数相等！
```

代码中的 `[]` 执行基本的算数运算

```sh
#!/bin/bash

a=5
b=6

result=$[a+b] # 注意等号两边不能有空格
echo "result 为： $result"
# result 为： 11
```
#### 字符串测试
- `=`

- `!=`

- `-z 字符串`：字符串的长度为0则为真

- `-n 字符串`：字符串的长度不为零则为真


```sh
num1="ru1noob"
num2="runoob"
if test $num1 = $num2
then
    echo '两个字符串相等!'
else
    echo '两个字符串不相等!'
fi
# 两个字符串不相等!
```

#### 文件测试
- `-e 文件名`	如果文件存在则为真

- `-r 文件名`	如果文件存在且可读则为真

- `-w 文件名`	如果文件存在且可写则为真

- `-x 文件名`	如果文件存在且可执行则为真

- `-s 文件名`	如果文件存在且至少有一个字符则为真

- `-d 文件名`	如果文件存在且为目录则为真

- `-f 文件名`	如果文件存在且为普通文件则为真

- `-c 文件名`	如果文件存在且为字符型特殊文件则为真

- `-b 文件名`	如果文件存在且为块特殊文件则为真

```sh
cd /bin
if test -e ./bash
then
    echo '文件已存在!'
else
    echo '文件不存在!'
fi
# 文件已存在!
```

另外，Shell 还提供了与( `-a` )、或( `-o` )、非( `!` )三个逻辑操作符用于将测试条件连接起来，其优先级为： `!` 最高， `-a` 次之， `-o` 最低。

```sh
cd /bin
if test -e ./notFile -o -e ./bash
then
    echo '至少有一个文件存在!'
else
    echo '两个文件都不存在'
fi
# 至少有一个文件存在!
```

### 输入输出重定向

`command > file`	将输出重定向到 file。

`command < file`	将输入重定向到 file。

`command >> fil`e	将输出以追加的方式重定向到 file。

`n > file`	将文件描述符为 n 的文件重定向到 file。

`n >> file`	将文件描述符为 n 的文件以追加的方式重定向到 file。

`n >& m`	将输出文件 m 和 n 合并。

`n <& m`	将输入文件 m 和 n 合并。

`<< tag`	将开始标记 tag 和结束标记 tag 之间的内容作为输入。


## 参考
[https://github.com/qinjx/30min_guides/blob/master/shell.md](https://github.com/qinjx/30min_guides/blob/master/shell.md)

[https://www.runoob.com/w3cnote/shell-quick-start.html](https://www.runoob.com/w3cnote/shell-quick-start.html)