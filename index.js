const configuracoes = require('./config/configuration.js')
const conexao = require('./database/conexao')

conexao.connect(erro => {
    if(erro){
        console.log('ero conexao' + erro)
    }else{
        console.log('conexao ao BD OK')
    }
})

const app = configuracoes()
app.listen(5500,() => console.log('Servidor iniciando'))
