import { Avatar } from "@/components/avatar"

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <Avatar />
        <h1 className="text-3xl font-bold mt-6">关于本站</h1>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <p>
          这是一个个人博客，记录技术学习、生活感悟和一些零碎的思考。
        </p>

        <h2>关于我</h2>
        <p>
          我叫马振宇，22 岁，坐标河北廊坊，前运维工程师。喜欢折腾各种技术，相信工具可以改变效率。
        </p>

        <h2>技术栈</h2>
        <p>
          本站基于 Next.js 全栈构建，使用 Prisma + SQLite 做数据持久化，
          Tailwind CSS 做样式，全部代码由 Claude Code + DeepSeek 协助完成。
        </p>

        <h2>联系方式</h2>
        <ul>
          <li>GitHub: <a href="https://github.com/zyyyy68" target="_blank" rel="noopener noreferrer">@zyyyy68</a></li>
          <li>Email: <a href="mailto:210701544@qq.com">210701544@qq.com</a></li>
          <li>微信: Mzyyyy68</li>
        </ul>
      </div>
    </div>
  )
}
