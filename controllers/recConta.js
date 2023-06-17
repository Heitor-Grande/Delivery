//express
const express = require("express")
const recConta = express.Router()

//nodemailer
const nodemailer = require("nodemailer")

//database
const database = require("../models/dbConnection")

//config email emitente
let emitente = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
        user: "dev3wcontato@outlook.com",
        pass: "CorsaRally<2004>"
        }
    })

recConta.post("/envio/rec/senha", function(req, res){

    let emailRec = req.body.emailRec

        //req dados delivery e user
        database.all(`select * from user where email = "${emailRec}"`, function(erro, user){
            if(erro){
                res.send(erro)
            }
            else if(user.length == 1){
                database.all(`select * from infoDelivery`, async function(erro, infoDelivery){
                    if(erro){
                        res.send(erro)
                    }
                    else{
                            //email (mensagem)
                            let email = {
                            from: "dev3wcontato@outlook.com",
                            to: `${emailRec}`,
                            subject: `Recuperação de senha ${infoDelivery[0].nome}`,
                            html: `
                            <h3>${user[0].nome}, segue sua senha para continuar pedindo ;)</h3>
                            <p>Nós da ${infoDelivery[0].nome} agradecemos a sua preferêcia.</p>
                            <p>Senha de recuperação: <strong>${user[0].pass}</strong></p>
                            <p>Clique aqui para entrar na sua conta: <a href="https://delivery-production-0d3c.up.railway.app/login">entrar.</a><p/>
                            <img src="https://gifs.eco.br/wp-content/uploads/2022/02/animados-gifs-de-motoboys-1.gif">
                            `
                            }

                            //config envio(remetente)
                            emitente.sendMail(email, function (erro) {
                            if (erro) {
                                res.send(erro)
                            }
                            else {
                                res.send(`Email com a senha de recuperação enviado para: ${emailRec}.`)
                            }
                        })
                    }
                })
            }   
            else{
                res.send("Email não encontrado em nosso sistema.")
            }
        })
})

module.exports = recConta;