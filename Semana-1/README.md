# API, REST E RESTFUL

# API

Cliente  -->  (Client)

Garçom (pedidos, levar seus pedidos, para a cozinha)  -->  (API)

Cozinha  -->  (Server)

API -> Conjunto de rotinas e padrões estabelecidos por uma aplicação, para que outras aplicações possam utilizar as funcionalidade desta.
 
- Comunicação entre diferentes serviços;

- Conecta Tecnologias

- Intermedia troca de informações

## REST

Determina algumas regras e obrigações nessa troca de dados intermediada pela API, tranferência que geralmente usa o protocolo HTTP

### NECESSIDADES (constraints) para ser RESTful

- _Client-Server_: separação entre cliente e servidor, isto é, portabilidade do sistema.

- _Stateless_: Cada requisição feita pelo cliente precisa de todas as informações necessárias para o servidor entender e responder (Response)(Res) a requisição (Request)(Req).

- _Cacheable_: Res para uma Req devem ser explícitas ao dizer se aquela Res pode ou não ser cacheada pelo cliente.

- _Layered System_: O cliente acessa o endpoint sem precisar saber da complexidade ou dos passos necessários ou camadas que o servidor deve acessar para responder uma req.

- _Code on demand (opcional)_: Possibilita a aplicação pegar códigos e executar no cliente.

- _Uniform Interface_: Manter padrões e coerência na hora de construir sua API.

## RESTful

Aplicação dos padrões Rest

## BOAS PRÁTICAS

- Utilizar verbos HTTP para requisições.
- Utilizar plural ou singular nos _endpoints_ ? Não importa, basta manter um padrão.
- Não colocar barra após um _endpoint_.
- Nunca deixar um cliente sem respostas.

## VERBOS HTTP

- GET : Receber dados de um Resource.
- POST : Enviar dados ou informações para serem processados por um Resource.
- PUT : Atualizar os dados de um Resource.
- DELETE : Deletar um Resource.

## STATUS DE RESPOSTAS

- 1xx : Informação.
- 2xx : Sucesso.
    - 200 : OK.
    - 201 : CREATED.
    - 204 : Não tem conteúdo POST PUT DELETE
- 3xx : Redirection.
- 4xx : Client Error.
    - 400 : BAD REQUEST.
    - 404 : Not Found!
- 5xx : Server Error.
    - 500 : Internal Server Error.
