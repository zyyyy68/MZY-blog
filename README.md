# MZY Blog

基于 Next.js 16 全栈的个人博客系统，支持文章展示、Markdown 编辑、评论系统和后台管理。

## 技术栈

| 项目 | 选择 |
|------|------|
| 框架 | Next.js 16 (App Router + Turbopack) |
| 数据库 | MySQL 8.0 (Docker) |
| ORM | Prisma 7 |
| 样式 | Tailwind CSS v4 + shadcn/ui |
| 认证 | NextAuth.js v4 (Credentials + JWT) |
| Markdown 渲染 | react-markdown + remark-gfm + rehype-highlight |
| Markdown 编辑 | 自定义编辑器（实时预览） |
| 主题 | CSS 变量（固定亮色） |
| 图标 | lucide-react |

## 快速开始

### 前置要求

- Node.js >= 20
- Docker
- npm

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/zyyyy68/MZY-blog.git
cd MZY-blog

# 启动 MySQL 容器
docker compose up -d

# 安装依赖
npm install

# 初始化数据库
npx prisma migrate dev --name init

# 创建管理员账号和示例数据
npx prisma db seed

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### 管理员登录

访问 `/admin/login`，使用种子账号登录：

| 账号 | 值 |
|------|------|
| 邮箱 | `210701544@qq.com` |
| 密码 | `Mzy0368.` |

首次登录后建议修改密码（后台 → 账号设置 → 修改密码）。

### 环境变量

项目使用 `.env` 文件配置，内容如下：

```env
DATABASE_URL="mysql://myblog:myblog123@localhost:3306/myblog"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `DATABASE_URL` | MySQL 连接字符串 | `mysql://myblog:myblog123@localhost:3306/myblog` |
| `NEXTAUTH_URL` | 部署地址 | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | JWT 加密密钥 | 自动生成 |

## 功能详情

### 前台

| 功能 | 说明 |
|------|------|
| **文章列表** | 首页卡片网格展示，按发布时间倒序 |
| **文章详情** | Markdown 渲染，语法高亮，支持 GFM 扩展表格/任务列表 |
| **标签筛选** | `/tags/[tag]` 按标签过滤文章 |
| **评论系统** | 支持嵌套回复，含链接需审核，无链接直接提交但默认隐藏 |
| **关于页** | 固定内容展示 |

### 后台

| 功能 | 说明 |
|------|------|
| **仪表盘** | 文章数、评论数、未审核评论数概览 |
| **文章管理** | 列表查看、新建、编辑、删除文章 |
| **Markdown 编辑器** | 左侧编辑、右侧实时预览 |
| **评论管理** | 审核通过、删除评论 |
| **账号设置** | 修改昵称、邮箱 |
| **修改密码** | 旧密码验证后设置新密码 |
| **忘记密码** | 邮箱验证（需配置邮件服务） |

## API

### 公开 API

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/posts` | 文章列表 | `?published=true` |
| GET | `/api/posts/[slug]` | 文章详情 | — |
| GET | `/api/posts/[slug]/comments` | 评论列表 | `?approved=true` |
| POST | `/api/posts/[slug]/comments` | 提交评论 | `{ author, email?, content, parentId? }` |

### 管理 API（需登录）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/posts` | 获取所有文章（含草稿） |
| POST | `/api/admin/posts` | 创建文章 |
| PUT | `/api/admin/posts/[id]` | 更新文章 |
| DELETE | `/api/admin/posts/[id]` | 删除文章 |
| GET | `/api/admin/comments` | 获取所有评论 |
| DELETE | `/api/admin/comments/[id]` | 删除评论 |
| GET | `/api/admin/stats` | 仪表盘统计数据 |

## 数据模型

