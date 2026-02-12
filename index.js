import dotenv from "dotenv";
dotenv.config();
import express from "express"
import connectDB from "./src/config/db.js"
import userRouter from "./src/routes/user.routes.js";
import authRouter from "./src/routes/auth.routes.js";

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ "status": "ok" })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

connectDB()

app.listen(process.env.PORT, () => 
    {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })















// Direct approach
/*
;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB-URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Error: ", error);
            throw error  
        })
        app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
        })
    } catch (error) {
        console.error('ERROR: ', error)
        throw err
    }
})()
*/

