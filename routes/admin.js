// Task 2 Question 1 & Task 2 Question 2

// Importing required modules
const express = require("express");
const pokemonDb = require("../modules/pokemon-db.js");
const multer = require("../modules/multer-uploader.js");
const upload = require("../modules/multer-uploader.js");
const fs = require("fs");
const makeArray = require("../modules/make-array.js");

// Setup an express Router
const adminRouter = express.Router();

// Task 2 Question 3
adminRouter.get("/admin", function (req, res){
    const context = pokemonDb.getAllPokemon();
    res.render("admin", context);
}) 

// Task 3 Question 1
adminRouter.get("/newPokemon", function (req, res){
    res.render("new-pokemon-form");
}) 

// Task 3 Question 2
adminRouter.post("/newPokemon", upload.single("imageFile"), function (req, res) {

    // Task 3 Question 3
    // Uploaded picture
    const fileInfo = req.file;
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/pokemon/${fileInfo.originalname}`;
    fs.renameSync(oldFileName, newFileName);

    // Task 3 Question 4
    const pokemon = {
        "id": parseInt(req.body.id),
        "name": req.body.name,
        "imageUrl": fileInfo.originalname,
        "types": makeArray(req.body.types),
        "description": req.body.description
    }

    // uses pokemonDb function to add pokemon to database
    pokemonDb.addPokemon(pokemon);

    // Task 3 Question 5
    res.redirect("./admin");
})

// Export the router so we cann access it from other JS files using require()
module.exports = adminRouter;