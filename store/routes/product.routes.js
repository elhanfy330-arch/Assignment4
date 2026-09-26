const { Router } = require("express")
const productRouter = Router()
const getDataBase = require("../database/db")


//Q1 -
//1-

productRouter.post("/add" ,async (req,res)=>{
    try{
        let database = await getDataBase()
        let {ProductName,Price,StockQuantity,SupplierID} = req.body
        // let query = 

        let [result] = await database.execute(
            `INSERT INTO products (ProductName , Price , StockQuantity , SupplierID )
            VALUES(?,?,?,?)`,[ProductName,Price,StockQuantity,SupplierID])

        res.status(201).json({
            message : "Product Added Successfully",
            result : result
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            maessage : err.message , cause : err.cause
        })
    }
})

//2,3-
productRouter.get("/getproducts{/:id}" , async (req,res)=>{
    try{
        let database = await getDataBase()
    if(req.params.id){
        let query = `SELECT * FROM products WHERE ProductID =?`
        let [result] = await database.execute(query,[req.params.id])

        if(!result.length){
            return res.status(404).json({
                Message : "Product not found"
            })
        }

        res.status(200).json({
            message : result
        })
        return
    }

    let query = `SELECT * FROM products`
    let [result] = await database.execute(query)

    if(!result.length){
            res.status(404).json({
                message : "There is no products "
            })
            return
        }

    res.status(200).json({
        message : "Product Found",
            result : result
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
    
})
    }
})

// 4-
productRouter.put("/update/:ID", async (req,res)=>{
    try{
        let database = await getDataBase();
        let {ProductName,Price,StockQuantity,SupplierID} = req.body
        let query = `SELECT * FROM products WHERE ProductID = ?`
        let [oldProduct] = await database.execute(query,[req.params.ID])

        let product = oldProduct[0]
        if (!oldProduct.length) {
        return res.status(404).json({
            message: "Product not found"
        })
    }
        ProductName = ProductName ?? product.ProductName
        Price = Price ?? product.Price
        StockQuantity = StockQuantity ?? product.StockQuantity
        SupplierID = SupplierID ?? product.SupplierID

        let [result] = await database.execute(
        `UPDATE products SET ProductName =?,Price =?,StockQuantity =?,SupplierID =? WHERE ProductID =?`,
        [ProductName, Price, StockQuantity, SupplierID, req.params.ID]
    )

    res.status(200).json({
        message : "Product Updated Successfilly",
        result : result
    })
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: err.message
        })
    }
})

// 5-
productRouter.delete("/delete/:id",async (req,res)=>{
    try{
        let database = await getDataBase();
        let query = `DELETE FROM products WHERE ProductID =?`
        let [result] = await database.execute(query,[req.params.id])


        if(result.affectedRows == 0){
            return res.status(400).json({Message : "Product Not Found"})
        }


        res.status(200).json({
            message : "Product Deleted Successfully",
            result : result
        })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: err.message
        })
    }
})













module.exports = {
    productRouter
};