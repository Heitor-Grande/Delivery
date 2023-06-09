//express
const express = require("express")
const categoria = express.Router()

//database
const database = require("../models/dbConnection")

//multer
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "views/uploads/categoria")
    },
    filename: function(req, file, cb){
        const nomeImagem = file.originalname
        
        cb(null, nomeImagem)
    }
})
const upload = multer({storage: storage})


//fs
const fs = require("fs")


//tela cadastrar categoria
categoria.get("/cad/categoria/:loginUser/:senhaUser", function(req, res){
    database.all(`select * from admin where loginUser = "${req.params.loginUser}" 
    and senhaUser = "${req.params.senhaUser}"`, function(erro, admin){
        if(erro){
            console.log(erro)
        }
        else if(admin.length == 1){
            database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                res.render("cadCategoria", {admin, infoDelivery})
            })
        }
        else{
            res.redirect("/admin/delivery/entrar")
        }
    })
})

//post categoria
categoria.post("/cad/categoria/:loginUser/:senhaUser", upload.single("imgCategoria"), function(req, res){


    database.all(`select * from admin where loginUser = "${req.params.loginUser}"
    and senhaUser = "${req.params.senhaUser}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin.length == 1){
            database.run(`insert into categoria (categoria, imagem) values("${req.body.nome}", 
            "${req.file.originalname}")`, function(erro){
                if(erro){
                    res.send(erro)
                }
                else{
                    res.redirect(`/ver/categoria/${req.params.loginUser}/${req.params.senhaUser}`)
                }
            })
        }
        else{
            res.redirect("/admin/delivery/entrar")
        }
    })

})

//select categoria
categoria.get("/ver/categoria/:loginUser/:senhaUser", function(req, res){

    database.all(`select * from admin where loginUser = 
    "${req.params.loginUser}" and senhaUser = "${req.params.senhaUser}"`, function(erro, admin){
        if(erro){
            res.send(erro)
            console.log(erro)
        }
        else{
            database.all(`select * from categoria`, function(erro, categoria){
                if(erro){
                    res.send(erro)
                }
                else{
                    database.all(`select * from infoDelivery`, function(erro, infoDelivery){
                        res.render("categoriasAdmin", {categoria, admin, infoDelivery})
                    })
                }
            })
        }
    })
})

//delete categoria
categoria.get("/del/:idcategoria/qukeie/:loginUser/:senhaUser", function(req, res){

    database.all(`select * from categoria where id = "${req.params.idcategoria}"`, function(erro, categoria){
        if(erro){
            res.send(erro)
        }
        else if(categoria.length == 1){
            fs.unlink(`views/uploads/categoria/${categoria[0].imagem}`, function(erro){
                    if(erro){
                        res.send("erro ao deletar imagem: " + erro)
                    }
                    else{
                        database.run(`delete from categoria where id = "${req.params.idcategoria}"`, function(erro){
                            if(erro){
                                res.send("erro ao deletar categoria: " + erro)
                            }
                            else{
                                database.all(`select * from admin where loginUser = 
                                "${req.params.loginUser}" and senhaUser = "${req.params.senhaUser}"`, function(erro, admin){
                                        if(erro){   
                                            res.send(erro)
                                        }
                                        else if(admin.length == 1){
                                            res.redirect(`/ver/categoria/${req.params.loginUser}/${req.params.senhaUser}`)
                                        }
                                })
                            }
                        })
                    }
            })
        }
    })

})

module.exports = categoria