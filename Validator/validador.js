const moment = require('moment')
const campoCliente = 'cliente'
const campoPet = 'pet'
const campoTelefone = 'telefone'
const campoDataAtendimento = 'data_atendimento'
const campoStatus = 'status'

const mensagemCampoPequeno = 'Tamanho campo muito pequeno'
const mensagemDataAntiga = 'Agenda de atendimento tem que ser igual ou depois do momento de agendamento'

class Validador{

    geraRegistro(campo, eValido, mensagemErro){
        const registro = {
           campo : campo,
           valido : eValido,
           mensagem : mensagemErro
        }
        return registro
    }

    validadorPost(atendimento){
        const clienteValido = atendimento.cliente.length >= 4
        const petValido = atendimento.pet.length >= 1
        const telefoneValido = atendimento.telefone.length >= 8
        const dataValida = moment(atendimento.data_atendimento).isSameOrAfter(moment())
        const statusValido = atendimento.status.length >= 4
        var validacoes = []
        validacoes.push(this.geraRegistro(campoCliente, clienteValido, mensagemCampoPequeno))        
        validacoes.push(this.geraRegistro(campoPet, petValido, mensagemCampoPequeno))        
        validacoes.push(this.geraRegistro(campoTelefone, telefoneValido, mensagemCampoPequeno))        
        validacoes.push(this.geraRegistro(campoDataAtendimento, dataValida, mensagemDataAntiga))        
        validacoes.push(this.geraRegistro(campoStatus, statusValido, mensagemCampoPequeno))        
        const erros = validacoes.filter(registro => !registro.valido)
        return erros
    }

    validadorPatch(valores){
        var validacoes = []
        if(valores.cliente){
            const clienteValido = valores.cliente.length >= 4
            validacoes.push(this.geraRegistro(campoCliente, clienteValido, mensagemCampoPequeno))        
        }
        if(valores.pet){
            const petValido = valores.pet.length >= 1
            validacoes.push(this.geraRegistro(campoPet, petValido, mensagemCampoPequeno))        
        }
        if(valores.telefone){
            const telefoneValido = valores.telefone.length >= 8    
            validacoes.push(this.geraRegistro(campoTelefone, telefoneValido, mensagemCampoPequeno))        
        }
        if(valores.status){
            const statusValido = valores.status.length >= 4
            validacoes.push(this.geraRegistro(campoStatus, statusValido, mensagemCampoPequeno))        
        }
        if(valores.data_atendimento){
            const dataValida = moment(valores.data_atendimento).isSameOrAfter(moment().format("YYYY-MM-DD HH:mm:ss"))
            validacoes.push(this.geraRegistro(campoDataAtendimento, dataValida, mensagemDataAntiga))    
        }
        const erros = validacoes.filter(registro => !registro.valido)
        return erros
    }
}

module.exports = new Validador()