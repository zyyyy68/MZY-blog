# MZY Blog

基于 Next.js 16 全栈的个人博客系统，支持文章展示、评论系统和后台管理。

## 技术栈

| 项目 | 选择 |
|------|------|
| 框架 | Next.js 16 (App Router + Turbopack) |
| 数据库 | MySQL 8.0 (Docker) |
| ORM | Prisma 7 |
| 样式 | Tailwind CSS v4 + shadcn/ui |
| 认证 | NextAuth.js v4 (Credentials + JWT) |
| Markdown | react-markdown + remark-gfm + rehype-highlight |
| 主题 | next-themes (亮色/暗色) |

## 快速开始

### 前置要求

- Node.js >= 20
- Docker

### 启动开发环境

```bash
# 启动 MySQL 容器
docker compose up -d

# 安装依赖
npm install

# 初始化数据库
npx prisma migrate dev --name init

# 创建管理员账号
npx prisma db seed

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### 管理员登录

访问 `/admin/login`，使用种子账号登录：

- 邮箱：`210701544@qq.com`
- 密码：`Mzy0368.`

## 功能

- **前台**：文章列表、文章详情（Markdown 渲染）、标签筛选、评论、关于页
- **后台**：仪表盘、文章 CRUD（Markdown 编辑器）、评论审核、账号设置、密码管理

## 项目结构

```
my-blog/
├── docker-compose.yml        # MySQL 8.0 容器
├── prisma/                   # 数据库模型 & 迁移
├── src/
│   ├── app/                  # Next.js App Router (页面 & API)
│   │   ├── admin/            # 后台管理页面
│   │   ├── posts/            # 文章详情
│   │   ├── tags/             # 标签筛选
│   │   └── api/              # RESTful API
│   ├── components/           # 组件 (shadcn/ui + 自定义)
│   ├── lib/                  # 工具库 (Prisma, NextAuth)
│   └── generated/prisma/     # Prisma 生成代码
└── next.config.ts            # Next.js 配置
```

## API

| 路径 | 方法 | 说明 |
|------|------|------|
| `/api/posts` | GET | 公开文章列表 |
| `/api/posts/[slug]` | GET | 文章详情 |
| `/api/posts/[slug]/comments` | GET/POST | 评论 |
| `/api/admin/posts` | GET/POST | 管理文章 |
| `/api/admin/comments` | GET | 管理评论 |
| `/api/admin/stats` | GET | 仪表盘统计 |
