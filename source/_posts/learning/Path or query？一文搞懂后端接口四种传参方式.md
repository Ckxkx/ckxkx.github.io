---
categories:
  - 学习
title: Path or query？一文搞懂后端接口四种传参方式
date: 2026-11-14T08:04:53.839Z
index_img: /imgs/%E5%90%8E%E7%AB%AF%E6%8E%A5%E5%8F%A3%E5%9B%9B%E7%A7%8D%E5%8F%82%E6%95%B0%E6%96%B9%E5%BC%8F%E8%AF%A6%E8%A7%A3.png
---
## ⁠1 ⁠先记结论
### ⁠1.1 ⁠CRUD 常用传参方式

| 操作   | HTTP 方法     | 常用传参方式           | 示例                          |
| ---- | ----------- | ---------------- | --------------------------- |
| 新增   | POST        | **Body**         | `POST /users`               |
| 删除   | DELETE      | **Path / Query** | `DELETE /users/1`           |
| 修改   | PUT / PATCH | **Path + Body**  | `PUT /users/1`              |
| 查询列表 | GET         | **Query**        | `GET /users?page=1&size=10` |
| 查询详情 | GET         | **Path**         | `GET /users/1`              |
## ⁠2 ⁠四种传参方式的区别

**① Query（查询参数）**

参数放在 URL 的 `?` 后面，多个参数使用 `&` 连接。

```json
GET /users?page=1&size=10
DELETE /users?id=1
```

常用于分页、筛选、搜索，也可以用于删除。

**② Path（路径参数）**

参数直接放在 URL 路径中。

```json
GET /users/123
DELETE /users/123
```

通常用于根据 ID 查询、删除或修改指定资源。

**③ Body（请求体参数）**

参数放在请求体中，通常使用 JSON。

```json
POST /users
Content-Type: application/json

{
  "name": "张三",
  "age": 20
}
```

常用于新增和修改。

**④ Header（请求头参数）**

```json
Authorization: Bearer xxx
Content-Type: application/json
```

常用于传递 Token、认证信息、内容类型等。

## ⁠3 ⁠Java中对应的注解

**对应的注解如下：**

| 参数类型   | Spring Boot 注解   |
| ------ | ---------------- |
| Query  | `@RequestParam`  |
| Path   | `@PathVariable`  |
| Body   | `@RequestBody`   |
| Header | `@RequestHeader` |

例如：
```Java
// 新增：Body
@PostMapping("/users")
public void add(@RequestBody User user) {}

// 删除：Query
@DeleteMapping("/users")
public void delete(@RequestParam Long id) {}

// 查询详情：Path
@GetMapping("/users/{id}")
public User get(@PathVariable Long id) {}

// 查询列表：Query
@GetMapping("/users")
public List<User> list(@RequestParam Integer page) {
    return null;
}

// 修改：Path + Body
@PutMapping("/users/{id}")
public void update(
    @PathVariable Long id,
    @RequestBody User user
) {}
```


最简单的记忆方式：

- **新增 POST → Body**
- **删除 DELETE → Path（也可以 Query）**
- **修改 PUT/PATCH → Path + Body**
- **查询详情 GET → Path**
- **查询列表 GET → Query**