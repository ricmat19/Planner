const express = require('express');
const router = express.Router();
const db = require("../database");

router.get('/planner', async (req, res) => {
    try{
        const planner = await db.query("SELECT * FROM todos");
    
        res.status(200).json({
            status: "success",
            results: planner.rows,
            data:{
                planner: planner.rows,
            }
        })
    }catch(err){
        console.log(err);
    }
})

router.post('/planner/add-list', async (req, res) => {
    try{
        const list = await db.query("INSERT INTO lists (list) values ($1) RETURNING *", [req.body.list]);

        res.status(201).json({
            status: "success",
            results: list.rows,
            data:{
                list: list.rows,
            }
        })
    }catch(err){
        console.log(err);
    }
})

router.post('/planner/add-toDo', async (req, res) => {
    try{
        const todo = await db.query("INSERT INTO todos (list, todo, dueDate, imgRef, info) values ($1, $2, $3, $4, $5) RETURNING *", [req.body.list, req.body.todo, req.body.dueDate, req.body.imgRef, req.body.info]);

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

router.put('/todo/update-toDo', async (req, res) => {
    try{
        const todo = await db.query("INSERT INTO todos (list, todo, dueDate, imgRef, info) values ($1, $2, $3, $4, $5) RETURNING *", [req.body.list, req.body.todo, req.body.dueDate, req.body.imgRef, req.body.info]);

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

router.delete('/todo/delete-toDo', async (req, res) => {
    try{
        const todo = await db.query("INSERT INTO todos (list, todo, dueDate, imgRef, info) values ($1, $2, $3, $4, $5) RETURNING *", [req.body.list, req.body.todo, req.body.dueDate, req.body.imgRef, req.body.info]);

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

module.exports = router;