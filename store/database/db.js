const mysql2 = require("mysql2/promise")
let getDataBase = async ()=>{
    let db
    if(db){
        console.log("connection Already Exists")
        return db
    }
        db = await mysql2.createPool({
            host : "localhost",
            port : 3306,
            user : "root",
            password : "",
            waitForConnections : true,
            connectionLimit : 10
        })
        await db.execute("CREATE DATABASE IF NOT EXISTS market")
        
        await db.end()

        db = mysql2.createPool(
        {
            host : "localhost",
            port : 3306,
            user : "root",
            database : "market",
            password : "",
            waitForConnections : true,
            connectionLimit : 10
        }
    )

    await db.execute(`CREATE TABLE IF NOT EXISTS  Suppliers (
        SupplierID INT PRIMARY KEY AUTO_INCREMENT,
        SupplierName VARCHAR(50),
        ContactNumber VARCHAR(20)
    )`) 

    await db.execute(`CREATE TABLE IF NOT EXISTS Products (
        ProductID INT PRIMARY KEY AUTO_INCREMENT,
        ProductName VARCHAR(50) NOT NULL,
        Price DECIMAL(10,2) NOT NULL,
        StockQuantity INT NOT NULL,
        SupplierID INT,
        FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
    )`)

    await db.execute(`
    CREATE TABLE IF NOT EXISTS Sales (
        SaleID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        QuantitySold INT NOT NULL,
        SaleDate DATE NOT NULL,
        FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
    )
`)

    return db 
} 

module.exports = getDataBase