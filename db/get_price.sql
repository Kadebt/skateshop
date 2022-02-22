SELECT * FROM PRODUCTS 
WHERE price > $1
AND price < $2
and category = $3;