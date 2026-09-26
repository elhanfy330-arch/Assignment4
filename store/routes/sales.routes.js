const {Router} = require("express")
let salesRouter = Router()
let database = require("../database/db")
const getDataBase = require("../database/db")

salesRouter.post("/addsale", async (req,res)=>{
    try{
        
        let database = await getDataBase()
        let {ProductID,QuantitySold,SaleDate} = req.body

        let query = `INSERT INTO Sales (ProductID,QuantitySold,SaleDate) VALUE(?,?,?)`
        let [result] = await database.execute(query,[ProductID,QuantitySold,SaleDate])

        res.status(201).json({
            message : "Sale Recorded Successfuly",
            result : result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : err.message
        })
    }

})

salesRouter.get("/getsale{/:productid}", async (req,res)=>{
    try{
        let {productid}= req.params
        
        let database = await getDataBase()

        if(productid){
            let query = `SELECT * FROM Sales WHERE 	ProductID=?`
            let [result] = await database.execute(query,[productid])

            if(!result.length){
                res.status(404).json({
                    message : "Sales Not Found",
            })
            }

            return res.status(200).json({
                message : "Sales Found ",
                result : result
            })
        }

        let query = `SELECT * FROM Sales `
        let [result] = await database.execute(query)
        if(!result.length){
                res.status(404).json({
                    message : "Sales Not Found",
            })
            }
        res.status(200).json({
            message : "Sales Found",
            result : result
        })
    
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : err.message
        })
    }
})





module.exports = {salesRouter}
