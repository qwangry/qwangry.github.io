# HTML5辅助交互的属性

HTML5提供了一些列新的属性，可以辅助用户与网页的交互，提升用户体验

1、autofocus

> 为表单元素添加autofocus属性，页面加载时会自动聚焦到指定的元素上，帮助用户立即进行输入

2、required

> 用于表单输入，强制用户在提交表单前填写某个字段，配合浏览器的原生验证，可以有效减少表单验证的前端代码

3、placeholder

> 为文本输入框提供占位符文本，当用户没有输入时，显示提示文字，帮助用户理解该输入框的用途

4、pattern

> 允许开发者为input元素定义一个正则表达式，用户输入的内容必须匹配此正则表达式，才能通过浏览器的验证

5、min和max

> 日期、时间、数字等类型的输入，规定最大值和最小值

6、step

> 控制用户输入的数值的间隔

7、multiple

> 允许用户在file类型或Email类型的input元素中选择多个文件或输入多个电子邮件地址

8、dataset和list

> 为input元素提供自动补全选项，帮助用户选择输入的内容

9、autocomplete

> 通过autocomplete属性，允许浏览器根据用户的历史输入记录为表单字段自动填充内容，减少重复输入

10、novalidate

> 用于表单元素，禁用浏览器的表单验证机制，让开发者自行处理验证逻辑

11、formaction

> 用于指定表单提交的URL，可以覆盖表单标签的action属性

12、formenctype

> 指定表单提交时的编码类型，适用于button或input类型为submit的元素，用来改变该按钮的表单提交编码类型

13、formmethod

> 指定提交表单时使用的HTTP方法，用于覆盖表单的method方法

14、formtarget

> 指定表单提交后响应显示的目标窗口或框架

15、minlength和maxlength

> 

16、readonly

> 

17、draggable

> 指定HTML元素是否可以被拖动

18、contenteditable

> 允许用户直接在元素内部进行编辑，任何支持内容的元素都可以通过该属性变成可编辑的区域。

19、spellcheck

> 指定是否在输入时检查拼写错误，适用于文本输入和内容编辑元素

20、contextmenu

> 通过 contextmenu 属性指定右键点击时显示的自定义上下文菜单。

21、 aria-* 属性

> HTML5 还集成了 ARIA（Accessible Rich Internet Applications）属性，可以`增强无障碍性`。aria-* 属性用于帮助屏幕阅读器和其他辅助技术理解元素的功能和状态，从而提高 Web 内容的可访问性。


```
aria-label：为无文本元素提供可访问的标签。
aria-labelledby：通过引用其他元素为当前元素提供标签。
aria-describedby：提供额外的描述信息。
aria-hidden：隐藏不需要被屏幕阅读器读取的元素。
aria-live：指示动态内容的变化通知。
aria-expanded、aria-controls：指示折叠/展开状态及其控制关系。
aria-pressed：指示切换按钮的按下状态。
```