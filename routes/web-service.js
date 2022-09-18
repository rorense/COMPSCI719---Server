// Importing required modules
const express = require("express");
const pokemonDb = require("../modules/pokemon-db.js");

// Setup an express Router
const router = express.Router();

// TODO Add your route handlers here
// Task 1 Question 1
router.get("/services/pokemon", function (req, res){
    const submittedId = req.query.id;
    const pokemonId = pokemonDb.getPokemonById(parseInt(submittedId))
    res.json(pokemonId);
}) 

// Task 1 Question 2
router.get("/services/pokemon/types", function (req, res){
    const types = req.query.types;
    const typeData = pokemonDb.getTypeData(types);
    res.json(typeData);
}) 

// Task 1 Question 3
router.get("/services/pokemon/random", function (req, res){
    const max = pokemonDb.getNumPokemon();
    const randNumber = Math.floor(Math.random()*(max));
    const randPokemon = pokemonDb.getPokemonByArrayIndex(randNumber);
    res.json(randPokemon);
}) 

// Export the router so we can access it from other JS files using require()
module.exports = router;