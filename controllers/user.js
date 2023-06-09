//express
const express = require("express")
const user = express.Router()

//databse
const database = require("../models/dbConnection")

//insert user 
user.post("/Insert/User", function(req, res){
    const {nome, email, senha, telefone, senhaConfirmar} = req.body


    database.all(`select token from user where email = "${email}"`, function(erro, user){
        if(erro){
            res.send(erro)
        }
        else if(user.length == 0){
            if(senha == senhaConfirmar){
                database.run(`insert into user (nome, email, pass, telefone, token) 
                values("${nome}", "${email}", "${senha}", "${telefone}", "${Math.random()}")`, function(erro){
                    if(erro){
                        console.log("erro ao criar user: " + erro)
                    }
                    else{
                        res.redirect("/login")
                    }
                })
            }
        }
        else{
            res.send("Email já cadastrado.")
        }
    })
})

//select user perfil
user.get("/minhaConta/:token", function(req, res){
    
    database.all(`select * from user where token = "${req.params.token}"`, function(erro, user){
        if(erro){
            console.log(erro)
        }
        else{
            database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                res.render("minhaConta", {user, infoDelivery})
            })
        }
    })
})

//login user
user.post("/Logar/conta", function(req, res){
    const {email, senha} = req.body

    database.all(`select * from user where email = "${email}" and pass = "${senha}"`, function(erro, user){
        if(erro){
            console.log("erro ao fazer login: " + erro)
        }
        else if(user.length == 1){
            res.redirect(`/${user[0].token}`)
        }
        else{
            res.send("Email ou senha incorretos")
        }
    })
})

//att user
user.post("/att/User/:token", function(req, res){

    const {nome, telefone, email, senha, senhaConfirmar} = req.body

    if(senha == senhaConfirmar){
        database.run(`update user set 
             nome = "${nome}", telefone = "${telefone}", email = "${email}", senha = "${senha}"
             where token = "${req.params.token}"`, function(erro){
        if(erro){
            console.log(erro)
        }
        else{
            res.redirect(`/minhaconta/${req.params.token}`)
        }
    })
    }

})

//index User
user.get("/:token", function(req, res){
    database.all(`select * from user where token = "${req.params.token}"`, function(erro, user){
        if(erro){
            console.log(erro)
        }
        else{
            database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                if(erro){
                    console.log(erro)
                }
                else{
                    res.render("indexUser", {user, infoDelivery})
                }
            })
        }
    })
})

//categoria user
user.get("/categorias/:token", function(req, res){

    database.all(`select * from user where token = "${req.params.token}"`, function(erro, user){
        if(erro){
            console.log(erro)
        }
        else{
            database.all(`select * from categoria`, function(erro, categoria){
                if(erro){
                    console.log(erro)
                }
                else{
                    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                        res.render("categorias_user", {user, categoria, infoDelivery})
                    })
                }
            })
        }
    })
})

//produtos user
user.get("/produtos/:categoriaproduto/:token/:pag", function(req, res){
    database.all(`select * from user where token = "${req.params.token}"`, function(erro, user){
        if(erro){
            console.log(erro)
        }
        else{
            database.all(`select * from produto
            where categoria = "${req.params.categoriaproduto}" limit 5 offset ${req.params.pag * 5}`, function(erro, produto){
                if(erro){
                    console.log(erro)
                }
                else{

                    let pagAtual = req.params.pag
                    let categoria = req.params.categoriaproduto
                    let proximaPagina = ((parseInt(req.params.pag)) + 1)
                    let anteriorPagina
                    let letTokenUser = req.params.token

                    if(req.params.pag == 0){
                        anteriorPagina = 0
                    }
                    else{
                        anteriorPagina = req.params.pag - 1
                    }

                    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                        res.render("produtoUser", {user, produto, infoDelivery, pagAtual, letTokenUser, categoria, proximaPagina, anteriorPagina})
                    })
                }
            })
        }
    })
})

//info user
user.get("/info/:token", function(req, res){
    database.all(`select * from user where token = "${req.params.token}"`, function(erro, user){
        if(erro){
            console.log(erro)
        }
        else{
            database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                res.render("infoUser", {user, infoDelivery})
            })
        }
    })
})

//det_produto
user.get("/det_produto/:token/:idProduto/:pag", function(req, res){
    database.all(`select * from user where token = "${req.params.token}"`, function(erro, user){
        if(erro){
            console.log(erro)
        }
        else{
            
            database.all(`select * from produto where id = "${req.params.idProduto}"`, function(erro, produto){
                if(erro){
                    console.log(erro)
                }
                else{
                    let letTokenUser = req.params.token
                    let pagAtual = req.params.pag
                    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                        res.render("det_produtoUser", {user, produto, infoDelivery, pagAtual, letTokenUser})
                    })
                }
            })
        }
    })
})

//meus pedidos
user.get("/Meus/:tokenUser", function(req, res){
    database.all(`select * from pedido where token_user = "${req.params.tokenUser}" order by token_pedido desc`, function(erro, pedido){
        if(erro){
            console.log(pedido)
        }
        else{
            database.all(`select * from user where token = "${req.params.tokenUser}"`, function(erro, user){
                if(erro){
                        console.log(erro)
                }
                else{

                    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                        res.render("meusPedidos", {pedido, user, infoDelivery})
                    })
                    
                }
            })
            
        }
    })
})
module.exports = user