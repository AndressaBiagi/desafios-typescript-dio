# Aqui estão os desafios do curso introdutório de Typescript da DIO! 

* Desafio 1: Rodar esse arquivo .ts sem causar erros;

    let employee = {};
    employee.code = 10;
    employee.name = "John";

* Desafio 2: Melhorar esse código usando o TypeScript;

    let pessoa1 = {};
    pessoa1.nome = "maria";
    pessoa1.idade = 29;
    pessoa1.profissao = "atriz"

    let pessoa2 = {}
    pessoa2.nome = "roberto";
    pessoa2.idade = 19;
    pessoa2.profissao = "Padeiro";

    let pessoa3 = {
        nome: "laura",
        idade: "32",
        profissao: "Atriz"
    };

    let pessoa4 = {
        nome = "carlos",
        idade = 19,
        profissao = "padeiro"
    }

*Desafio 3: Identificar e corrigir os erros;

    let botaoAtualizar = document.getElementById('atualizar-saldo');
    let botaoLimpar = document.getElementById('limpar-saldo');
    let soma = document.getElementById('soma');
    let campoSaldo = document.getElementById('campo-saldo');

    campoSaldo.innerHTML = 0

    function somarAoSaldo(soma) {
        campoSaldo.innerHTML += soma;
    }

    function limparSaldo() {
        campoSaldo.innerHTML = '';
    }

    botaoAtualizar.addEventListener('click', function () {
        somarAoSaldo(soma.value);
    });

    botaoLimpar.addEventListener('click', function () {
        limparSaldo();
    });

* Desafio 4: Terminar a seguinte aplicação:
    Um aplicativo que: 
    - Busca filmes
    - Apresenta uma lista com os resultados pesquisados
    - Permite a criação de listas de filmes e a posterior adição de filmes nela

    var apiKey = '3f301be7381a03ad8d352314dcc3ec1d';
    let apiKey;
    let requestToken;
    let username;
    let password;
    let sessionId;
    let listId = '7101979';

    let loginButton = document.getElementById('login-button');
    let searchButton = document.getElementById('search-button');
    let searchContainer = document.getElementById('search-container');

    loginButton.addEventListener('click', async () => {
    await criarRequestToken();
    await logar();
    await criarSessao();
    })

    searchButton.addEventListener('click', async () => {
    let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let query = document.getElementById('search').value;
    let listaDeFilmes = await procurarFilme(query);
    let ul = document.createElement('ul');
    ul.id = "lista"
    for (const item of listaDeFilmes.results) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item.original_title))
        ul.appendChild(li)
    }
    console.log(listaDeFilmes);
    searchContainer.appendChild(ul);
    })

    function preencherSenha() {
    password = document.getElementById('senha').value;
    validateLoginButton();
    }

    function preencherLogin() {
    username =  document.getElementById('login').value;
    validateLoginButton();
    }

    function preencherApi() {
    apiKey = document.getElementById('api-key').value;
    validateLoginButton();
    }

    function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
    }

    class HttpClient {
    static async get({url, method, body = null}) {
        return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method, url, true);

        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
            resolve(JSON.parse(request.responseText));
            } else {
            reject({
                status: request.status,
                statusText: request.statusText
            })
            }
        }
        request.onerror = () => {
            reject({
            status: request.status,
            statusText: request.statusText
            })
        }

        if (body) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            body = JSON.stringify(body);
        }
        request.send(body);
        })
    }
    }

    async function procurarFilme(query) {
    query = encodeURI(query)
    console.log(query)
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        method: "GET"
    })
    return result
    }

    async function adicionarFilme(filmeId) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
        method: "GET"
    })
    console.log(result);
    }

    async function criarRequestToken () {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"
    })
    requestToken = result.request_token
    }

    async function logar() {
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: "POST",
        body: {
        username: `${username}`,
        password: `${password}`,
        request_token: `${requestToken}`
        }
    })
    }

    async function criarSessao() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        method: "GET"
    })
    sessionId = result.session_id;
    }

    async function criarLista(nomeDaLista, descricao) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
        name: nomeDaLista,
        description: descricao,
        language: "pt-br"
        }
    })
    console.log(result);
    }

    async function adicionarFilmeNaLista(filmeId, listaId) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
        media_id: filmeId
        }
    })
    console.log(result);
    }

    async function pegarLista() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
        method: "GET"
    })
    console.log(result);
    }