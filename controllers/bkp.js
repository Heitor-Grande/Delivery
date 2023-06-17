//fs
const fs = require("fs")

const zip = require("zip-a-folder")

//a cada 12 horas faz o bkp
function bkp12horas(){
    fs.copyFile("models/dbDelivery.db", "bkp/dbDelivery.db", function(erro){
        if(erro){
            console.log(erro)
        }
        else{//copia pasta uploads
            fs.cp("views/uploads", "bkp/uploads", {recursive: true},  function(erro){
                if(erro){
                    console.log(erro)
                }
                else{
                    zip.zip("bkp", "bkpDownload.rar")
                    console.log("bkp feito com  sucesso")
                }
            })
        }
    })
}

module.exports = bkp12horas()