(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("links");

  const setMenu = (open) => {
    nav.toggleAttribute("data-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };

  burger.addEventListener("click", () => setMenu(!nav.hasAttribute("data-open")));
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  const terminal = document.querySelector(".terminal");
  const output = document.getElementById("typed");

  const lines = [
   "$ cat curso.txt",
    "Bem-vindo ao Técnico em Informática!",
    "> Programação e lógica",
    "> Web, redes e hardware",
    "> Projetos reais em equipe",
    "$ iniciar_carreira --agora"
  ];

  const DELAY = { text: 22, command: 55, line: 300, fallback: 4500 };

  let lineIndex = 0;
  let charIndex = 0;
  let started = false;

  const typeNext = () => {
    if (lineIndex >= lines.length) return;

    const line = lines[lineIndex];

    if (charIndex < line.length) {
      output.textContent += line[charIndex++];
      setTimeout(typeNext, line.startsWith("$") ? DELAY.command : DELAY.text);
      return;
    }

    output.textContent += "\n";
    lineIndex++;
    charIndex = 0;
    setTimeout(typeNext, DELAY.line);
  };

  const startTyping = () => {
    if (started) return;
    started = true;

    if (reduceMotion) output.textContent = lines.join("\n");
    else typeNext();
  };

  terminal.addEventListener("animationend", startTyping, { once: true });
  if (reduceMotion) startTyping();
  setTimeout(startTyping, DELAY.fallback);
})();







const subjects = {

    logica: {
        number: "MATÉRIA 01",
        title: "Lógica de Programação",

        description:
            "A lógica de programação desenvolve o raciocínio necessário para criar instruções, organizar processos e resolver problemas por meio de algoritmos.",

        topics: [
            "Algoritmos e suas estruturas.",
            "Variáveis, constantes e tipos de dados.",
            "Operadores e expressões lógicas.",
            "Estruturas condicionais e de repetição.",
            "Desenvolvimento de soluções computacionais."
        ],

        importance:
            "É a base para compreender linguagens de programação e desenvolver sistemas.",

        image: "assets/img-disciplinas/LPimg.png"
    },


    html: {
        number: "MATÉRIA 02",
        title: "HTML e CSS",

        description:
            "Conheça as tecnologias fundamentais para construir páginas web, organizar conteúdos e desenvolver interfaces visuais.",

        topics: [
            "Estrutura e elementos HTML.",
            "Formulários e organização de conteúdo.",
            "Seletores e propriedades CSS.",
            "Flexbox e Grid Layout.",
            "Responsividade e estilização de páginas."
        ],

        importance:
            "É o primeiro passo para transformar ideias em interfaces para a internet.",

        image: "assets/img-disciplinas/HTMLimg.png"
    },


    hardware: {
        number: "MATÉRIA 03",
        title: "Arquitetura e Manutenção de Computadores",

        description:
            "Entenda como os computadores são construídos, conheça seus componentes e aprenda conceitos fundamentais de manutenção.",

        topics: [
            "Componentes internos do computador.",
            "Processadores, memória RAM e armazenamento.",
            "Placas-mãe e periféricos.",
            "Montagem e desmontagem de computadores.",
            "Manutenção preventiva e diagnóstico."
        ],

        importance:
            "Permite compreender o funcionamento físico dos equipamentos e seus principais componentes.",

        image: "assets/img-disciplinas/CPUimg.jpg"
    },


    robotica: {
        number: "MATÉRIA 04",
        title: "Noções de Robótica",

        description:
            "Explore a integração entre eletrônica, programação e mecânica para compreender como funcionam sistemas automatizados.",

        topics: [
            "Fundamentos da robótica.",
            "Sensores e atuadores.",
            "Circuitos e componentes eletrônicos.",
            "Automação e controle.",
            "Projetos introdutórios de robótica."
        ],

        importance:
            "Apresenta como a tecnologia pode ser aplicada na criação de máquinas e soluções automatizadas.",

        image: "assets/img-disciplinas/ARDimg.jpg"
    },


    web: {
        number: "MATÉRIA 05",
        title: "Programação Web",

        description:
            "Aprenda os conceitos utilizados no desenvolvimento de aplicações para a internet, explorando a interação entre páginas, dados e funcionalidades.",

        topics: [
            "Fundamentos do JavaScript.",
            "Manipulação do DOM.",
            "Eventos e interatividade.",
            "Integração entre front-end e back-end.",
            "Desenvolvimento de aplicações web."
        ],

        importance:
            "Amplia os conhecimentos de desenvolvimento e permite criar aplicações interativas.",

        image: "assets/img-disciplinas/PWimg.jpg"
    },


    sistemas: {
        number: "MATÉRIA 06",
        title: "Sistemas Operacionais",

        description:
            "Compreenda como os sistemas operacionais administram os recursos do computador e permitem a execução de programas.",

        topics: [
            "Funções de um sistema operacional.",
            "Gerenciamento de arquivos e pastas.",
            "Processos e memória.",
            "Instalação e configuração de sistemas.",
            "Permissões e gerenciamento de recursos."
        ],

        importance:
            "Ajuda a entender o funcionamento dos computadores e a relação entre hardware e software.",

        image: "assets/img-disciplinas/SOimg.jpg"
    },


    banco: {
        number: "MATÉRIA 07",
        title: "Banco de Dados",

        description:
            "Aprenda a estruturar, armazenar e consultar informações de maneira organizada, utilizando conceitos de bancos de dados.",

        topics: [
            "Conceitos de bancos de dados.",
            "Tabelas, registros e campos.",
            "Relacionamentos entre tabelas.",
            "Comandos SQL.",
            "Operações de cadastro, consulta, atualização e exclusão."
        ],

        importance:
            "É essencial para desenvolver sistemas capazes de armazenar e gerenciar informações.",

        image: "assets/img-disciplinas/BDimg.jpg"
    },


    design: {
        number: "MATÉRIA 08",
        title: "Design Gráfico",

        description:
            "Explore os princípios da comunicação visual e aprenda a organizar elementos gráficos para transmitir ideias e mensagens.",

        topics: [
            "Teoria das cores.",
            "Tipografia e composição.",
            "Elementos visuais e identidade gráfica.",
            "Edição e tratamento de imagens.",
            "Criação de peças gráficas."
        ],

        importance:
            "Desenvolve a capacidade de comunicar ideias visualmente por meio de projetos criativos.",

        image: "assets/img-disciplinas/DSGimg.jpg"
    },


    redes: {
        number: "MATÉRIA 09",
        title: "Redes de Computadores",

        description:
            "Conheça os fundamentos da comunicação entre dispositivos e entenda como funcionam as redes utilizadas no dia a dia.",

        topics: [
            "Conceitos de redes de computadores.",
            "Tipos e topologias de redes.",
            "Endereçamento IP.",
            "Equipamentos de rede.",
            "Protocolos de comunicação."
        ],

        importance:
            "É fundamental para compreender como dispositivos e sistemas se conectam e compartilham informações.",

        image: "assets/img-disciplinas/RDimg.jpg"
    }

};




const modal = document.querySelector("#subjectModal");

const closeButton = document.querySelector("#closeModal");

const modalNumber = document.querySelector("#modalNumber");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalTopics = document.querySelector("#modalTopics");
const modalImportance = document.querySelector("#modalImportance");

const modalImage = document.querySelector("#modalImage");
const imagePlaceholder = document.querySelector("#imagePlaceholder");

let previousFocus = null;




function openModal(subjectKey, button) {

    const subject = subjects[subjectKey];

    if (!subject) return;

    previousFocus = button;

   
    modalNumber.textContent = subject.number;
    modalTitle.textContent = subject.title;
    modalDescription.textContent = subject.description;
    modalImportance.textContent = subject.importance;

  
    modalTopics.innerHTML = "";

  
    subject.topics.forEach(topic => {

        const item = document.createElement("li");

        item.textContent = topic;

        modalTopics.appendChild(item);

    });


  
    if (subject.image) {

        modalImage.src = subject.image;
        modalImage.alt = `Imagem ilustrativa de ${subject.title}`;

        modalImage.hidden = false;
        imagePlaceholder.hidden = true;

    } else {

        modalImage.removeAttribute("src");
        modalImage.alt = "";

        modalImage.hidden = true;
        imagePlaceholder.hidden = false;

    }


    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton.focus();

}



function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (previousFocus) {
        previousFocus.focus();
    }

}




document.querySelectorAll("[data-subject]").forEach(button => {

    button.addEventListener("click", () => {

        const subjectKey = button.dataset.subject;

        openModal(subjectKey, button);

    });

});





closeButton.addEventListener("click", closeModal);



modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        modal.classList.contains("active")
    ) {
        closeModal();
    }

});
