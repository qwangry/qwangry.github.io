# 内容安全策略

内容安全策略CPS是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本(XSS)和数据注入攻击。


为了使CSP可用，需要配置网络服务器返回`Content-Security-Policy`的HTTP标头。

除此之外，`<meta>`元素也可以被用来配置该策略，例如
```html
<meta 
    http-equiv="Content-Security-Policy"
    content="default-src 'self'; img-src https://*; child-src 'none';" />
```

## 用途

- 缓解跨站脚本攻击：CSP的主要目标是减少和报告XSS攻击，XSS攻击利用了浏览器对于从服务器所获取的内容的信任。恶意脚本在受害者的浏览器中得以运行，因为浏览器信任其内容来源，即使有的时候这些脚本并非来自于它本该在的地方。

CSP通过指定有效域——即浏览器认可的可执行脚本的有效来源——使服务器管理者有能力减少或消除XSS攻击所依赖的载体。一个CSP兼容的浏览器将会执行从白名单域获取到的脚本文件，忽略所有的其他脚本（包括内联脚本和HTML的事件处理属性）

- 缓解数据包嗅探攻击：服务器可以指明哪种协议允许使用，一个完整的数据安全传输策略不仅强制使用HTTPS进行数据传输，也为所有的cookie标记、secure标识，并且提供自动的重定向使得HTTP页面导向HTTPS版本。网站也可以使用Strict-Transport-Security HTTP标头确保连接它的浏览器只使用加密通道

## 使用CSP
配置CSP涉及添加`Content-Security-Policy` HTTP标头到一个页面，并配置相应的值，以控制用户代理（浏览器等）可以为该页面获取哪些资源。

### 制定策略
使用`Content-Security-Policy` HTTP标头来指定策略：

```
Content-Security-Policy: policy
```

策略（policy）参数是一个包含了各种描述CSP策略指令的字符串。

### 编写策略
策略由一系列策略指令所组成，每个策略指令都描述了针对某个特定资源的类型以及策略生效的范围。

策略应当包含一个`default-src`策略指令，在其他资源类型没有符合自己的策略时应用该策略。

可以包含`default-src`或`script-src`指令来防止内联脚本运行，并杜绝`eval()`的使用。

也可以包含一个`default-src`或`script-src`指令去限制来自一个`<style>`元素或者style属性的内联样式。

对于不同的项目都有特定的指令，因此每种类型都可以有自己的指令，包括字体、frame、图像、音频和视频媒体、script和worker

### 示例

1、所有内容都来自站点的同一个源，不包括其子域名

```
Content-Security-Policy: default-src 'self'
```

2、允许内容来自信任的域名及子域名

```
Content-Security-Policy: default-src 'self' *.trusted.com
```

3、允许网页应用的用户在他们自己的内容中包含来自任何源的图片，但是限制音频或者视频需从信任的资源提供者，所有脚本必须从特定主机服务器获取可信的代码

```
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com
```

4、确保网站的所有内容都要通过 SSL 方式获取，以避免攻击者窃听用户发出的请求
```
Content-Security-Policy: default-src https://onlinebanking.jumbobank.com
```

5、想要允许在邮件里包含 HTML，同样图片允许从任何地方加载，但不允许 JavaScript 或者其他潜在的危险内容（从任意位置加载）。
```
Content-Security-Policy: default-src 'self' *.mailsite.com; img-src *
```

## 测试
为降低部署成本，CSP 可以部署为仅报告（report-only）模式。在此模式下，CSP 策略不是强制性的，但是任何违规行为将会报告给一个指定的 URI 地址。此外，仅报告标头可以用来测试对策略未来的修订，而不用实际部署它。


可以用 `Content-Security-Policy-Report-Only` HTTP 标头来指定你的策略

```
Content-Security-Policy-Report-Only: policy
```

如果 `Content-Security-Policy-Report-Only` 标头和 `Content-Security-Policy` 同时出现在一个响应中，两个策略均有效。在 `Content-Security-Policy` 标头中指定的策略有强制性，而 `Content-Security-Policy-Report-Only` 中的策略仅产生报告而不具有强制性

## 启用报告
默认情况下，违规报告并不会发送。为启用发送违规报告，需要指定 `report-to` 策略指令，并提供至少一个 URI 地址去递交报告：
```
Content-Security-Policy: default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi
```

## 违规报告的语法
作为报告的 JSON 对象和 `application/csp-report` `Content-Type` 一起发送，并包含了以下数据：

- blocked-uri

- disposition：根据 Content-Security-Policy-Report-Only 和 Content-Security-Policy 标头使用情况的不同，值为 "enforce" 或 "report"

- document-uri

- effective-directive：导致违规行为发生的指令

- original-policy

- referrer

- script-sample

- status-code

- violated-directive：导致违反策略的指令。violated-directive 是 effective-directive 字段的历史名称，并包含相同的值。

### 示例
```json
{
  "csp-report": {
    "blocked-uri": "http://example.com/css/style.css",
    "disposition": "report",
    "document-uri": "http://example.com/signup.html",
    "effective-directive": "style-src-elem",
    "original-policy": "default-src 'none'; style-src cdn.example.com; report-to /_/csp-reports",
    "referrer": "",
    "status-code": 200,
    "violated-directive": "style-src-elem"
  }
}
```

