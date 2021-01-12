const configuracoes = require('./config/configuration.js')
const conexao = require('./database/conexao')

conexao.connect(erro => {
    if(erro){
        console.log('Erro conexão ao Banco de Dados' + erro)
    }else{
        console.log('Aplicação conectada ao Banco de Dados')
    }
})

const app = configuracoes()
app.listen(5500,() => console.log('===Servidor Iniciado==='))


app.get('/healthcheck',(req,resp) => resp.status(200).send('API está no ar'))

app.get('/',(req,resp) => resp.status(200).send('API está no ar'))