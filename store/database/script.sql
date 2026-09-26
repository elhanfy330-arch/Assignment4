CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '123456'; 


-- 14--
GRANT SELECT, INSERT, UPDATE
ON market.*
TO 'store_manager'@'localhost';
-- 15--
REVOKE UPDATE
ON market.*
FROM 'store_manager'@'localhost';
-- 16--
GRANT DELETE
ON market.Sales
TO 'store_manager'@'localhost';