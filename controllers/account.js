const conexao = require('../db/connection')

class Contas {
    novaConta(conta, res) {
        const dataCriacao = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const args = [conta.idPessoa, conta.saldo, conta.limiteSaqueDiario, conta.flagAtivo, conta.tipoConta, dataCriacao]

        const sql = 'INSERT INTO conta(idPessoa, saldo, limiteSaqueDiario, flagAtivo, tipoConta, dataCriacao) VALUES (?,?,?,?,?,?) RETURNING idConta;'

        conexao.query(sql, args, (erro, response) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(response)
            }
        })
    }

    deposito(deposito, id, res) {
        const dataTransacao = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const args = [id, deposito.valor, dataTransacao]

        const sql = 'INSERT INTO transacao(idConta, valor, dataCriacao) VALUES (?,?,?);'

        conexao.query(sql, args, (erro, response) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                const sql = `SELECT * FROM conta WHERE idConta=${id}`

                conexao.query(sql, (erro, response) => {
                    const conta = response[0]
                    if (erro) {
                        res.status(400).json(erro)
                    } else {
                        const sql = 'UPDATE conta SET saldo = ? WHERE idConta=?'

                        const saldoAtual = conta.saldo + deposito.valor

                        conexao.query(sql, [saldoAtual, id], (erro, response) => {
                            if (erro) {
                                res.status(400).json(erro)
                            }
                            else {
                                res.status(201).json('sucesso')
                            }
                        })
                    }
                })
            }
        })
    }

    saque(saque, id, res) {
        const dataTransacao = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const sql = `SELECT * FROM conta WHERE idConta=${id}`

        conexao.query(sql, (erro, response) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                const conta = response[0]

                if (conta.flagAtivo == 1 || conta.saldo > saque.valor || conta.limiteSaqueDiario < saque.valor) {
                    const args = [id, -saque.valor, dataTransacao]

                    const sql = 'INSERT INTO transacao(idConta, valor, dataCriacao) VALUES (?,?,?);'

                    conexao.query(sql, args, (erro, response) => {
                        if (erro) {
                            res.status(400).json(erro)
                        } else {
                            const sql = 'UPDATE conta SET saldo = ? WHERE idConta=?'

                            const saldoAtual = conta.saldo - saque.valor

                            conexao.query(sql, [saldoAtual, id], (erro, res) => {
                                if (erro) {
                                    res.status(400).json(erro)
                                }
                            })
                            res.status(201).json("sucesso")
                        }
                    })
                } else {
                    res.status(400).json('Não é possivel efetuar essa transação!')
                }
            }
        })
    }


    bloqueia(id, res) {
        const sql = 'UPDATE conta SET flagAtivo = false WHERE idConta=?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json("sucesso")
            }
        })
    }

    listaTransacoes(id, res) {
        const sql = `SELECT * FROM transacao WHERE idConta=${id}`

        conexao.query(sql, (erro, response) => {
            const transacao = response
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(transacao)
            }
        })
    }

    consultaSaldo(id, res) {
        const sql = `SELECT * FROM conta WHERE idConta=${id}`

        console.log(sql)

        conexao.query(sql, (erro, response) => {
            const conta = response[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(conta)
            }
        })
    }

    adicionaUsuario() {
        const sql = `INSERT INTO usuario (nome, cpf, dataNascimento) VALUES (?,?,?)`
        const args = ['Gustavo Lima', '44858916820', '1995-11-27']

        conexao.query(sql, args, (erro, response) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log(response)
            }
        })
    }
}

module.exports = new Contas