//express
const express = require("express")
const routes = express.Router()


//database 
const database = require("../models/dbConnection")


routes.get("/", function(req, res){
    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
        res.render("index", {infoDelivery})
    })
})

routes.get("/categorias", function(req, res){
    database.all(`select * from categoria`, function(erro, categoria){
        database.all(`select * from infoDelivery`, function(erro, infoDelivery){
            res.render("categorias", {categoria, infoDelivery})
        })
    })
})

routes.get("/produtos/:categoria/:pag",function(req, res){
    database.all(`select * from produto 
    where categoria = "${req.params.categoria}" LIMIT 5 OFFSET ${req.params.pag * 5}`, function(erro, produto){
        if(erro){
            console.log(erro)
        }
        else{
            let pagAtual = req.params.pag
            let categoria = req.params.categoria
            let proximaPagina = ((parseInt(req.params.pag)) + 1)
            let anteriorPagina

            if(req.params.pag == 0){
                anteriorPagina = 0
            }
            else{
                anteriorPagina = req.params.pag - 1
            }

            database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                res.render("produtos", {produto, infoDelivery, proximaPagina, anteriorPagina, categoria, pagAtual})
            })
        }
    })
})

routes.get("/det_produto/:idProduto/:pag", function(req, res){
    database.all(`select * from produto where id = "${req.params.idProduto}"`, function(erro, produto){
        if(erro){
            console.log(erro)
        }
        else{
            database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                let pagAtual = req.params.pag
                res.render("det_produto", {produto, infoDelivery, pagAtual})
            })
        }
    })
})

routes.get("/login", function(req, res){
    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                res.render("login", {infoDelivery})
    })
})

routes.get("/criarConta", function(req, res){
    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                res.render("criarConta", {infoDelivery})
    })
})

routes.get("/info", function(req, res){
    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                res.render("info", {infoDelivery})
    })
})

routes.get("/loginAdmin", function(req, res){
    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                res.render("loginAdmin", {infoDelivery})
    })
})

routes.get("/recCoutn", function(req, res){
    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
        res.render("recConta", {infoDelivery})
})
})
//paginação produtos

module.exports = routes