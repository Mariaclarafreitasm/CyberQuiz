const perguntas = [

    {
        pergunta:
            "Você recebe uma mensagem dizendo que sua conta bancária será bloqueada. Há um link para resolver o problema. O que fazer?",

        alternativas: [
            "Clicar imediatamente no link",
            "Enviar seus dados bancários",
            "Acessar o banco pelo aplicativo ou site oficial",
            "Responder a mensagem pedindo mais informações"
        ],

        correta: 2
    },

    {
        pergunta:
            "Qual destas é uma característica comum de mensagens de phishing?",

        alternativas: [
            "Senso de urgência para fazer a vítima agir rapidamente",
            "Mensagem enviada exclusivamente por amigos",
            "Ausência total de links",
            "Sempre possuir o nome completo da vítima"
        ],

        correta: 0
    },

    {
        pergunta:
            "Qual é a melhor prática para criar senhas?",

        alternativas: [
            "Usar a mesma senha em todos os sites",
            "Usar senhas longas e diferentes para cada serviço",
            "Usar apenas a data de nascimento",
            "Usar apenas números"
        ],

        correta: 1
    },

    {
        pergunta:
            "Um amigo manda uma mensagem pedindo dinheiro com urgência. O que você deve fazer primeiro?",

        alternativas: [
            "Transferir imediatamente",
            "Pedir uma foto do documento",
            "Confirmar a identidade por outro meio",
            "Compartilhar a mensagem"
        ],

        correta: 2
    },

    {
        pergunta:
            "Para que serve a autenticação de dois fatores (2FA)?",

        alternativas: [
            "Aumentar a velocidade da internet",
            "Adicionar uma camada extra de segurança",
            "Eliminar completamente a necessidade de senha",
            "Bloquear todos os vírus do celular"
        ],

        correta: 1
    },

    {
        pergunta:
            "Você recebe um SMS informando que ganhou um prêmio e precisa pagar uma taxa para recebê-lo. Qual atitude é mais segura?",

        alternativas: [
            "Pagar a taxa rapidamente",
            "Enviar seus dados pessoais",
            "Verificar a promoção nos canais oficiais",
            "Encaminhar a mensagem para familiares"
        ],

        correta: 2
    },

    {
        pergunta:
            "Qual dessas informações você deve evitar publicar abertamente nas redes sociais?",

        alternativas: [
            "Uma foto de um animal",
            "Uma opinião sobre um filme",
            "Senha, endereço e dados bancários",
            "Uma receita de comida"
        ],

        correta: 2
    },

    {
        pergunta:
            "Qual atitude ajuda a identificar um link suspeito?",

        alternativas: [
            "Verificar cuidadosamente o endereço e o remetente",
            "Clicar para descobrir o destino",
            "Enviar o link para um amigo testar",
            "Desativar o antivírus antes de abrir"
        ],

        correta: 0
    },

    {
        pergunta:
            "Você percebe uma movimentação financeira que não reconhece. O que deve fazer?",

        alternativas: [
            "Ignorar",
            "Compartilhar o cartão nas redes sociais",
            "Entrar em contato com o banco pelos canais oficiais",
            "Esperar alguns dias"
        ],

        correta: 2
    },

    {
        pergunta:
            "Qual destas atitudes aumenta sua segurança digital?",

        alternativas: [
            "Manter aplicativos e sistema atualizados",
            "Instalar aplicativos de fontes desconhecidas",
            "Compartilhar códigos recebidos por SMS",
            "Usar a mesma senha em todos os serviços"
        ],

        correta: 0
    }

];


/* ==========================================
   VARIÁVEIS
========================================== */

let perguntaAtual = 0;

let pontos = 0;

let acertos = 0;

let tempo = 15;

let intervalo;

let nomeJogador = "";

let respondeu = false;


/* ==========================================
   ELEMENTOS HTML
========================================== */

const telaInicial =
    document.getElementById("tela-inicial");

const telaQuiz =
    document.getElementById("tela-quiz");

const telaResultado =
    document.getElementById("tela-resultado");

const telaRanking =
    document.getElementById("tela-ranking");

const nomeInput =
    document.getElementById("nome-jogador");

const nomeExibicao =
    document.getElementById("nome-exibicao");

const perguntaElemento =
    document.getElementById("pergunta");

const alternativasElemento =
    document.getElementById("alternativas");

const pontosElemento =
    document.getElementById("pontos");

const tempoElemento =
    document.getElementById("tempo");

const numeroPerguntaElemento =
    document.getElementById("numero-pergunta");

const progressoElemento =
    document.getElementById("progresso");

const feedbackElemento =
    document.getElementById("feedback");


/* ==========================================
   INICIAR QUIZ
========================================== */

