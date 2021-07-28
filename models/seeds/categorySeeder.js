require("dotenv").config()
const Category = require("../category")
const categories = require("../sampleData/categories")
const db = require("../../config/mongoose")

db.once("open", async () => {
  console.log("ON! running categorySeeder...")

  try {
    await Category.create(categories)
    console.log("DONE")
    return db.close()
  } catch (error) {
    throw new Error(error)
  }
})
