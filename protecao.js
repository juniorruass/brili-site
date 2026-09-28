// Proteção contra cópia: dificulta salvar imagens e copiar conteúdo pelo caminho comum.
// Não é à prova de tudo (print de tela e código-fonte sempre existem), mas barra a cópia casual.
(() => {
  const bloquear = e => e.preventDefault();

  // Botão direito, arrastar e copiar
  document.addEventListener("contextmenu", bloquear);
  document.addEventListener("dragstart", bloquear);
  document.addEventListener("copy", bloquear);
  document.addEventListener("cut", bloquear);
  document.addEventListener("selectstart", e => {
    if (!e.target.closest?.("input, textarea")) e.preventDefault();
  });

  // Atalhos de salvar, imprimir, ver código e ferramentas do desenvolvedor
  document.addEventListener("keydown", e => {
    const k = e.key.toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;
    if (
      k === "f12" ||
      (ctrl && ["s", "u", "p", "c", "a"].includes(k)) ||
      (ctrl && e.shiftKey && ["i", "j", "c"].includes(k))
    ) e.preventDefault();
  });
})();
