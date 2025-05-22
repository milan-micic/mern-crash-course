import express from "express"
import dotenv from "dotenv"
import path from "path"
import { connectDB } from "./config/db.js"
import productRoutes from "./routes/product.route.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json())  // dozvoljava prihvatanje json u req.body

app.use("/api/products", productRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, '/frontend/dist')))
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
	})
} else {
	console.log(process.env.NODE_ENV)
}

app.listen(PORT, () => {
  connectDB()
  console.log("Server started at http://localhost:" + PORT)
})