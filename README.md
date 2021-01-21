# Serviço para criação de transações e contas

## Deploy

 Para facilitar no ambiente de testes, será utilizado um ambiente externo para armazenamento dos dados, portanto, não há a necessidade de configuração do banco de dados.

 Para a execução do projeto será necessário rodar os seguinte comando para instalação das dependências:

 ```bash
 npm i
 ```

 Após devemos iniciar o projeto com o comando:

 ```bash
 npm start
 ```

 Com isso o projeto será iniciado e rodará pela porta 3000.

## Endpoints

### Lista Transações 
 
 Este endpoint tem como objetivo retornar todos as transações realizadas por uma determinada conta.

 * **URL:** 
 localhost:3000/transacao/:id

 * **Method:** 
 `GET`

* **Param:**
 `id=[string]`

 * **Success Response:** 
 Code: 200
  Content: 
 ```json
 [
    {
        "idTransacao": 1,
        "idConta": 4,
        "valor": 9,
        "dataCriacao": "2021-01-21T03:55:37.000Z"
    }  
 ]
 ```

### Criar nova conta 
 
 Este endpoint tem como objetivo a criação de uma nova conta.

 * **URL:** 
 localhost:3000/conta

 * **Method:** 
 `POST`

 * **Body:**
 ```json
 {
    "idPessoa": 5,
    "saldo": 10000.00,
    "limiteSaqueDiario": 50.00,
    "flagAtivo": false,
    "tipoConta": 3
}
 ```

 * **Success Response:** 
 Code: 200
 Content: 
 ```json
 {
    "idPessoa": 5,
    "saldo": 10000.00,
    "limiteSaqueDiario": 50.00,
    "flagAtivo": false,
    "tipoConta": 3
}
 ```

 ### Realizar novo depósito
 
 Este endpoint tem como objetivo a realização de um novo depósito em uma conta especifica.

 * **URL:** 
 localhost:3000/deposito/:id

 * **Method:** 
 `POST`

 * **Param:** 
 `id=[string]`

 * **Body:**
 ```json
 {
    "valor": 500
}
 ```

 * **Success Response:** 
 Code: 200
 Content: 
 ```json
 "sucesso"
 ```

  ### Realizar novo saque
 
 Este endpoint tem como objetivo a realização de um novo saque em uma conta especifica.

 * **URL:** 
 localhost:3000/saque/:id

 * **Method:** 
 `POST`

 * **Param:** 
 `id=[string]`

 * **Body:**
 ```json
 {
    "valor": 500
}
 ```

 * **Success Response:** 
 Code: 200
 Content: 
 ```json
 "sucesso"
 ```

 ### Consultar saldo da conta
 
 Este endpoint tem como objetivo a realizar consulta de saldo de um conta.

 * **URL:** 
 localhost:3000/saldo/:id

 * **Method:** 
 `GET`

 * **Param:** 
 `id=[string]`

 * **Success Response:** 
 Code: 200
 Content: 
 ```json
{
    "idConta": 4,
    "idPessoa": 1,
    "saldo": 1000,
    "limiteSaqueDiario": 10,
    "flagAtivo": 1,
    "tipoConta": 1,
    "dataCriacao": "2021-01-21T03:21:04.000Z"
}
 ```

 ### Bloqueio de conta
 
 Este endpoint tem como objetivo a realizar o bloqueio de uma conta.

 * **URL:** 
 localhost:3000/bloqueia/:id

 * **Method:** 
 `GET`

 * **Param:** 
 `id=[string]`

 * **Success Response:** 
 Code: 200
 Content: 
 ```json
"sucesso"
 ```