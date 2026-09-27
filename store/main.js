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



