```prisma
model User {
  id              Int       @id @default(autoincrement())
  email           String    @unique
  password        String              // bcrypt 加密
  name            String
  resetToken      String?             // 忘记密码令牌
  resetTokenExpiry DateTime?          // 令牌过期时间
  createdAt       DateTime  @default(now())
}

model Post {
  id         Int       @id @default(autoincrement())
  title      String
  slug       String    @unique        // URL 标识
  content    String    @db.Text       // Markdown 内容
  excerpt    String    @db.Text       // 摘要
  coverImage String?                  // 封面图 URL
  published  Boolean   @default(false)
  tags       String    @default("")   // 逗号分隔
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
  comments   Comment[]
}

model Comment {
  id        Int       @id @default(autoincrement())
  postId    Int
  post      Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  author    String
  email     String?
  content   String    @db.Text
  approved  Boolean   @default(false) // 审核状态
  parentId  Int?                      // 父评论 ID（嵌套回复）
  parent    Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies   Comment[] @relation("CommentReplies")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

## 项目结构

```
my-blog/
├── docker-compose.yml              # MySQL 8.0 容器定义
├── prisma/
│   ├── schema.prisma              # 数据模型定义
│   ├── seed.ts                    # 管理员种子脚本
│   ├── seed-sample.ts             # 示例文章种子脚本
│   └── migrations/                # 数据库迁移历史
├── prisma.config.ts               # Prisma 7 配置
├── src/
│   ├── app/
│   │   ├── layout.tsx             # 根布局（SessionProvider）
│   │   ├── page.tsx               # 首页（文章卡片网格）
│   │   ├── globals.css            # 全局样式 & 主题变量
│   │   ├── posts/[slug]/          # 文章详情页
│   │   ├── tags/[tag]/            # 标签筛选页
│   │   ├── tags/page.tsx          # 所有标签页
│   │   ├── about/                 # 关于页
│   │   ├── admin/                 # 后台管理页面
│   │   │   ├── layout.tsx         # 后台布局（侧边栏）
│   │   │   ├── login/             # 登录页
│   │   │   ├── page.tsx           # 仪表盘
│   │   │   ├── posts/             # 文章管理（列表/新建/编辑）
│   │   │   ├── comments/          # 评论管理
│   │   │   ├── settings/          # 账号设置
│   │   │   ├── forgot-password/   # 忘记密码
│   │   │   └── reset-password/    # 重置密码
│   │   └── api/                   # API 路由
│   │       ├── auth/[...nextauth] # NextAuth 认证处理
│   │       ├── posts/             # 公开 API
│   │       └── admin/             # 管理 API
│   ├── components/
│   │   ├── ui/                    # shadcn/ui 基础组件
│   │   ├── navbar.tsx             # 导航栏
│   │   ├── post-card.tsx          # 文章卡片
│   │   ├── sidebar.tsx            # 文章侧边栏
│   │   ├── comment-section.tsx    # 评论区
│   │   ├── markdown-editor.tsx    # Markdown 编辑器（实时预览）
│   │   ├── admin-sidebar.tsx      # 后台侧边栏
│   │   ├── avatar.tsx             # 头像
│   │   ├── home-tabs.tsx          # 首页标签切换
│   │   └── session-provider.tsx   # Session Provider
│   ├── lib/
│   │   ├── prisma.ts              # Prisma Client 单例
│   │   ├── auth.ts                # NextAuth 配置
│   │   └── utils.ts               # 工具函数
│   ├── generated/prisma/          # Prisma 生成代码
│   └── types/
│       └── next-auth.d.ts         # NextAuth 类型扩展
├── components.json                # shadcn/ui 配置
└── next.config.ts                 # Next.js 配置
```

## Docker

项目使用 Docker 管理 MySQL 数据库：

```yaml
# docker-compose.yml
services:
  mysql:
    image: mysql:8.0
    container_name: myblog-mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: myblog
      MYSQL_USER: myblog
      MYSQL_PASSWORD: myblog123
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
```

常用命令：

```bash
docker compose up -d     # 启动 MySQL
docker compose down      # 停止 MySQL
docker compose logs      # 查看日志
```

## 数据库迁移

```bash
# 创建新的迁移（修改 schema 后）
npx prisma migrate dev --name migration_name

# 重置数据库（清空数据）
npx prisma migrate reset

# 重新生成 Prisma Client
npx prisma generate

# 填充种子数据
npx prisma db seed
```

## 部署

### 生产构建

```bash
npm run build
npm start
```

### 部署建议

- **VPS + PM2**：`pm2 start npm --name "my-blog" -- start`
- **Docker 化**：将 Next.js 和 MySQL 都容器化
- **Nginx 反向代理**：配置 SSL 和域名绑定

## 后续可扩展

- RSS 订阅
- 站内全文搜索
- 图片上传/图床集成
- 文章阅读量统计
- 邮件通知（新评论提醒）
- 第三方登录（GitHub OAuth）
- 标签管理页面
- 全屏封面图支持
