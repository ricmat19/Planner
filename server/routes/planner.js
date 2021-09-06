const express = require('express');
const router = express.Router();
const db = require("../database");
const multer = require('multer');

const upload = multer({dest: 'images/'});

router.get('/lists', async (req, res) => {
    try{
        const lists = await db.query("SELECT * FROM lists", function (err, result, fields) {
            if (err) throw err;

            res.status(200).json({
                status: "success",
                results: result,
                data:{
                    lists: result,
                }
            })
        });

    }catch(err){
        console.log(err);
    }
})

router.get('/planner', async (req, res) => {
    try{
        const toDos = await db.query("SELECT * FROM todos", function (err, result, fields) {
            if (err) throw err;

            res.status(200).json({
                status: "success",
                results: result,
                data:{
                    toDos: result,
                }
            })
        });

    }catch(err){
        console.log(err);
    }
})

router.post('/planner/add-list', async (req, res) => {
    try{

        const currentList = await db.query("SELECT list FROM lists");

        let uniqueList = true;
        for(let i=0; i< currentList.length; i++){
            if(currentList[i] === req.body.list){
                uniqueList = false;
            }
        }

        if(uniqueList === true){
            const list = await db.query(`INSERT INTO lists (list) VALUES (?)`, [req.body.list]);

            res.status(201).json({
                status: "success",
                results: list.rows,
                data:{
                    list: list.rows,
                }
            })
        }
    }catch(err){
        console.log(err);
    }
})

router.post('/planner/add-toDo', upload.single('imgRef'), async (req, res) => {
    try{

        // const currentToDos = await db.query("SELECT * FROM todos", function (err, result, fields) {
        //     if (err) throw err;

        //     console.log("Provided Postion: " + req.body.position)

        //     console.log("Result Length: " + result.length)
        //     for(let i=0; i < result.length; i++){
        //         if(result[i].position.toString() === req.body.position.toString()){
        //             console.log("Result Length: " + result.length)
        //             for(let j=i; j <= result.length; j++){
        //                 console.log("Position: "+ result[0].position)
        //                 // console.log(result[j].position.toString())
        //                 // console.log("Current Postion: " + result[j].position)
        //                 // let newPostion = result[j].position + 1
        //                 // console.log("New Postion: " + newPostion)
        //                 // const alteredToDos = async () =>  await db.query("UPDATE todos SET position=? WHERE position=?", 
        //                 // [newPostion, result[j].position]);
        //             }
        //         }
        //     }
        // });

        // const todo = await db.query("INSERT INTO todos (list, todo, dueDate, imgRef, info) values (?, ?, ?, ?, ?)", 
        // [req.body.list, req.body.toDo, req.body.dueDate, req.file.filename, req.body.info]);

        // const todo = await db.query("INSERT INTO todos (list, todo, dueDate, info, position) values (?, ?, ?, ?, ?)", 
        // [req.body.list, req.body.toDo, req.body.dueDate, req.body.info, req.body.position]);

        const todo = await db.query("INSERT INTO todos (list, todo, dueDate, info) values (?, ?, ?, ?)", 
        [req.body.list, req.body.toDo, req.body.dueDate, req.body.info]);

        res.status(201).json({
            status: "success",
            results: todo.rows,
            data:{
                todo: todo.rows,
            }
        })

    }catch(err){
        console.log(err);
    }
})

router.put('/planner/edit-toDo', async (req, res) => {
    try{
        // const todo = await db.query("INSERT INTO todos (list, todo, dueDate, imgRef, info) values ($1, $2, $3, $4, $5) RETURNING *", [req.body.list, req.body.todo, req.body.dueDate, req.body.imgRef, req.body.info]);

        // const todo = await db.query("UPDATE todos SET list=?, todo=?, dueDate=?, info=?, position=? WHERE id=?", 
        // [req.body.list, req.body.toDo, req.body.dueDate, req.body.info, req.body.position, req.body.id]);

        const todo = await db.query("UPDATE todos SET list=?, todo=?, dueDate=?, info=? WHERE id=?", 
        [req.body.list, req.body.toDo, req.body.dueDate, req.body.info, req.body.id]);

        res.status(201).json({
            status: "success",
            results: todo.rows,
            data:{
                todo: todo.rows,
            }
        })
    }catch(err){
        console.log(err);
    }
})

router.delete('/planner/delete-list/:list', async (req, res) => {
    try{
        const deleteList = await db.query("DELETE FROM lists WHERE list=? ", [req.params.list]);
        
        const deleteListItems = await db.query("DELETE FROM todos WHERE list=?", [req.params.list]);

        res.status(204).json({
            status: "success"
        })
    }catch(err){
        console.log(err);
    }
})

router.delete('/planner/delete-toDo/:id', async (req, res) => {
    try{
        const deleteItem = await db.query("DELETE FROM todos WHERE id = ?", [req.params.id]);
        res.status(204).json({
            status: "success"
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;