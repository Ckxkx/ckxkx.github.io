---
tags:
  - nushell
  - 终端
  - shell
  - 评测
categories:
  - 科技
title: Nushell-好玩的彩色终端
date: 2026-11-08T08:31:24.788Z
index_img: https://img.huichen.kdns.fr/imgs/20261116165100425.webp
---

# Nushell 评测：当 shell 开始认真对待"数据"

> 评测环境：Windows 10 (19045) · Nushell **0.116.1** · Git Bash 作为对照组
> 所有命令与输出都是本机实跑结果，不是抄文档。

## 一、先说结论

一句话：**Nushell 不是"更好看的 bash"，它是把 shell 的管道从"字节流"升级成了"带类型的表格"。**

它解决的是我这类人长期的隐性痛点——为了在命令行里处理点数据，不得不在 `awk`、`sed`、`jq`、`cut`、`sort` 之间反复试错，还要和引号、空格、中文、WSL 路径打架。

我的主观评分：

| 维度 | 评分 | 说明 |
| --- | --- | --- |
| 数据处理能力 | 9.5/10 | 结构化管道，扁平化处理 JSON/CSV/TOML/XLSX/SQLite |
| 报错体验 | 9/10 | 会指出位置、猜你想打的命令，还带 help 建议 |
| 交互体验 | 8.5/10 | 表格输出、`explore`、自动补全、语法高亮 |
| 上手成本 | 5/10 | 语法是新的，bash 直觉一半会失效 |
| 生态成熟度 | 7/10 | 533 个内置命令，插件体系有了，但第三方脚本少 |
| POSIX 兼容 | 2/10 | 基本没有，脚本不能直接跑 |

**适合谁**：经常在终端里摸文件的、写数据脚本的、被 `jq` 语法折腾过的、Windows 用户。
**不适合谁**：维护一堆 bash 部署脚本的运维、需要严格 POSIX 的 CI 环境。

## 二、第一印象：它真的很"彩色"

打开就发现，`ls` 不再是白色一坨：

```
> ls | where type == dir | sort-by size -r | first 5 | select name size
╭───┬────────────┬──────────╮
│ # │    name    │   size   │
├───┼────────────┼──────────┤
│ 0 │ Music      │ 163.8 kB │
│ 1 │ Desktop    │  49.1 kB │
│ 2 │ .codex     │  28.6 kB │
│ 3 │ Documents  │   8.1 kB │
│ 4 │ .workbuddy │   8.1 kB │
╰───┴────────────┴──────────╯
```

注意这里发生了三件在 bash 里根本做不到的事：

1. `size` 是**真的数值**，可以 `sort-by size -r` 直接排序，不用 `du -sh | sort -h`
2. `select` 是在**取列**，不是 `awk '{print $1,$2}'`
3. 输出是表格（可读性来自渲染，底层还是结构化数据）

复杂嵌套的结构也能渲染：

```
> {a: {b: {c: 1}}, d: [1 2 3]} | table -e
╭───┬───────────────────╮
│   │ ╭───┬───────────╮ │
│ a │ │   │ ╭───┬───╮ │ │
│   │ │ b │ │ c │ 1 │ │ │
│   │ │   │ ╰───┴───╯ │ │
│   │ ╰───┴───────────╯ │
│   │ ╭───┬───╮         │
│ d │ │ 0 │ 1 │         │
│   │ │ 1 │ 2 │         │
│   │ │ 2 │ 3 │         │
│   │ ╰───┴───╯         │
╰───┴───────────────────╯
```

## 三、核心差异：管道里传的是"值"，不是"文本"

这是整个 Nushell 的设计基石，也是我留下它的唯一理由。

### 3.1 一切都有类型

```
> [([1 2 3]), (ls), (date now), "abc"] | each {|x| $x | describe }
* list<int>
* table<name: string, type: string, size: filesize, modified: datetime>
* datetime
* string
```

`describe` 会告诉你手上这坨东西到底是什么。`ls` 返回的不是字符串行，而是 `table<name, type, size, modified>` —— 列名和类型都写在类型里。

于是 `filesize`、`datetime`、`duration` 是真类型：

```
> (date now) - (date now | into datetime)
-846µs 200ns

> [1 2 3] | each {|x| $x * 2 } | math sum
12
```

在 bash 里算时间差得靠 `date +%s` 两次相减再手算格式化，这里直接减。

### 3.2 一个真实抓取，一行搞定

```
> http get https://api.github.com/repos/nushell/nushell | select stargazers_count forks_count
╭──────────────────┬───────╮
│ stargazers_count │ 41055 │
│ forks_count      │  2344 │
╰──────────────────┴───────╯
```

