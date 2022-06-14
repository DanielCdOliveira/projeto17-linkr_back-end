import express,{json} from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./src/routers/index.js"


const app = express()
dotenv.config()

app.use(cors())
app.use(json())
app.use(router)

const port = process.env.PORT
app.listen(port,() => {console.log(`listening on port ${port}`)})







