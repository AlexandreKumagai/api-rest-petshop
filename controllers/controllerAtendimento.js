const model = require('../database/models/AtendimentosRepository')

module.exports = app => {

    app.get('/atendimentos',(req,resp) => model.consultaTodos(resp))
    
    app.get('/atendimentos/:id' , (req, resp) => {
        const id = parseInt(req.params.id);
        model.consultaPorId(id, resp)
    })

    app.post('/atendimentos',(req,resp) => {
        
        const requestBody = req.body
        model.adiciona(requestBody, resp)
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



