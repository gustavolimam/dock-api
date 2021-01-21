const Account = require('../controllers/account')

class Tables {
    init(conn) {
        this.conn = conn

        this.criarConta()
        this.criarTransacao()
        this.criarUsuario()
    }

    criarConta() {
        const sql = `CREATE TABLE IF NOT EXISTS conta (
            idConta int(11) NOT NULL AUTO_INCREMENT,
            idPessoa int(11) DEFAULT NULL,
            saldo decimal(10,5) DEFAULT NULL,
            limiteSaqueDiario decimal(10,5) DEFAULT NULL,
            flagAtivo tinyint(4) DEFAULT NULL,
            tipoConta int(11) DEFAULT NULL,
            dataCriacao datetime DEFAULT NULL,
            PRIMARY KEY (idConta)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

        this.conn.query(sql, err => {
            if (err) {
                console.log(err)
            } else {
                console.log('Sucesso ao criar tabela de conta')
            }
        })
    }

    criarTransacao() {
        const query = `CREATE TABLE IF NOT EXISTS transacao (
            idTransacao int(11) NOT NULL AUTO_INCREMENT,
            idConta int(11) DEFAULT NULL,
            valor decimal(10,5) DEFAULT NULL,
            dataCriacao datetime DEFAULT NULL,
            PRIMARY KEY (idTransacao)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

        this.conn.query(query, err => {
            if (err) {
                console.log(err)
            } else {
                console.log('Sucesso ao criar tabela de transação')
            }
        })
    }

    criarUsuario() {
        const query = `CREATE TABLE usuario (
            idPessoa int(11) NOT NULL AUTO_INCREMENT,
            nome varchar(200) DEFAULT NULL,
            cpf varchar(200) DEFAULT NULL,
            dataNascimento datetime DEFAULT NULL,
            PRIMARY KEY (idPessoa)
          ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`

        this.conn.query(query, err => {
            if (err) {
                console.log(err)
            } else {
                Account.adicionaUsuario();
                console.log('Sucesso ao criar tabela de usuário')
            }
        })
    }
}

module.exports = new Tables