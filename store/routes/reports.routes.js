const {Router} = require("express")
let reportRouter = Router()
let database = require("../database/db")
const getDataBase = require("../database/db")
//Update Bread Price
reportRouter.put("/updatebread", async (req, res) => {
    try {
        let database = await getDataBase()

        let query = `UPDATE Products SET Price = ? WHERE ProductName = ?`

        let [result] = await database.execute(query, [25.00,"Bread"])
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Bread Not Found"
            })
        }

        res.status(200).json({
            message: "Bread Price Updated Successfully"
        })
        return

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
})


//Delete the Eggs

reportRouter.delete("/deleteeggs", async (req, res) => {
    try {
        let database = await getDataBase()

        let query = `DELETE FROM Products WHERE ProductName = ?`
        let [result] = await database.execute(query, ["Eggs"])
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Eggs Not Found"
            })
        }

        res.status(200).json({
            message: "Eggs Deleted Successfully"
        })
        return

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
})


//Total Sold
reportRouter.get("/totalsales", async (req, res) => {
    try {
        let database = await getDataBase()

        let query = `SELECT ProductID, SUM(QuantitySold) AS TotalQuantitySold FROM Sales GROUP BY ProductID`

        let [result] = await database.execute(query)
        return res.status(200).json({
            message: "Total Quantity Sold Found",
            result: result
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
})


// the highest stock quantity.
reportRouter.get("/higheststock", async (req, res) => {
    try {
        let database = await getDataBase()

        let query = ` SELECT * FROM Products ORDER BY StockQuantity DESC LIMIT 1`

        let [result] = await database.execute(query)
        if (result.length === 0) {
            return res.status(404).json({
                message: "No Products Found"
            })
        }

        return res.status(200).json({
            message: "Product Found",
            result: result
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
})


//suppliers whose names start with 'F'

reportRouter.get("/suppliers_f", async (req, res) => {
    try {
        let database = await getDataBase()

        let query = `
            SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%' `

        let [result] = await database.execute(query)
        if (result.length === 0) {
            return res.status(404).json({
                message: "No Suppliers Found"
            })
        }

        return res.status(200).json({
            message: "Suppliers Found",
            result: result
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
})


//products that have never been sold

reportRouter.get("/neversold", async (req, res) => {
    try {
        let database = await getDataBase()

        let query = ` SELECT * FROM Products WHERE ProductID NOT IN ( SELECT ProductID FROM Sales ) `

        let [result] = await database.execute(query)
        if (result.length === 0) {
            return res.status(404).json({
                message: "All Products Have Been Sold"
            })
        }

        return res.status(200).json({
            message: "Products That Have Never Been Sold",
            result: result
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
})



reportRouter.get("/joined_sales", async (req, res) => {
    try {
        let database = await getDataBase()

        let query = `SELECT
            Products.ProductName,
            Sales.QuantitySold,
            Sales.SaleDate 
            FROM Sales JOIN Products ON Sales.ProductID = Products.ProductID `

        let [result] = await database.execute(query)
        if (result.length === 0) {
            return res.status(404).json({
                message: "No Sales Found"
            })
        }

        return res.status(200).json({
            message: "Sales Found",
            result: result
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
})
module.exports = {reportRouter}