import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"
import { hash } from "bcryptjs"

const adapter = new PrismaLibSql({
  url: "file:./dev.db",
})
const prisma = new PrismaClient({ adapter })

async function main() {
  const password = await hash("Mzy0368.", 12)

  const admin = await prisma.user.upsert({
    where: { email: "210701544@qq.com" },
    update: {},
    create: {
      email: "210701544@qq.com",
      password,
      name: "Mzyyyy",
    },
  })

  console.log("Admin user created:", admin.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
