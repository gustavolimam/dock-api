const customExpress = require('./config/customExpress')
const conexao = require('./db/connection')
const tabelas = require('./db/tables')

conexao.connect(erro => {
    if (erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso')

        tabelas.init(conexao)

        const app = customExpress()

        app.listen(3000, () => console.log('Run server at port :3000'))
    }
})