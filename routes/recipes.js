const express = require("express");
const router = express.Router();
const db = require("../database");

//Get all recipes
router.get("/recipes", async (req, res) => {
  try {
    db.query("SELECT * FROM recipes", function (err, result) {
      if (err) throw err;

      res.status(200).json({
        status: "success",
        results: result,
        data: {
          recipes: result,
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a recipe
router.get("/recipe/:recipe", async (req, res) => {
  try {
    db.query(
      "SELECT * FROM recipe WHERE recipe=?",
      [req.params.recipe],
      function (err, result) {
        if (err) throw err;

        res.status(200).json({
          status: "success",
          results: result,
          data: {
            recipes: result,
          },
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

//Store a recipe in the DB
router.post("/recipes/add-recipe", async (req, res) => {
  try {
    const recipe = db.query(`INSERT INTO recipes (recipe) VALUES (?)`, [
      req.body.recipe,
    ]);

    res.status(201).json({
      status: "success",
      results: recipe.rows,
      data: {
        recipe: recipe.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete a recipe from the DB
router.delete("/recipes/remove-recipe/:recipe", async (req, res) => {
  try {
    db.query("DELETE FROM recipes WHERE recipe=?", [req.params.recipe]);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
