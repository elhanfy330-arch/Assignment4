const {Router} = require("express")
const supplierRouter = Router();
let getDataBase = require("../database/db");

supplierRouter.post("/add" ,async (req,res)=>{
    try{
        let database = await getDataBase()
        let {ContactNumber,SupplierName} = req.body


        if(!SupplierName || !ContactNumber){
            return res.status(400).json({
                maessage : "SupplierName and ContactNumber are required"
            })
        }

        let query = `INSERT INTO suppliers (SupplierName , ContactNumber ) VALUES(?,?)`

        let [result] = await database.execute(query,[SupplierName,ContactNumber])

        res.status(201).json({
            message : "Supplier Added Succefully",
            result : result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            maessage : err.maessage
        })
    }
})

supplierRouter.get("/get", async (req,res)=>{
    try{

        let database = await getDataBase()

        let query = `SELECT * FROM Suppliers`
        let [result] = await database.execute(query)
        if(result.length==0){
            return res.status(404).json({
            message : "Suppliers Not Found",
        })
        }
        res.status(200).json({
            message : "Suppliers Found",
            result : result
        })




    }catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
})


supplierRouter.put("/update/:ID",async (req,res)=>{


    try{
        let database = await getDataBase();
        let {SupplierName,ContactNumber} = req.body
        let {ID} = req.params
        let query = `SELECT * FROM Suppliers WHERE SupplierID = ?`
        let [oldSupplier] = await database.execute(query,[ID])

        let supplier = oldSupplier[0]
        if (!oldSupplier.length) {
        return res.status(404).json({
            message: "Suppliers not found"
        })
    }
        SupplierName = SupplierName ?? supplier.SupplierName
        ContactNumber = ContactNumber ?? supplier.ContactNumber

        let [result] = await database.execute(
        `UPDATE Suppliers SET SupplierName =?,ContactNumber =? WHERE SupplierID = ? `,
        [SupplierName, ContactNumber, ID]
    )

    res.status(200).json({
        message : "Supplier Updated Successfilly",
        result : result
    })
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: err.message
        })
    }
    
})

supplierRouter.delete("/delete/:id" , async (req,res)=>{
    try{
        let database = await getDataBase();
    let {id} = req.params
    let query = `DELETE FROM suppliers WHERE SupplierID = ? `
    let result = await database.execute(query,[id])
    res.status(200).json({
        message : "Supplier Deleted Successfully"
    })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }

})






module.exports = {supplierRouter};