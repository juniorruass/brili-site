// Efeitos de fundo e parallax (prévia)
(() => {
  const CORES = ["#F2A7B8", "#D94F6E", "#E7B75F", "#B9D6A3", "#4A2618", "#F7C9D4"];
  const ESTRELA = "M0,-10 C1,-2 2,-1 10,0 C2,1 1,2 0,10 C-1,2 -2,1 -10,0 C-2,-1 -1,-2 0,-10Z";
  const CORACAO = "M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z";
  const celular = innerWidth < 700;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  function camada(secao) {
    const c = document.createElement("div");
    c.className = "efx-camada";
    c.setAttribute("aria-hidden", "true");
    secao.prepend(c);
    return c;
  }

  // Chuva de granulado na hero
  const hero = document.querySelector(".hero");
  const chuva = camada(hero);
  const dist = hero.offsetHeight + 80;
  for (let i = 0; i < (celular ? 12 : 22); i++) {
    const tipo = Math.random();
    const el = document.createElement("span");
    el.className = "confeito" + (tipo > .88 ? " confeito--estrela" : tipo > .68 ? " confeito--bola" : "");
    if (tipo > .88) el.innerHTML = `<svg viewBox="-10 -10 20 20"><path d="${ESTRELA}"/></svg>`;
    const dur = rnd(14, 26);
    el.style.cssText = `--x:${rnd(0, 100)}%;--cor:${pick(CORES)};--dur:${dur}s;--delay:${-rnd(0, dur)}s;--r0:${rnd(0, 180)}deg;--dx:${rnd(-60, 60)}px;--dist:${dist}px`;
    chuva.appendChild(el);
  }

  // Corações e estrelinhas subindo
  ["#sabores", "#personalizados"].forEach(sel => {
    const secao = document.querySelector(sel);
    const c = camada(secao);
    const alt = secao.offsetHeight + 80;
    for (let i = 0; i < (celular ? 5 : 9); i++) {
      const coracao = i % 3 !== 2;
      const el = document.createElement("span");
      el.className = "flutuante";
      el.innerHTML = coracao ? `<svg viewBox="0 0 24 24"><path d="${CORACAO}"/></svg>` : `<svg viewBox="-10 -10 20 20"><path d="${ESTRELA}"/></svg>`;
      const dur = rnd(16, 26);
      el.style.cssText = `--x:${rnd(2, 96)}%;--tam:${rnd(12, 24)}px;--cor:${coracao ? pick(["#D94F6E", "#E7A3B3", "#F2A7B8"]) : "#E7B75F"};--dur:${dur}s;--delay:${-rnd(0, dur)}s;--dx:${rnd(-40, 40)}px;--dist:${alt}px`;
      c.appendChild(el);
    }
  });

  // Brilhinhos nos depoimentos
  const depo = document.querySelector("#depoimentos");
  const cb = camada(depo);
  for (let i = 0; i < (celular ? 10 : 18); i++) {
    const el = document.createElement("span");
    el.className = "brilho";
    el.style.cssText = `--x:${rnd(2, 98)}%;--y:${rnd(8, 95)}%;--tam:${rnd(3, 6)}px;--dur:${rnd(2.5, 5)}s;--delay:${-rnd(0, 5)}s`;
    cb.appendChild(el);
  }

  // Rolagem suave com inércia (Lenis): a página desliza e desacelera macio, em vez de andar aos trancos
  if (window.Lenis) {
    document.documentElement.style.scrollBehavior = "auto";
    const lenis = new Lenis({ duration: 1.25, easing: t => 1 - Math.pow(1 - t, 4), anchors: { offset: -20 } });
    const quadro = tempo => { lenis.raf(tempo); requestAnimationFrame(quadro); };
    requestAnimationFrame(quadro);
  }
})();
