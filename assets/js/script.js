// Variáveis
let listaDeNumerosSorteados = []; // Lista para armazenar os números já sorteados e evitar repetições
let numeroLimite = 20; // Definição do limite máximo para os números aleatórios
let numeroSecreto = gerarNumeroAleatorio(); // Gera o primeiro número secreto ao iniciar o jogo
let tentativas = 1; // Número inicial de tentativas permitidas para o jogador
const attempts = 3; // Número máximo de tentativas permitidas para o jogador

/**
 * Função para gerar um número aleatório entre 1 e numeroLimite.
 * A função verifica se o número já foi sorteado anteriormente para evitar repetições.
 * Se todos os números possíveis já tiverem sido sorteados, a lista de números sorteados é reiniciada.
 *
 * @returns {number} Número aleatório não repetido
 */
function gerarNumeroAleatorio() {
    // Gera um número aleatório dentro do limite definido
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    // Obtém a quantidade de números já sorteados
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    // Se todos os números já foram sorteados, reinicia a lista
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    // Verifica se o número já foi sorteado antes
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // Se já foi sorteado, chama a função novamente para gerar outro número
        return gerarNumeroAleatorio();
    } else {
        // Adiciona o número sorteado à lista
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados) // Exibe a lista no console para debug
        return numeroEscolhido;
    }
}

/**
 * Função que limpa o campo de entrada do usuário.
 * Após cada tentativa, o campo de entrada deve ser resetado para evitar que o usuário tenha que apagá-lo manualmente.
 */
function limparCampo() {
    // Obtém o campo de entrada do usuário
    let chute = document.querySelector('.entrada-numero');

    // Limpa o valor do campo, deixando-o pronto para a próxima tentativa
    chute.value = '';
}

/**
 * Função que reinicia o jogo para uma nova rodada.
 * Gera um novo número secreto, reseta as tentativas e reativa a interface para um novo jogo.
 */
function reiniciarJogo() {
    // Gera um novo número secreto para a nova rodada
    numeroSecreto = gerarNumeroAleatorio();

    // Limpa o campo de entrada para um novo chute
    limparCampo();

    // Reseta o número de tentativas
    tentativas = 1;

    // Atualiza os textos na tela para iniciar um novo jogo
    exibirTextoNaTela('h1', 'Adivinhe o <span class="texto-destaque">número secreto</span>');
    exibirTextoNaTela('p', 'Escolha um número entre 1 a 20');

    // Desativa o botão de reiniciar até que o jogo termine novamente
    document.getElementById('botao-reiniciar').setAttribute('disabled', true);

    // Reativa o campo de entrada para permitir novas jogadas
    document.getElementById('botao-chutar').removeAttribute('disabled');
}

/**
 * Função que exibe um texto na tela dentro do elemento especificado.
 * Além de alterar o conteúdo HTML, a função utiliza a API `responsiveVoice` para leitura do texto em voz alta.
 *
 * @param {string} tag - A tag HTML do elemento onde o texto será inserido (ex: 'h1', 'p').
 * @param {string} texto - O texto a ser exibido na tela e falado pela voz sintetizada.
 */
function exibirTextoNaTela(tag, texto) {
    // Seleciona o elemento HTML com base na tag fornecida
    let campo = document.querySelector(tag);

    // Define o novo conteúdo do elemento
    campo.innerHTML = texto;

    // Utiliza a API responsiveVoice para leitura em voz alta do texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

/**
 * Função que verifica se o número digitado pelo jogador é igual ao número secreto.
 * Se o jogador acertar, exibe mensagem de vitória e habilita o botão para reiniciar o jogo.
 * Se errar, informa se o número secreto é maior ou menor e contabiliza as tentativas.
 * O jogador tem no máximo 3 tentativas.
 */
function verificarChute() {
    // Obtém o valor digitado pelo jogador no input e converte para número
    let chute = parseInt(document.querySelector('.entrada-numero').value);
    console.log(numeroSecreto); // Exibe o número secreto no console para debug

    // Verifica se o jogador acertou o número secreto
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', 'Meus parabéns, clique em novo jogo e volte a brincar!');

        // Habilita o botão para reiniciar o jogo
        document.getElementById('botao-reiniciar').removeAttribute('disabled');

        // Desabilita o campo de entrada para impedir novas jogadas
        document.getElementById('botao-chutar').setAttribute('disabled', true);
    }
    // Verifica se o jogador atingiu o número máximo de tentativas
    else if (tentativas == 3) {
        exibirTextoNaTela('h1', 'Errou! Número máximo de tentativas é 3');
        exibirTextoNaTela('p', 'O número secreto era: ' + numeroSecreto);

        // Habilita o botão para reiniciar o jogo
        document.getElementById('botao-reiniciar').removeAttribute('disabled');

        // Desabilita o campo de entrada para impedir novas jogadas
        document.getElementById('botao-chutar').setAttribute('disabled', true);
    }
    // Caso o jogador erre, informa se o número secreto é maior ou menor
    else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }

        // Incrementa a contagem de tentativas
        tentativas++;

        // Limpa o campo de entrada para o próximo chute
        limparCampo();
    }
}

// Adiciona o evento de clique ao botão de verificação
document.getElementById('botao-chutar').addEventListener('click', verificarChute);

// Adiciona o evento de clique ao botão de reiniciar
document.getElementById('botao-reiniciar').addEventListener('click', reiniciarJogo);