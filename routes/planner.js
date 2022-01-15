const express = require("express");
const router = express.Router();
const db = require("../database");
const multer = require("multer");

//Get all lists in the DB
router.get("/lists", async (req, res) => {
  try {
    db.query("SELECT * FROM lists", function (err, result) {
      if (err) throw err;

      res.status(200).json({
        status: "success",
        results: result,
        data: {
          lists: result,
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all todos from the DB
router.get("/planner", async (req, res) => {
  try {
    db.query("SELECT * FROM todos", function (err, result) {
      if (err) throw err;

      res.status(200).json({
        status: "success",
        results: result,
        data: {
          toDos: result,
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a List
router.post("/planner/add-list", async (req, res) => {
  try {
    const currentList = await db.query("SELECT list FROM lists");

    let uniqueList = true;
    for (let i = 0; i < currentList.length; i++) {
      if (currentList[i] === req.body.list) {
        uniqueList = false;
      }
    }

    if (uniqueList === true) {
      const list = await db.query(`INSERT INTO lists (list) VALUES (?)`, [
        req.body.list,
      ]);

      res.status(201).json({
        status: "success",
        results: list.rows,
        data: {
          list: list.rows,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//Create a todo
const upload = multer({ dest: "images/" });
router.post("/planner/add-toDo", upload.single("imgRef"), async (req, res) => {
  try {
    const todo = await db.query(
      "INSERT INTO todos (list, todo, dueDate, info, repo, book, recipe) values (?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.list,
        req.body.toDo,
        req.body.dueDate,
        req.body.info,
        // req.body.fileURL,
        req.body.repoURL,
        req.body.bookURL,
        req.body.recipeURL,
      ]
    );

    res.status(201).json({
      status: "success",
      results: todo.rows,
      data: {
        todo: todo.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Edit a todo
router.put("/planner/edit-toDo", async (req, res) => {
  try {
    const todo = await db.query(
      "UPDATE todos SET list=?, todo=?, dueDate=?, info=?, repo=?, book=?, recipe=? WHERE id=?",
      [
        req.body.list,
        req.body.toDo,
        req.body.dueDate,
        req.body.info,
        // req.body.fileURL,
        req.body.repoURL,
        req.body.bookURL,
        req.body.recipeURL,
        req.body.id,
      ]
    );

    res.status(201).json({
      status: "success",
      results: todo.rows,
      data: {
        todo: todo.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//delete a list and all it's todos
router.delete("/planner/delete-list/:list", async (req, res) => {
  try {
    db.query("DELETE FROM lists WHERE list=? ", [req.params.list]);

    db.query("DELETE FROM todos WHERE list=?", [req.params.list]);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete a todo
router.delete("/planner/delete-toDo/:id", async (req, res) => {
  try {
    db.query("DELETE FROM todos WHERE id = ?", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
