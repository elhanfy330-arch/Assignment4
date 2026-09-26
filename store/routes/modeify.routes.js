// 5--

const {Router} = require("express")
let modifyRouter = Router()
let getDataBase = require("../database/db")

modifyRouter.post("/add_category",async (req,res)=>{ //ADD Category Column
    try{
        let database = await getDataBase();
        let query = `ALTER TABLE Products ADD COLUMN Category VARCHAR(50)`
        let result= await database.execute(query)
        res.status(200).json({
            message : "Column Added Successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : err.message
        })
    }
})



modifyRouter.delete("/delete_category",async (req,res)=>{ //delete Category Column
    try{
        let database = await getDataBase();
        let query = `ALTER TABLE Products DROP COLUMN Category `
        let result= await database.execute(query)
        res.status(200).json({
            message : "Column deleted Successfully",
            result : result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : err.message
        })
    }
})

modifyRouter.put("/Change_num",async (req,res)=>{ //Change ConcatNUmber Column
    try{
        let database = await getDataBase();
        let query = `ALTER TABLE supplier MODIFY COLUMN ContactNumber varchar(15) `
        let result= await database.execute(query)
        res.status(200).json({
            message : "Column Changeed Successfully",
            result : result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : err.message
        })
    }
})

modifyRouter.put("/add_notnull",async (req,res)=>{ //Add Not null 
    try{
        let database = await getDataBase();
        let query = `ALTER TABLE Products MODIFY COLUMN ProductName VARCHAR(50) NOT NULL `
        let result= await database.execute(query)
        res.status(200).json({
            message : "NOT NULL adedd Successfully",
            result : result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : err.message
        })
    }
})





module.exports = {modifyRouter}