//express
const express = require("express")
const fechado = express.Router()

//database
const database = require("../models/dbConnection")

fechado.get("/fechado/:token", function(req, res){
    console.log(req.params.token)
    database.all(`select * from user where token = "${req.params.token}"`, function(erro, user){
        if(erro){
            res.send(erro)
        }
        else if(user.length == 1){
            res.render("fechados", {user})
        }
    })
})

module.exports = fechado