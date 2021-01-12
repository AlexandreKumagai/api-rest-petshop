const moment = require('moment')
const conexao = require('../conexao')
const validador = require('../../Validator/validador')

class AtendimentosRepository {


    adiciona(atendimento, resp){
        
        var erros = validador.validadorPost(atendimento)
        const existemErros = erros.length > 0
        if(existemErros)
            resp.status(400).json(erros)
        else{
            const sql = 'INSERT INTO Atendimentos SET ?'
            const data_agendamento = moment().format("YYYY-MM-DD HH:mm:ss")
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

    consultaTodos(resp){
        const sql = 'SELECT * FROM Atendimentos'
        conexao.query(sql, (erro,resultados) => {
            if(erro)
                resp.status(400).json(erro)
            else
                resp.status(200).json(resultados)
        })
    }

    apaga(id, resp){
        const sql = 'DELETE FROM Atendimentos where id = ?'
        conexao.query(sql, id, (erro, resposta) => {
            if(erro)
                resp.status(400).json(erro)
            else
                resp.status(204).json(resposta) 
        })
    }

    atualiza(id, valores,resp){
        const erros = validador.validadorPatch(valores)
        const contemErros = erros.length > 0
        if(contemErros)
            resp.status(400).json(erros)
        else{
            const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'
            if(valores.data_atendimento)
                valores.data_agendamento = moment().format("YYYY-MM-DD HH:mm:ss")
            conexao.query(sql, [valores, id] , (erro, resposta) => {
                if(erro)
                    resp.status(400).json(erro)
                else
                    resp.status(204).json(resposta)
            
            })
        }
    }
    consultaPorId(id,resp){
        const sql = 'SELECT * FROM Atendimentos WHERE id = ?'
        conexao.query(sql, id, (erro, resposta) => {
            if(erro)
                resp.status(400).json(erro)
            else{
                const  atendimento = resposta[0]
                resp.status(200).json(atendimento)
            }
        })
    }
}

module.exports = new AtendimentosRepository()