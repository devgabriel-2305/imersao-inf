const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ============================================================
   SCROLL SUAVE (Lenis) — rolagem do mouse + links âncora
   ============================================================ */
let lenis = null;

(() => {
  if (typeof Lenis === "undefined" || prefersReduced) return;

  lenis = new Lenis({
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Links do menu e botões que apontam para #seção
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute("href");
    if (hash.length < 2) return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();

    const distance = Math.abs(target.getBoundingClientRect().top);
    const duration = Math.min(2.4, Math.max(1.2, distance / 1600 + 0.9));

    lenis.scrollTo(target, { offset: 0, duration });
    history.pushState(null, "", hash);
  });
})();


/* ============================================================
   NAVBAR + TERMINAL
   ============================================================ */
(() => {
  const reduceMotion = prefersReduced;

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


/* ============================================================
   DISCIPLINAS (dados do modal)
   ============================================================ */
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


/* ============================================================
   MODAL DAS DISCIPLINAS
   ============================================================ */
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
    if (lenis) lenis.stop();

    closeButton.focus();
}


function closeModal() {

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
    if (lenis) lenis.start();

    if (previousFocus) {
        previousFocus.focus();
    }
}


document.querySelectorAll("[data-subject]").forEach(button => {
    button.addEventListener("click", () => {
        openModal(button.dataset.subject, button);
    });
});

closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});


/* ============================================================
   ÁREAS DE ATUAÇÃO (abas interativas)
   ============================================================ */
const areas = [
    {
        key: "dev",
        icon: "bi-code-slash",
        name: "Desenvolvimento de software",
        short: "Sites, sistemas e aplicativos",
        glyph: "</>",
        lead: "Transforme ideias em sites, sistemas e aplicativos que as pessoas usam de verdade.",
        tasks: [
            "Criar páginas e interfaces que funcionam em qualquer tela.",
            "Programar a lógica de sistemas, formulários e cadastros.",
            "Conectar o site a um banco de dados.",
            "Corrigir erros e melhorar o que já existe."
        ],
        tools: ["HTML e CSS", "JavaScript", "Lógica de programação", "SQL", "Controle de versão (Git)"],
        roles: ["Desenvolvedor web júnior", "Programador front-end", "Estagiário de desenvolvimento", "Freelancer de sites"],
        courses: ["logica", "html", "web"]
    },
    {
        key: "redes",
        icon: "bi-diagram-3",
        name: "Redes e infraestrutura",
        short: "Conexões estáveis e seguras",
        glyph: "NET",
        lead: "Faça computadores, celulares e servidores conversarem entre si com estabilidade e segurança.",
        tasks: [
            "Montar e configurar redes cabeadas e Wi-Fi.",
            "Configurar roteadores, switches e endereçamento IP.",
            "Descobrir por que a conexão caiu e resolver.",
            "Documentar como a rede está organizada."
        ],
        tools: ["TCP/IP", "Roteadores e switches", "Cabeamento", "Wi-Fi", "Simuladores de rede"],
        roles: ["Técnico de redes", "Auxiliar de infraestrutura de TI", "Instalador de redes", "Estagiário de infraestrutura"],
        courses: ["redes", "sistemas"]
    },
    {
        key: "suporte",
        icon: "bi-headset",
        name: "Suporte e manutenção",
        short: "Quem resolve o problema",
        glyph: "CPU",
        lead: "Seja a pessoa que resolve quando o computador não liga, o sistema trava ou a impressora some da rede.",
        tasks: [
            "Diagnosticar falhas de hardware e de software.",
            "Montar, desmontar e fazer manutenção preventiva.",
            "Instalar e configurar sistemas operacionais.",
            "Atender e orientar quem usa os equipamentos."
        ],
        tools: ["Windows e Linux", "Diagnóstico de hardware", "Formatação e backup", "Atendimento de chamados"],
        roles: ["Técnico de suporte", "Técnico de manutenção de computadores", "Atendente de help desk", "Estagiário de suporte de TI"],
        courses: ["hardware", "sistemas"]
    },
    {
        key: "dados",
        icon: "bi-database",
        name: "Banco de dados",
        short: "Informação organizada",
        glyph: "SQL",
        lead: "Organize informações para que empresas encontrem, usem e protejam o que sabem.",
        tasks: [
            "Criar tabelas e relacionar as informações entre si.",
            "Consultar dados com comandos SQL.",
            "Cadastrar, atualizar e excluir registros.",
            "Fazer cópias de segurança (backup)."
        ],
        tools: ["SQL", "Modelagem de dados", "Tabelas e relacionamentos", "Backup"],
        roles: ["Auxiliar de banco de dados", "Assistente de TI", "Estagiário de dados", "Apoio em sistemas de gestão"],
        courses: ["banco", "web"]
    },
    {
        key: "design",
        icon: "bi-palette",
        name: "Design e criação digital",
        short: "Ideias que viram imagem",
        glyph: "DESIGN",
        lead: "Dê forma visual às ideias: marcas, peças para redes sociais e interfaces que comunicam com clareza.",
        tasks: [
            "Criar peças gráficas e identidades visuais.",
            "Editar e tratar imagens.",
            "Escolher cores e tipografia com intenção.",
            "Preparar artes para a web e para impressão."
        ],
        tools: ["Teoria das cores", "Tipografia", "Composição", "Edição de imagens", "Identidade visual"],
        roles: ["Designer gráfico júnior", "Criador de conteúdo visual", "Auxiliar de criação", "Freelancer de artes digitais"],
        courses: ["design", "html"]
    },
    {
        key: "automacao",
        icon: "bi-robot",
        name: "Automação e robótica",
        short: "Máquinas que sentem e agem",
        glyph: "ROBOT",
        lead: "Una eletrônica, programação e mecânica para criar máquinas que sentem, decidem e agem.",
        tasks: [
            "Montar circuitos com sensores e atuadores.",
            "Programar placas como o Arduino.",
            "Automatizar tarefas repetitivas.",
            "Testar e ajustar protótipos."
        ],
        tools: ["Arduino", "Sensores e atuadores", "Circuitos eletrônicos", "Controle e automação"],
        roles: ["Auxiliar de automação", "Técnico em prototipagem", "Estagiário de eletrônica", "Monitor de oficina maker"],
        courses: ["robotica", "logica"]
    }
];

