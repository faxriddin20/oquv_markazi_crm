import express from "express"
import "./db/sequelize.js"
import { aRouter } from "./routers/admin.router.js"
import { acRouter } from "./routers/accountant.router.js"
import { stRouter } from "./routers/student.router.js"
import { tRouter } from "./routers/teacher.router.js"
const app = express()
const port = 3030

app.use(express.json())
app.use("/admin",aRouter)
app.use("/accountant",acRouter)
app.use("/student",stRouter)
app.use("/teacher",tRouter)
app.listen(port)