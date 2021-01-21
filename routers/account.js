const Contas = require('../controllers/account')

module.exports = app => {
    app.get('/transacao/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Contas.listaTransacoes(id, res)
    })

    app.post('/conta', (req, res) => {
        const account = req.body

        Contas.novaConta(account, res)
    })

    app.post('/deposito/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Contas.deposito(valores, id, res)
    })

    app.post('/saque/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Contas.saque(valores, id, res)
    })

    app.get('/saldo/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Contas.consultaSaldo(id, res)
    })

    app.get('/bloqueia/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Contas.bloqueia(id, res)
    })
}