(() => {
    const tabsEl = document.getElementById("areasTabs");
    const panel = document.getElementById("areaPanel");
    if (!tabsEl || !panel) return;

    const body = document.getElementById("areaBody");
    const glyph = document.getElementById("areaGlyph");
    const title = document.getElementById("areaTitle");
    const lead = document.getElementById("areaLead");
    const tasks = document.getElementById("areaTasks");
    const tools = document.getElementById("areaTools");
    const roles = document.getElementById("areaRoles");
    const courses = document.getElementById("areaCourses");

    let current = 0;

    const tabs = areas.map((area, index) => {
        const tab = document.createElement("button");

        tab.type = "button";
        tab.className = "area-tab";
        tab.id = `area-tab-${area.key}`;
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", "areaPanel");
        tab.innerHTML =
            `<i class="bi ${area.icon}" aria-hidden="true"></i>` +
            `<span><strong>${area.name}</strong><small>${area.short}</small></span>`;

        tab.addEventListener("click", () => select(index));
        tabsEl.appendChild(tab);

        return tab;
    });

    const fillList = (list, items) => {
        list.innerHTML = "";
        items.forEach(text => {
            const li = document.createElement("li");
            li.textContent = text;
            list.appendChild(li);
        });
    };

    function select(index, animate = true) {
        const area = areas[index];
        current = index;

        tabs.forEach((tab, i) => {
            const active = i === index;
            tab.setAttribute("aria-selected", String(active));
            tab.tabIndex = active ? 0 : -1;
        });

        panel.setAttribute("aria-labelledby", tabs[index].id);

        glyph.textContent = area.glyph;
        title.textContent = area.name;
        lead.textContent = area.lead;

        fillList(tasks, area.tasks);
        fillList(tools, area.tools);
        fillList(roles, area.roles);

        courses.innerHTML = "";
        area.courses.forEach(key => {
            const subject = subjects[key];
            if (!subject) return;

            const button = document.createElement("button");
            button.type = "button";
            button.className = "area-course";
            button.innerHTML = `${subject.title} <span aria-hidden="true">↗</span>`;
            button.addEventListener("click", () => openModal(key, button));
            courses.appendChild(button);
        });

        if (animate && !prefersReduced) {
            body.classList.remove("swap");
            void body.offsetWidth;
            body.classList.add("swap");
        }

        // No mobile as abas rolam na horizontal: centraliza a aba ativa
        if (tabsEl.scrollWidth > tabsEl.clientWidth) {
            const tab = tabs[index];
            tabsEl.scrollTo({
                left: tab.offsetLeft - (tabsEl.clientWidth - tab.offsetWidth) / 2,
                behavior: prefersReduced ? "auto" : "smooth"
            });
        }
    }

    tabsEl.addEventListener("keydown", (e) => {
        const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        let next = null;

        if (step) next = (current + step + areas.length) % areas.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = areas.length - 1;

        if (next === null) return;

        e.preventDefault();
        select(next);
        tabs[next].focus();
    });

    tabsEl.style.position = "relative";
    select(0, false);
})();