`http get` 直接返回解析后的 JSON 值，不用 `curl ... | jq -r '.stargazers_count'`，也不用担心响应里有没有换行。抓取时间 2026-11-08，star 已经四万出头了。

### 3.3 分组聚合不用背 awk 语法

```
> [[k v]; [a 1] [a 2] [b 3]] | group-by k | transpose key rows | to md
```

| key | rows |
| --- | --- |
| a | [{k: a, v: 1}, {k: a, v: 2}] |
| b | [{k: b, v: 3}] |

同样的活在 bash 里我要 `awk '{a[$1]+=$2} END{for(i in a) print i,a[i]}'`，而且处理不了带空格的值。

### 3.4 文件格式全部扁平化

```
> help commands | where name starts-with "from " | get name | str join ", "
from csv, from json, from kdl, from md, from msgpack, from msgpackz, from nuon, from ods, from ssv, from toml, from tsv, from url, from xlsx, from xml, from yaml, from yml
```

读 Excel 都行（`open 表格.xlsx` 走 `from xlsx`），这在我日常里是刚需——以前要么开 Excel，要么写 Python。

连 SQLite 都有：

```
> let d = [[name score]; [nu 95] [bash 80]]
> $d | into sqlite test.db
> open test.db | query db "select * from main where score > 90"
| name | score |
| ---- | ----- |
| nu   | 95    |
```

`into sqlite` 把表格写进库，`open` 自动识别库，`query db` 直接跑 SQL。**这就是把"数据处理"当一等公民的样子。**

## 四、报错体验：目前最好的一档

我故意打错一个命令：

```
> ls | wheree type == dir
Error: nu::shell::external_command

  x External command failed
   ,-[source:1:6]
 1 | ls | wheree type == dir
   :      ^^^|^^
   :         `-- Command `wheree` not found
   `----
  help: Did you mean `where`?
```

它做了四件事：告诉你错误分类（`external_command`）、画出精确位置、解释原因、给出修正建议。这比 bash 的 `command not found` 高了一个时代。

类型不匹配也说得清清楚楚：

```
> sys | columns
Error: nu::shell::only_supports_this_input_type
  x Input type not supported.
   ,-[source:1:1]
 1 | sys | columns
   : ^|^   ^^^|^^
   :  |       `-- only table and record input data is supported
   :  `-- input type: string
```

（顺带一提，这个报错帮我发现了 `sys` 返回的是 lazy record，得用 `sys host | to md` 而不是 `sys host | columns`。）

## 五、能自定义命令，而且写法像正经语言

```
> def greet [name: string, --loud] {
    let msg = $"hello, ($name)!"
    if $loud { $msg | str uppercase } else { $msg }
  }
> greet nushell; greet nushell --loud
hello, nushell!
HELLO, NUSHELL!
```

- `$"..."` 是插值字符串，`($name)` 求值
- 参数有类型（`name: string`）
- flag 用 `--loud`，自动变成 bool
- `if/else` 是**表达式**，能返回值

还能给命令声明输入输出类型，管道里加列：

```
> def "add-col" [] { $in | insert doubled {|r| $r.score * 2 } }
> [[score]; [1] [2]] | add-col | to md

| score | doubled |
| ----- | ------- |
| 1     | 2       |
| 2     | 4       |
```

`$in` 是隐式管道输入，`insert` 是加列，闭包 `{|r| ...}` 拿整行。这套东西的可组合性，比我写过的任何 shell 脚本都好。

### 5.1 并行是真的并行

```
> timeit { 1..8 | par-each {|i| sleep 200ms; $i } | length }
204ms 508µs 400ns
```

8 个 200ms 的任务，总共 204ms —— `par-each` 确实在并行。bash 想做到这个要么 `&` + `wait` 自己管，要么写 GNU parallel 语法。

## 六、实战：用它管这个博客目录

这个目录有 6 篇 md，我拿它当小白鼠：

```
> ls **/*.md | select name size modified | to md

| name | size | modified |
| --- | --- | --- |
| DeepSeek新架构：Super-agent解决的四个矛盾.md | 6.4 kB | Mon, 2 Nov 2026 22:22:59 +0800 (5 days ago) |
| Nushell-好玩的彩色终端.md | 57 B | Sun, 8 Nov 2026 16:01:53 +0800 (2 minutes ago) |
| 云不喜火锅后记.md | 670 B | Wed, 4 Nov 2026 00:30:58 +0800 (4 days ago) |
| 使用Taio修改苹果手机隐藏文件.md | 1.1 kB | Sun, 1 Nov 2026 11:02:03 +0800 (a week ago) |
| 苍穹外卖第一天.md | 4.3 kB | Wed, 4 Nov 2026 22:02:33 +0800 (3 days ago) |
| 苏大机试第三批-回忆版.md | 3.1 kB | Sun, 1 Nov 2026 11:02:03 +0800 (a week ago) |

> ls **/*.md | get size | math sum | into filesize
15.9 kB
```

