//express
const express = require("express")
const cidade = express.Router()

//database 
const database = require("../models/dbConnection")


//cad cidade tela
cidade.get("/cidades/:loginUser/:senhaUser", function(req, res){
    database.all(`select * from admin where 
    loginUser = "${req.params.loginUser}" and senhaUser = "${req.params.senhaUser}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin.length == 1){
            database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                if(erro){

                }
                else{
                    res.render("cadCidade", {admin, infoDelivery})
                }
            })
        }
        else{
            res.send("Oi, você não tem permissão para acessar.")
        }
    })
})

//cad cidade
cidade.post("/insertCidade/:loginUser/:senhaUser", function(req, res){
    database.all(`select * from admin where 
    loginUser = "${req.params.loginUser}" and senhaUser = "${req.params.senhaUser}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin.length == 1){
            database.run(`insert into cidades (cidade) values("${req.body.cidade}")`, function(erro){
                if(erro){
                    res.send(erro)
                }
                else{
                    res.redirect(`/allCidades/${req.params.loginUser}/${req.params.senhaUser}`)
                }
            })
        }
        else{
            res.send("Oi, você não tem permissão para acessar.")
        }
    })
})

//ver cidades cadastradas
cidade.get("/allCidades/:loginUser/:senhaUser", function(req, res){
    database.all(`select * from admin where 
    loginUser = "${req.params.loginUser}" and senhaUser = "${req.params.senhaUser}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin.length == 1){
            database.all(`select * from cidades`, function(erro, cidades){
                if(erro){
                    res.send(erro)
                }
                else if(cidades.length >= 0){
                    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                        if(erro){
                            res.send(erro)
                        }
                        else{
                            res.render("allCidades", {admin, cidades, infoDelivery})
                        }
                    })
                }
                else{
                    res.redirect(`/menu/${req.params.loginUser}/${req.params.senhaUser}`)
                }
            })
        }
        else{
            res.redirect(`/menu/${req.params.loginUser}/${req.params.senhaUser}`)
        }
    })
})

//deletar cidade cadastrada
cidade.get("/del/cidadeId/:idCidade/:loginUser/:senhaUser", function(req, res){
    database.all(`select * from admin where 
    loginUser = "${req.params.loginUser}" and senhaUser = "${req.params.senhaUser}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin.length == 1){
            database.run(`delete from cidades where id = "${req.params.idCidade}"`, function(erro){
                if(erro){
                    res.send(erro)
                }
                else{
                    res.redirect(`/allCidades/${req.params.loginUser}/${req.params.senhaUser}`)
                }
            })
        }
        else{
            res.redirect(`/menu/${req.params.loginUser}/${req.params.senhaUser}`)
        }
    })
})

module.exports = cidade