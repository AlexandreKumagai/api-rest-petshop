const model = require('../database/models/Atendimentos')

module.exports = app => {
    app.get('/atendimentos',(req,resp) => model.consulta(resp))

    app.post('/atendimentos',(req,resp) => {
        
        const conteudo = req.body
        model.adiciona(conteudo, resp)
    })

    app.delete('/atendimentos/:id' , (req, resp) => {
        const id = parseInt(req.params.id);
        console.log(id)
        model.apaga(id,resp)
    })
    app.patch('/atendimentos/:id' , (req, resp) => {
        const id = parseInt(req.params.id);
        const valores = req.body
        model.atualiza(id,valores,resp)
    })
}



