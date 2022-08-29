let obj;
let ident;

function identificacao() {
    const verifNome = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    ident = prompt('Digite seu nome:');

    obj = { name: ident };
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', obj);
    promessa.then(entrouNaSala(promessa));
    promessa.catch(verificaNome);

}
identificacao();

function entrouNaSala(nomes) {
    
}

function verificaNome() {

    alert('ja existe esse nome!');
    identificacao();
}

function verificaOnline() {
    
    let promessa2 = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', obj);
    promessa2.then(entrouNaSala);
    promessa2.catch(saiuDaSala);

}
function saiuDaSala(){
    alert("Status: Offline")
}

setInterval(verificaOnline, 5000);

function buscaMensagensServidor() {
    let promessaMensagem = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessaMensagem.then(imprimeMensagens);

}


function imprimeMensagens(mensagens) {

    let tela = document.querySelector(".bate-papo");
    tela.innerHTML = "";


    for (let cont = 0; cont <= mensagens.data.length; cont++) {
        tela.innerHTML = tela.innerHTML + `<div class="${mensagens.data[cont].type}">
        <a><a class = "horario">(${mensagens.data[cont].time}) </a> 
        <span class = "negrito"> ${mensagens.data[cont].from} </span>
        ${mensagens.data[cont].text}</a>
        </div>`;

    }
    window.scrollTo(0, document.querySelector(".bate-papo").scrollHeight)

    
}

setInterval(buscaMensagensServidor, 3000);

function enviaMensagem(mensagem) {
    
    const enviarMensagem = document.querySelector("input").value;
    
    
    console.log(enviarMensagem);

    let objeto = {
        from: ident,
        to: "todos",
        text: enviarMensagem,
        type: "message"
    }

    let promessa3 = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', objeto);
    promessa3.then(mensagemEnviada);
    promessa3.catch();
    document.querySelector("input").value = "";
}

function mensagemEnviada() {
    let tela = document.querySelector(".bate-papo");
    tela.innerHTML = tela.innerHTML + `<div class="${objeto.data.type}">
    <a><span class = "negrito"> ${objeto.data.from} </span>${objeto.data.text}</a>
</div>`



}



