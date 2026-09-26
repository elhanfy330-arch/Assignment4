const express = require("express")
const app = express();
app.use(express.json())
let port = 3000;

const {productRouter} = require("./routes/product.routes")
const {supplierRouter} = require("./routes/supplier.routes");
const {salesRouter} = require("./routes/sales.routes");
const {modifyRouter} = require("./routes/modeify.routes");
const {reportRouter} = require('./routes/reports.routes')

app.use("/product",productRouter) 
app.use("/supplier",supplierRouter)
app.use("/sale",salesRouter)
app.use("/modify",modifyRouter)
app.use("/report",reportRouter)


app.listen(port,()=>{
    console.log("server on port",port)
})




















// const express = require("express")
// const app = express()

// let port = 3000

// const mySql2 = require("mysql2/promise")

// app.use(express.json())

// let db

// let getDataBase = async () => {

//     if (db) {
//         console.log("DataBase Already Exsist")
//         return db
//     }

//     db = mySql2.createPool({
//         host: "localhost",
//         port: 3306,
//         user: "root",
//         password: "",
//         database: "mon",
//         waitForConnections: true,
//         connectionLimit: 10
//     })

//     return db
// }

// app.get("/:num", async (req, res) => {

//     let db = await getDataBase()

//     let [result] = await db.execute(
//         `SELECT 1 + ? AS RESULT`,
//         [req.params.num]
//     )

//     res.status(200).json({
//         Message: result
//     })
// })

// app.post("/signup", async (req, res) => {

//     try {

//         let database = await getDataBase()

//         let {
//             Firstname,
//             LastName,
//             U_email,
//             gender,
//             DOB,
//             password
//         } = req.body

//         let [result] = await database.execute(
//             `INSERT INTO first
//             (Firstname, LastName, U_email, password, gender, DOB)
//             VALUES (?, ?, ?, ?, ?, ?)`,
//             [Firstname, LastName, U_email, password, gender, DOB]
//         )

//         res.status(201).json({
//             message: result
//         })

//     } catch (err) {

//         console.log(err)

//         res.status(500).json({
//             message: err.message
//         })
//     }
// })

// app.post("/login" , async (req,res)=>{
//     try {

//         let database = await getDataBase()

//         let {
//             U_email,
//             password
//         } = req.body

//         let [result] = await database.execute(
//             `SELECT * FROM first WHERE U_email=? AND password=?`,[U_email,password])

//             if(!result.length){
//                 res.status(404).json({
//             message: "Email OR Password is Wrong"
//         })
//             }
//         res.status(201).json({
//             message: result
//         })

//     } catch (err) {

//         console.log(err)

//         res.status(500).json({
//             message: err.message
//         })
//     }
// })

// app.listen(port, () => {
//     console.log("server on port", port)
// })