function iniciarQuiz() {

    nomeJogador =
        nomeInput.value.trim();

    if (nomeJogador === "") {

        alert("Digite seu nome para começar!");

        nomeInput.focus();

        return;
    }

    perguntaAtual = 0;

    pontos = 0;

    acertos = 0;

    pontosElemento.textContent = "0";

    nomeExibicao.textContent =
        nomeJogador;

    telaInicial.classList.add("escondido");

    telaRanking.classList.add("escondido");

    telaResultado.classList.add("escondido");

    telaQuiz.classList.remove("escondido");

    carregarPergunta();
}


/* ==========================================
   CARREGAR PERGUNTA
========================================== */

function carregarPergunta() {

    respondeu = false;

    tempo = 15;

    tempoElemento.textContent = tempo;

    feedbackElemento.textContent = "";

    const pergunta =
        perguntas[perguntaAtual];

    perguntaElemento.textContent =
        pergunta.pergunta;

    numeroPerguntaElemento.textContent =
        perguntaAtual + 1;

    const porcentagem =
        (perguntaAtual / perguntas.length) * 100;

    progressoElemento.style.width =
        `${porcentagem}%`;


    /* Criar alternativas */

    alternativasElemento.innerHTML = "";

    pergunta.alternativas.forEach(
        (texto, indice) => {

            const botao =
                document.createElement("button");

            botao.classList.add(
                "alternativa"
            );

            /* Cores */

            if (indice === 0) {
                botao.classList.add(
                    "alternativa-a"
                );
            }

            if (indice === 1) {
                botao.classList.add(
                    "alternativa-b"
                );
            }

            if (indice === 2) {
                botao.classList.add(
                    "alternativa-c"
                );
            }

            if (indice === 3) {
                botao.classList.add(
                    "alternativa-d"
                );
            }


            botao.innerHTML = `
                <span>${String.fromCharCode(65 + indice)}</span>
                <p>${texto}</p>
            `;


            botao.onclick =
                () => verificarResposta(indice);


            alternativasElemento.appendChild(
                botao
            );
        }
    );


    iniciarTimer();
}


/* ==========================================
   TIMER
========================================== */

function iniciarTimer() {

    clearInterval(intervalo);

    intervalo =
        setInterval(() => {

            tempo--;

            tempoElemento.textContent =
                tempo;


            if (tempo <= 0) {

                clearInterval(intervalo);

                tempoEsgotado();
            }

        }, 1000);
}


/* ==========================================
   TEMPO ESGOTADO
========================================== */

function tempoEsgotado() {

    if (respondeu) {
        return;
    }

    respondeu = true;

    const pergunta =
        perguntas[perguntaAtual];

    const botoes =
        document.querySelectorAll(
            ".alternativa"
        );


    botoes.forEach(botao => {

        botao.classList.add(
            "desativada"
        );

        botao.disabled = true;
    });


    botoes[pergunta.correta]
        .classList.add("correta");


    feedbackElemento.textContent =
        "⏰ Tempo esgotado!";

    setTimeout(
        proximaPergunta,
        1500
    );
}


/* ==========================================
   VERIFICAR RESPOSTA
========================================== */

function verificarResposta(indice) {

    if (respondeu) {
        return;
    }

    respondeu = true;

    clearInterval(intervalo);

    const pergunta =
        perguntas[perguntaAtual];

    const botoes =
        document.querySelectorAll(
            ".alternativa"
        );


    botoes.forEach(botao => {

        botao.disabled = true;

        botao.classList.add(
            "desativada"
        );
    });


    /* RESPOSTA CORRETA */

    if (indice === pergunta.correta) {

        botoes[indice]
            .classList.remove(
                "desativada"
            );

        botoes[indice]
            .classList.add(
                "correta"
            );


        acertos++;


        /*
            100 pontos base
            + bônus baseado no tempo
        */

        const bonusTempo =
            tempo * 10;

        const pontosGanhos =
            100 + bonusTempo;

        pontos += pontosGanhos;


        pontosElemento.textContent =
            pontos;


        feedbackElemento.textContent =
            `🎉 CORRETO! +${pontosGanhos} pontos`;

    }

    /* RESPOSTA ERRADA */

    else {

        botoes[indice]
            .classList.remove(
                "desativada"
            );

        botoes[indice]
            .classList.add(
                "errada"
            );


        botoes[pergunta.correta]
            .classList.remove(
                "desativada"
            );

        botoes[pergunta.correta]
            .classList.add(
                "correta"
            );


        feedbackElemento.textContent =
            "❌ Resposta incorreta!";
    }


    setTimeout(
        proximaPergunta,
        1500
    );
}


/* ==========================================
   PRÓXIMA PERGUNTA
========================================== */

function proximaPergunta() {

    perguntaAtual++;

    if (
        perguntaAtual <
        perguntas.length
    ) {

        carregarPergunta();

    } else {

        finalizarQuiz();
    }
}


/* ==========================================
   FINALIZAR QUIZ
========================================== */

