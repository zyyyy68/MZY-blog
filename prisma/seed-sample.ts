import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

const adapter = new PrismaMariaDb(process.env.DATABASE_URL ?? "")
const prisma = new PrismaClient({ adapter })

async function main() {
  const existing = await prisma.post.findUnique({ where: { slug: "hello-world" } })
  if (existing) {
    console.log("Sample post already exists")
    return
  }

  await prisma.post.create({
    data: {
      title: "你好，世界",
      slug: "hello-world",
      content: `# 第一篇文章

这是我的第一篇博客文章。

**欢迎大家！**

- 技术
- 生活
- 随笔

## 代码示例

\`\`\`python
print("Hello World")
\`\`\`
`,
      excerpt: "这是我的第一篇博客文章",
      published: true,
      tags: "生活,随笔",
    },
  })
  console.log("Sample post created successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
