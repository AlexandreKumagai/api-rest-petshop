const moment = require('moment')
const conexao = require('../conexao')

class Atendimentos {

    geraValidacoes(campo, validacao, mensagemErro){
        const registro = {
           campo : campo,
           valido : validacao,
           mensagem : mensagemErro
        }
        return registro
    }
    adiciona(atendimento, resp){
        const data_agendamento = moment().format("YYYY-MM-DD HH:mm:ss")
        const tamanhoValido = atendimento.cliente.length >= 4
        const petValido = atendimento.pet.length >= 1
        const telefoneValido = atendimento.telefone.length >= 8
        const dataValida = moment(atendimento.data_atendimento).isSameOrAfter(data_agendamento)
        const statusValido = atendimento.cliente.length >= 4
        var validacoes = []
        validacoes.push(this.geraValidacoes('cliente',tamanhoValido,'Tamanho campo muito pequeno'))
        validacoes.push(this.geraValidacoes('pet',petValido,'Tamanho campo muito pequeno'))
        validacoes.push(this.geraValidacoes('telefone',telefoneValido,'Tamanho campo muito pequeno'))
        validacoes.push(this.geraValidacoes('data_atendimento',dataValida,'Agenda de atendimento tem que ser igual ou depois do momento de agendamento'))
        validacoes.push(this.geraValidacoes('status',statusValido,'Tamanho campo muito pequeno'))
        console.log(validacoes)
        const erros = validacoes.filter(registro => !registro.valido)
        const existemErros = erros.length > 0
        if(existemErros){
            resp.status(400).json(erros)
        }else{
            const sql = 'INSERT INTO Atendimentos SET ?'
            const atendimentoFinal = { ...atendimento,data_agendamento }
            console.log(atendimentoFinal)
            conexao.query(sql, atendimentoFinal, (erro, resultados) => { 
                if(erro){
                    console.log('Erro ao gravar registro')
                    resp.status(400).json(erro)
                }else{
                    const id = resultados.insertId 
                    const resposta = { ...atendimentoFinal, id}        
                    resp.status(201).json(resposta)
                }
            })
        }
    }
    consulta(resp){
        const sql = 'SELECT * FROM Atendimentos'
        conexao.query(sql, (erro,resultados) => {
            if(erro){
                resp.status(400).json(erro)
            }else{
                resp.status(200).json(resultados)
            }
        })
    }
    apaga(id, resp){
        const sql = 'DELETE FROM Atendimentos where id = ?'
        conexao.query(sql, id, (erro, resposta) => {
            if(erro){
                resp.status(400).json(erro)
            } else{
                resp.status(204).json(resposta)
            } 
        })
    }
    atualiza(id, valores,resp){
        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'
        conexao.query(sql, [valores, id] , (erro, resposta) => {
            if(erro){
                resp.status(400).json(erro)
            } else{
                resp.status(204).json(resposta)
            } 
        })
    }
}

module.exports = new Atendimentos()