中文文件名、`kB` 单位、相对时间（"5 days ago"）全部原生支持，没出一次编码问题。`**` 递归 + `get` 取列 + `math sum` 求和，一条链到底，中间不需要任何管道工具。

顺手还能看机器状态：

```
> sys host | to md

| name | os_version | long_os_version | kernel_version | hostname | uptime | boot_time |
| Windows | 10 (19045) | Windows 10 Pro for Workstations | 19045 | hackzhu | 1wk 3day 22hr 54min 21sec | ... |

> sys mem | to md

| total | free | used | available | swap total | swap free | swap used |
| 34.1 GB | 12.8 GB | 21.2 GB | 12.8 GB | 9.3 GB | 6.9 GB | 2.3 GB |
```

## 七、踩坑记录（真实踩出来的，不粉饰）

这部分比优点更值得看。以下每一条我都实际撞过。

### 坑 1：`&&` 不存在

```
> true && false
Error: nu::parser::shell_andand
  x The '&&' operator is not supported in Nushell
```

要写 `and` / `or`。好处是报错明确告诉你不行，不会像某些 shell 那样静默出错。

### 坑 2：外部命令的输出是 `byte stream`

```
> ^git log --oneline -3 | describe
byte stream

> ^git log --oneline -3 | lines | length
1
```

bash 里 `git log` 的输出天然是"按行"，Nushell 里它是原始字节流。要按行处理必须 `lines`。**`^` 前缀是"强制当外部命令跑"**（因为 `ls`、`cd` 这些名字被内置命令占了）。

这一点是新手最大的认知落差，我第一次写 `| where $it =~ ...` 直接不工作就是因为忘了 `lines`。

### 坑 3：命令会被弃用，而且要盯着警告

```
Warning: nu::parser::deprecated
  ! Command deprecated.
  help: Use `str uppercase` instead.
```

`str upcase` 在 0.114 弃用了。1.0 还没发就一步步改 API，说明迭代很快 —— 好处是设计越来越干净，坏处是**你收藏的博客教程可能已经过时**。写脚本时最好照着 `help <命令>` 来，而不是搜出来的旧文章。

### 坑 4：布尔开关不能带类型注解

```
> def greet [name: string, --loud: bool] { ... }
Error: nu::parser::error
  x Type annotations are not allowed for boolean switches.
   :      `-- Remove the `: bool` type annotation.
```

`--loud` 本身就是 bool，写 `: bool` 是错的。报错把怎么改都写了，还算友好。

### 坑 5：不要给 `def` 随便标 `table`

```
> def "add-col" []: nothing -> table { ... }
Error: nu::parser::output_type_mismatch
  x Command output doesn't match table.
   :  `-- expected table, but command outputs error
```

裸 `table` 作为类型名不匹配。要么省略注解靠推断，要么写完整 `list<record<score: int, doubled: int>>`。**类型系统很爽，但也真会卡你。**

### 坑 6：Windows 下递归 glob 会撞权限

```
> ls **/*.md      # 在用户主目录执行
* Generic(GenericError { code: "nu::shell::error",
    error: "Error extracting glob pattern", msg: "拒绝访问。 (os error 5)" ... })
```

从 `C:\Users\xxx` 根上递归扫，必然遇到系统保护目录。有意思的是它**不中断**，而是把错误当成列表项返回 —— 设计上很"结构化"（错误是值），实际用起来会有点懵。

正确姿势：进到具体目录里再递归，或者过滤掉错误项。

### 坑 7：脚本不会逐行回显

```
> nu -c 'print "a"; "b"; "c"'
a
c
```

`"b"` 被丢掉了。Nushell 的脚本块是**块求值**（只返回最后表达式的值），不像 bash 每条命令都往 stdout 打。想输出就 `print`。

写文件也别用 `>`：

```
> "hi" | save -f t1.txt        # 覆盖
> "yo" | save -a t1.txt        # 追加
```

（顺带：`save` 不加换行，`hiyo` 会粘在一起。）

### 坑 8：bash 脚本基本不能直接搬

老的 `.sh` 一行都别想复用。要跑老的：

```
> ^bash deploy.sh
> sh -c "某条带一堆引号的命令"
```