function finalizarQuiz() {

    clearInterval(intervalo);

    telaQuiz.classList.add(
        "escondido"
    );

    telaResultado.classList.remove(
        "escondido"
    );


    document.getElementById(
        "nome-final"
    ).textContent =
        nomeJogador;


    document.getElementById(
        "pontuacao-final"
    ).textContent =
        pontos;


    document.getElementById(
        "acertos-final"
    ).textContent =
        acertos;


    definirNivel();

    salvarRanking();
}


/* ==========================================
   NÍVEL DO JOGADOR
========================================== */

function definirNivel() {

    const nivel =
        document.getElementById(
            "nivel-final"
        );

    const mensagem =
        document.getElementById(
            "mensagem-final"
        );


    if (acertos === 10) {

        nivel.textContent =
            "🏆 Especialista em Segurança";

        mensagem.textContent =
            "Incrível! Você demonstrou excelentes conhecimentos para reconhecer e evitar golpes digitais.";

    }

    else if (acertos >= 8) {

        nivel.textContent =
            "🛡️ Guardião Digital";

        mensagem.textContent =
            "Muito bem! Você sabe identificar a maioria das situações de risco.";

    }

    else if (acertos >= 6) {

        nivel.textContent =
            "🟢 Usuário Consciente";

        mensagem.textContent =
            "Bom trabalho! Você já conhece boas práticas, mas ainda pode melhorar.";

    }

    else if (acertos >= 4) {

        nivel.textContent =
            "🟡 Em Alerta";

        mensagem.textContent =
            "Você conhece alguns riscos, mas precisa ficar mais atento a mensagens e links suspeitos.";

    }

    else {

        nivel.textContent =
            "🔴 Alvo Fácil";

        mensagem.textContent =
            "Vale a pena estudar mais sobre segurança digital para evitar cair em golpes.";

    }
}


/* ==========================================
   RANKING
========================================== */

function salvarRanking() {

    let ranking =
        JSON.parse(
            localStorage.getItem(
                "rankingCyberQuiz"
            )
        ) || [];


    ranking.push({

        nome: nomeJogador,

        pontos: pontos,

        acertos: acertos

    });


    ranking.sort(
        (a, b) =>
            b.pontos - a.pontos
    );


    /*
        Mantém apenas os 10 melhores
    */

    ranking =
        ranking.slice(0, 10);


    localStorage.setItem(
        "rankingCyberQuiz",
        JSON.stringify(ranking)
    );
}


/* ==========================================
   MOSTRAR RANKING
========================================== */

function mostrarRanking() {

    telaInicial.classList.add(
        "escondido"
    );

    telaQuiz.classList.add(
        "escondido"
    );

    telaResultado.classList.add(
        "escondido"
    );

    telaRanking.classList.remove(
        "escondido"
    );


    const lista =
        document.getElementById(
            "lista-ranking"
        );


    let ranking =
        JSON.parse(
            localStorage.getItem(
                "rankingCyberQuiz"
            )
        ) || [];


    lista.innerHTML = "";


    if (ranking.length === 0) {

        lista.innerHTML = `
            <p style="
                color: #777;
                margin: 30px 0;
            ">
                Ainda não existem jogadores
                no ranking.
            </p>
        `;

        return;
    }


    ranking.forEach(
        (jogador, indice) => {

            const item =
                document.createElement(
                    "div"
                );


            item.classList.add(
                "item-ranking"
            );


            if (indice === 0) {

                item.classList.add(
                    "primeiro"
                );
            }


            let medalha;

            if (indice === 0) {
                medalha = "🥇";
            }

            else if (indice === 1) {
                medalha = "🥈";
            }

            else if (indice === 2) {
                medalha = "🥉";
            }

            else {
                medalha =
                    `${indice + 1}º`;
            }


            item.innerHTML = `

                <div class="posicao">
                    ${medalha}
                </div>

                <div class="nome-ranking">
                    ${jogador.nome}

                    <small style="
                        display:block;
                        color:#999;
                        margin-top:3px;
                    ">
                        ${jogador.acertos}/10 acertos
                    </small>
                </div>

                <div class="pontos-ranking">
                    ${jogador.pontos} pts
                </div>

            `;


            lista.appendChild(item);
        }
    );
}


/* ==========================================
   LIMPAR RANKING
========================================== */

function limparRanking() {

    const confirmar =
        confirm(
            "Tem certeza que deseja apagar o ranking?"
        );


    if (!confirmar) {
        return;
    }


    localStorage.removeItem(
        "rankingCyberQuiz"
    );


    mostrarRanking();
}


/* ==========================================
   VOLTAR PARA INÍCIO
========================================== */

function voltarInicio() {

    clearInterval(intervalo);

    telaQuiz.classList.add(
        "escondido"
    );

    telaResultado.classList.add(
        "escondido"
    );

    telaRanking.classList.add(
        "escondido"
    );

    telaInicial.classList.remove(
        "escondido"
    );


    nomeInput.value = "";
}

