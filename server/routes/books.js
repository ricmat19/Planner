const express = require('express');
const router = express.Router();
const db = require("../database");

//Get all books
router.get('/books', async (req, res) => {
    try{
        const books = await db.query("SELECT * FROM books", function (err, result, fields) {
            if (err) throw err;

            res.status(200).json({
                status: "success",
                results: result,
                data:{
                    books: result,
                }
            })
        });

    }catch(err){
        console.log(err);
    }
})

//Store a book volume in the DB
router.post('/books/add-book', async (req, res) => {
    try{
        const book = await db.query(`INSERT INTO books (book) VALUES (?)`, [req.body.book]);

        res.status(201).json({
            status: "success",
            results: book.rows,
            data:{
                book: book.rows,
            }
        })

    }catch(err){
        console.log(err);
    }
})

//Delete a book volume from the DB
router.delete('/books/remove-book/:book', async (req, res) => {
    try{
        const removeBook = await db.query("DELETE FROM books WHERE book=? ", [req.params.book]);

        res.status(204).json({
            status: "success"
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;