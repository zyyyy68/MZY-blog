import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"
import { hash } from "bcryptjs"

const adapter = new PrismaLibSql({
  url: "file:./dev.db",
})
const prisma = new PrismaClient({ adapter })

async function main() {
  const password = await hash("admin123", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@blog.com" },
    update: {},
    create: {
      email: "admin@blog.com",
      password,
      name: "Admin",
    },
  })

  console.log("Admin user created:", admin.email)
  console.log("Default password: admin123")
  console.log("CHANGE THIS AFTER FIRST LOGIN!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