/* ============================================================
   CARROSSEL MOBILE (Disciplinas e Projetos)
   Rolagem nativa com scroll-snap + setas e indicadores
   ============================================================ */
function createCarousel(track, label) {
    if (!track) return;

    const items = [...track.children];
    if (items.length < 2) return;

    track.classList.add("carousel-track");
    track.setAttribute("role", "region");
    track.setAttribute("aria-label", label);
    track.tabIndex = 0;

    const ui = document.createElement("div");
    ui.className = "carousel-ui";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "carousel-btn";
    prev.setAttribute("aria-label", "Anterior");
    prev.innerHTML = '<i class="bi bi-chevron-left" aria-hidden="true"></i>';

    const next = document.createElement("button");
    next.type = "button";
    next.className = "carousel-btn";
    next.setAttribute("aria-label", "Próximo");
    next.innerHTML = '<i class="bi bi-chevron-right" aria-hidden="true"></i>';

    const dotsEl = document.createElement("div");
    dotsEl.className = "carousel-dots";

    const dots = items.map((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Ir para o item ${i + 1} de ${items.length}`);
        dot.addEventListener("click", () => goTo(i));
        dotsEl.appendChild(dot);
        return dot;
    });

    ui.append(prev, dotsEl, next);
    track.after(ui);

    const maxScroll = () => track.scrollWidth - track.clientWidth;
    const padLeft = () => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;

    const leftOf = (el) =>
        track.scrollLeft +
        el.getBoundingClientRect().left -
        track.getBoundingClientRect().left -
        padLeft();

    const activeIndex = () => {
        if (track.scrollLeft >= maxScroll() - 4) return items.length - 1;

        let best = 0;
        let bestDistance = Infinity;

        items.forEach((el, i) => {
            const distance = Math.abs(leftOf(el) - track.scrollLeft);
            if (distance < bestDistance) {
                bestDistance = distance;
                best = i;
            }
        });

        return best;
    };

    function goTo(index) {
        const i = Math.max(0, Math.min(items.length - 1, index));
        // limita ao scroll máximo para não travar nos últimos cards
        const left = Math.max(0, Math.min(leftOf(items[i]), maxScroll()));
        track.scrollTo({
            left,
            behavior: prefersReduced ? "auto" : "smooth"
        });
    }

    let ticking = false;

    const update = () => {
        const active = activeIndex();

        dots.forEach((dot, i) => {
            dot.classList.toggle("is-active", i === active);
            if (i === active) dot.setAttribute("aria-current", "true");
            else dot.removeAttribute("aria-current");
        });

        prev.disabled = track.scrollLeft <= 4;
        next.disabled = track.scrollLeft >= maxScroll() - 4;
        ticking = false;
    };

    track.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }, { passive: true });

    window.addEventListener("resize", update);

    prev.addEventListener("click", () => goTo(activeIndex() - 1));
    next.addEventListener("click", () => goTo(activeIndex() + 1));

    update();
}

createCarousel(document.getElementById("subjectsTrack"), "Disciplinas do curso");
createCarousel(document.getElementById("projectsTrack"), "Projetos dos alunos");