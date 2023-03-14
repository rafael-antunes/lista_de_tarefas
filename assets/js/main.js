const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

// Este eventListener chama a função criatarefa sempre que o enter no telcado é apertado.
// O if neste eventListenter previne que a tarefa seja criada com o seu conteúdo vazio
inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) { //13 é ó código da tecla enter
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value); // nesta linha o eventListener está passando o valor da varável inputTarefa para a função criatarefa
    }
})

// esta função é responsavel por limpar o input e fazer com que o cursor volte para o input, após a criação da tarefa
function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

// na função em que o botão apagar é criado, o parametro "li" recebe o objeto <li> enviado pela função "criaTarefa"
function criaBotaoApagar(li) {
    li.innerText += ' '; // este comando apenas cria um espaço entre o botão e o conteúdo do <li>
    const botaoApagar = document.createElement('button');  // este comando cria o objeto <button> no html
    botaoApagar.innerText = 'Apagar'; // este comando coloca o texto "Apagar" dentro do botão
    botaoApagar.setAttribute('class', 'apagar'); // este comando adiciona a classe "apagar" ao botão
    botaoApagar.setAttribute('title', 'Apagar esta tarefa'); // este comando adiciona o atributo "title", com o conteúdo "Apagar esta tarefa" dentro do objeto <button>
    li.appendChild(botaoApagar); // este comando coloca o botão dentro do objeto <li>
}

// esta função recebe o cnteúdo de texto do input inputTarefa, e adiciona ela na pagina HTML
function criaTarefa(textoInput) {
    const li = criaLi(); // este comando chama a função criaLi que vai criar o objeto <li> no HTML
    li.innerText = textoInput; // esta linha adiciona o conteúdo de texto, recebido através da varável inputTarefa, no objeto <li> 
    tarefas.appendChild(li); // este comando adiciona o ovjeto <li> e seu conteúdo dentro da lista <ul>, que está dentro da varável "tarefas"
    limpaInput(); // após adicionar o <li> com seu conteúdo na <ul>, é chamada a função limpaInput, que vai colocar um conteúdo "vazio" dentro da variável inputTarefa e voltar o cursor para o input
    criaBotaoApagar(li); // esta função cria o botão "apagar" ao lado do conteúdo que aparece no <li>
    salvarTarefas();
}

// Este eventListener chama a função criaTarefa sempre que o botão "adicionar nova tarefa" é apertado.
// O if neste eventListenter previne que a tarefa seja criada com o seu conteúdo vazio
btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value); // nesta linha o eventListener está passando o valor da varável inputTarefa para a função criatarefa
});

// este addEventListener apaga a tarafa ao qual o botão está associado
document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('apagar')) {
        el.parentElement.remove(); // o comando parentElement.remove() é responsável por apagar o elemento "pai" do elemento referenciado, que no caso é o elemento que contém a classe "apagar" (el)
        salvarTarefas();
    }
})


//esta função coleta o texto que está dentro do objeto <li> e o armazena em um arquivo json
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li'); // esta variável coleta todos os <li> que estão dentro da <ul> com a classe "tarefas"
    const listaDeTarefas = [];

    // este for of passará por todos os <li> que o estão dentro da <ul> com classe "tarefas"
    for(let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText; // o comando innerText coletará somente o texto contido no objeto <li>
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); // este comando substituirá o texto do botão apagar por um campo vazio. O método trim() apaga o espaço que ficou no final do texto
        listaDeTarefas.push(tarefaTexto); // este comando adicionará o texto na array listaDeTarefas que foi declarada nesta função
    }

    const tarefasJson = JSON.stringify(listaDeTarefas);  // o comando JSON.stringify transforma o conteúdo da variável "listaDeTarefas" em string, para o seu conteúdo poder ser mantido em um arquiv JSON na memória do navegador
    localStorage.setItem('tarefas', tarefasJson); // o parametro 'tarefas' é o nome do arquivo onde as informações foram salvas
}

// esta função buscará os itens salvos como string no JSON e os converterá em um array
function adicionaTarefasSalvas() {
    const tasks = localStorage.getItem('tarefas'); // o comando localStorage.getItem buscará os itens salvos na memória do navegador e os armazenará na variável tasks
    const listaDeTarefas = JSON.parse(tasks); // o comando JSON.parse converterá os itens salvos como string na variável "listaDeTarefas" no formato de array
    
    // este for of fará a iteração dos intens salvos no array e mandará cada item como parametro para a função "criaTarefa", que listará as tarefas na pagina web
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();