//express
const express = require("express")
const produto = express.Router()

//database
const database = require("../models/dbConnection")

//multer
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "views/uploads/produto")
    },
    filename: function(req, file, cb){
        const nomeImagem = file.originalname

        cb(null, nomeImagem)
    }
})
const upload = multer({storage: storage})

//fs
const fs = require("fs")

//pagina de cad
produto.get("/cadProd/:loginUser/:senhaUser", function(req, res){
    database.all(`select * from admin where loginUser = "${req.params.loginUser}" 
    and senhaUser = "${req.params.senhaUser}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin.length == 1){
           database.all(`select * from categoria`, function(erro, categoria){
            if(erro){   
                res.send(erro)
            }
            else{
               database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                res.render("cadProdutos", {admin, categoria, infoDelivery})
               })
            }
           })
        }
        else{
            res.redirect("/admin/delivery/entrar")
        }
    })
})

//cad produto
produto.post("/cad/:loginUser/:senhaUser", upload.single("imgProduto"), function(req, res){

    database.run(`insert into produto (nome, preco, desc, imagem, categoria)
    values("${req.body.nome}", "${req.body.preco}", "${req.body.desc}", 
    "${req.file.originalname}", "${req.body.categoria}")`, function(erro){
        if(erro){
            res.send(erro)
        }
        else{
            res.send("produto cadastrado")
        }
    })

})

//select * from produtos
produto.get("/allProdutos/:login/:senha", function(req, res){

    database.all(`select * from admin where loginUser = "${req.params.login}" 
    and senhaUser = "${req.params.senha}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin.length == 1){
           database.all(`select * from produto`, function(erro, produto){
            if(erro){   
                res.send(erro)
            }
            else{
                database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                    res.render("produtosAdmin", {admin, produto, infoDelivery})
                })
            }
           })
        }
        else{
            res.redirect("/admin/delivery/entrar")
        }
    })

})

//delete produto
produto.get("/del/:idProd/:login/:senha", function(req, res){
    database.all(`select * from produto where id = "${req.params.idProd}"`, function(erro, produto){
        if(erro){
            res.send(erro)
        }
        else if(produto.length == 1){
            database.all(`select * from admin  where loginUser = "${req.params.login}" 
            and senhaUser = "${req.params.senha}"`, function(erro, admin){
                if(erro){
                    res.send(erro)
                }
                else if(admin.length == 1){
                    fs.unlink(`views/uploads/produto/${produto[0].imagem}`, function(erro){
                        if(erro){
                            res.send(erro)
                        }
                        else{
                            database.run(`delete from produto where id = "${produto[0].id}"`, function(erro){
                                if(erro){
                                    res.send(erro)
                                }
                                else{
                                    res.redirect(`/allProdutos/${req.params.login}/${req.params.senha}`)
                                }
                            })
                        }
                    })
                }
                else{
                    res.redirect("/admin/delivery/entrar")
                }
            })
        }
        else{
            res.redirect("/admin/delivery/entrar")
        }
    })
})

module.exports = produto