### 坑 9：`$env.PATH` 是 list，不是字符串

```
> $env.PATH | describe
list<string>
> $env.PATH | length
119
```

这其实比 bash 的 `:` 拼接合理得多，但你以前那些 `export PATH=$PATH:xxx` 的写法全部作废，得用 `$env.PATH ++ [...]`。

### 坑 10：插件与格式支持按 feature 编译

```
> help commands | where name =~ "parquet" | get name
╭────────────╮
│ empty list │
╰────────────╯
```

`parquet` 需要额外插件/feature，不是开箱即用。`explore`（交互式数据浏览器）是有的，这点好评：

```
> help commands | where name =~ "explore" | get name
explore
explore config
explore regex
```

## 八、横向对比

| | bash | zsh | fish | PowerShell | **Nushell** |
| --- | --- | --- | --- | --- | --- |
| 管道传什么 | 文本 | 文本 | 文本 | 对象 | **带类型的表格** |
| 处理 JSON | 靠 jq | 靠 jq | 靠 jq | `ConvertFrom-Json` | **原生，直接取列** |
| 报错质量 | 差 | 差 | 中 | 好 | **好（带定位+建议）** |
| 补全/高亮 | 弱 | 强(插件) | 强 | 强 | **强** |
| POSIX 兼容 | 是 | 是 | 否 | 否 | **否** |
| 学新语法成本 | — | 低 | 低 | 高 | **高** |
| 启动开销 | 极低 | 低 | 低 | 高 | **低** |

启动开销我实测了一下（Windows，各跑 5 次取总）：

```
5 × nu   -c ""  →  real 0m0.229s   （约 45ms/次）
5 × bash -c ""  →  real 0m0.166s   （约 33ms/次）
```

只差十几毫秒，日常无感。但如果是**每行都 fork 一次**的脚本循环，这个差距会被放大 —— 所以别拿 nu 写高频循环的批处理。

## 九、我的迁移建议

如果你也想试，我建议按这个顺序，别一上来就换默认 shell：

### 第 1 周：只当"数据工具"

不换默认 shell，专门用它干这些活：

```nu
# 看目录
ls | where type == dir | sort-by modified -r | first 10

# 扒 API
http get https://api.github.com/repos/xxx/yyy | get stargazers_count

# 洗 CSV
open data.csv | where amount > 100 | sort-by amount -r | save -f clean.csv

# 查库
open app.db | query db "select * from users limit 10"
```

### 第 2 周：把常用脚本搬过来

```nu
def "blog stat" [] {
  let files = (ls **/*.md)
  print $"共 ($files | length) 篇，总计 ($files | get size | math sum | into filesize)"
  $files | sort-by modified -r | first 5 | select name modified | to md
}
```

`to md` 直接吐 Markdown 表格，粘进 Obsidian 就能用 —— 这个组合我个人用得最多。

### 第 3 周：决定要不要设成默认

Windows 上设默认 shell 参考：

```nu
$env.config = {
  show_banner: false
  edit_mode: emacs
  table: { mode: rounded, index_mode: never }
}
```

配置在 `$nu.config-path`（我这里是 `C:\Users\Zhu HuiChen\AppData\Roaming\nushell\config.nu`），环境变量在 `env.nu`。

**我自己的选择**：不设成默认。Git Bash 留着跑构建和 `sh` 脚本，Nushell 专门用来"看东西、查数据、写一次性分析脚本"。两个 shell 各干各擅长的，比强行二选一舒服。

## 十、最后

Nushell 让我改观的地方，不是"终端变彩色了"这种表面功夫（虽然它确实好看，`"hello" | ansi gradient` 能玩出真彩色渐变），而是它**承认了 shell 里 90% 的操作本质是数据处理**，然后把这件事做对了：

- 有类型 → 不再有"这列是数字还是字符串"的玄学
- 有结构 → 不再有空格/引号/分隔符地狱
- 有好的报错 → 不用靠搜索引擎猜自己错在哪

代价同样明确：**语法不兼容、生态还小、教程易过时**。它是个"要下决心学"的工具，不是"装上就能用"的工具。

但如果你每天有半小时在命令行里和 JSON、CSV、日志、文件列表搏斗，那这半小时值得投资。

**评分：8.7 / 10 —— 值得装，值得学，暂时别急着替掉 bash。**

---

## 参考

- 官方站点：<https://www.nushell.sh>
- 仓库：<https://github.com/nushell/nushell>（本次评测版本 0.116.1）
- 内置命令数：`help commands | length` → `533`
- 本地自查命令清单：`help commands | where name =~ "关键词"`
