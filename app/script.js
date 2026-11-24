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