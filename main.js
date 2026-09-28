// Número da Brilí (DDI + DDD + número, só dígitos)
const WHATSAPP = "5573988208921";

const MENSAGENS = {
  pedido: "Oi, Brilí! Vim pelo site e quero fazer um pedido.",
  tradicionais: "Oi, Brilí! Vim pelo site e quero encomendar docinhos tradicionais.",
  gourmet: "Oi, Brilí! Vim pelo site e quero encomendar docinhos gourmet.",
  copinhos: "Oi, Brilí! Vim pelo site e quero encomendar copinhos.",
  personalizado: "Oi, Brilí! Vim pelo site e quero doces personalizados pra minha festa.",
  oi: "Oi, Brilí! Vim pelo site e quero saber mais sobre os doces.",
};

const CARDAPIO = [
  { id: "tradicionais", nome: "Tradicionais", grupos: [
    { sabores: ["Brigadeiro preto", "Brigadeiro branco", "Ninho", "Churros", "Coco", "Bicho de pé", "Coco queimado", "Paçoca", "Dois amores", "Cajuzinho"] },
  ] },
  { id: "gourmet", nome: "Gourmet", obs: "Doces de fruta feitos com a própria fruta", grupos: [
    { sabores: ["Ferrero Rocher", "Caramelo salgado", "Ninho com Nutella", "Oreo", "Morango com Nutella", "Cheesecake com morango", "Limão", "Surpresa de uva", "Maracujá", "Confetes"] },
  ] },
  { id: "copinhos", nome: "Copinhos", grupos: [
    { titulo: "Copinho", sabores: ["Chocolate preto", "Chocolate branco", "Acrílico"] },
    { titulo: "Recheios gourmet", sabores: ["Maracujá", "Limão", "Oreo", "Ninho com Nutella", "Surpresa de uva", "Cheesecake", "Morango com Nutella", "Morango"] },
    { titulo: "Recheios tradicionais", sabores: ["Brigadeiro preto", "Brigadeiro branco", "Ninho", "Coco", "Churros", "Paçoca"] },
  ] },
];

// Fotos redondas das seções: salvar em img/sabores/ e img/personalizados/ (1.jpg, 2.jpg, 3.jpg)
// Enquanto a foto não existe, o círculo mostra o docinho desenhado
const BOLHAS = {
  sabores: {
    fundo: "#FFF6EC", tag: "feitos com carinho",
    fotos: [
      { arq: "1.jpg", cor: "#FBE3E8", doce: "brig", estilo: "--cup:#F2A7B8;--cup-line:#C9657F" },
      { arq: "2.jpg", cor: "#FFEFD9", doce: "beijinho" },
      { arq: "3.jpg", cor: "#F7C9D4", doce: "casadinho", estilo: "--cup:#fff;--cup-line:#D9CFC4" },
    ],
  },
  personalizados: {
    fundo: "#F7C9D4", tag: "o seu tema aqui",
    fotos: [
      { arq: "1.jpg", cor: "#FFF6EC", doce: "cupcake", estilo: "--frost:#FBE3E8;--frost-line:#E7A3B3" },
      { arq: "2.jpg", cor: "#EAF3E1", doce: "cupcake", estilo: "--frost:#DCEBCF;--frost-line:#9DBF86" },
      { arq: "3.jpg", cor: "#FBE3E8", doce: "brig", estilo: "--gr:#D94F6E;--gr2:#9DBF86;--cup:#fff;--cup-line:#D9CFC4" },
    ],
  },
};

// Carrossel de trabalhos: por enquanto usa as fotos de sabores e personalizados, intercaladas
const TRABALHOS = [
  "sabores/1.jpg", "personalizados/1.jpg", "sabores/2.jpg",
  "personalizados/2.jpg", "sabores/3.jpg", "personalizados/3.jpg",
];

// Prints dos depoimentos: salvar em img/depoimentos/ e listar aqui, na ordem em que devem aparecer
const DEPOIMENTOS = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Gerador pseudoaleatório com semente: cada calda tem sempre o mesmo formato
function rng(seed) {
  let s = seed % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/* ---------- Ilustrações dos doces (provisórias até as fotos) ---------- */

const ESTRELA = "M0,-10 C1,-2 2,-1 10,0 C2,1 1,2 0,10 C-1,2 -2,1 -10,0 C-2,-1 -1,-2 0,-10Z";

function forminha() {
  let topo = "M12,64";
  for (let i = 0; i < 12; i++) topo += " a4,4 0 0 1 8,0";
  let pregas = "";
  for (let i = 0; i <= 12; i++) {
    const x1 = 12 + 8 * i, x2 = 26 + (68 / 12) * i;
    pregas += `<line x1="${x1}" y1="66" x2="${x2}" y2="104"/>`;
  }
  return `<path d="${topo} L94,104 L26,104 Z" style="fill:var(--cup,#F2A7B8)"/>
    <g style="stroke:var(--cup-line,#C9657F)" stroke-width="1.4" opacity=".45">${pregas}</g>
    <path d="M24,98 L96,98 L94,104 L26,104Z" style="fill:var(--cup-line,#C9657F)" opacity=".25"/>`;
}

function granulado(seed, n, cores) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 34;
    const x = 60 + Math.cos(a) * d, y = 50 + Math.sin(a) * d;
    if (y > 62) continue;
    const c = cores[i % cores.length];
    out += `<rect x="${(x - 3.5).toFixed(1)}" y="${(y - 1.3).toFixed(1)}" width="7" height="2.6" rx="1.3" style="fill:${c}" transform="rotate(${Math.round(r() * 180)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }
  return out;
}

function brilhoBola() {
  return `<ellipse cx="44" cy="32" rx="12" ry="7" fill="#fff" opacity=".22" transform="rotate(-35 44 32)"/>`;
}

function cupcake() {
  let listras = "";
  for (let i = 0; i < 9; i++) {
    const x1 = 22 + i * 9.5, x2 = 32 + i * 7.2;
    listras += `<line x1="${x1}" y1="92" x2="${x2}" y2="142"/>`;
  }
  return `
    <line x1="60" y1="46" x2="60" y2="10" stroke="#C9A996" stroke-width="2.5"/>
    <path d="${ESTRELA}" transform="translate(60 12) scale(1.3)" fill="#E7B75F"/>
    <path d="M18,92 L102,92 L92,142 L28,142 Z" style="fill:var(--cup,#fff)"/>
    <g style="stroke:var(--frost-line,#E7A3B3)" stroke-width="1.6" opacity=".5">${listras}</g>
    <ellipse cx="60" cy="90" rx="46" ry="12" fill="#C98B5A"/>
    <path d="M16,88 C14,70 30,66 38,68 C40,54 80,54 82,68 C92,64 106,72 104,88 C90,96 30,96 16,88Z" style="fill:var(--frost,#FBE3E8)"/>
    <path d="M32,70 C34,58 50,52 60,56 C70,52 88,58 86,72 C74,78 44,78 32,70Z" style="fill:var(--frost,#FBE3E8)"/>
    <path d="M44,58 C46,46 74,46 76,58 C68,62 52,62 44,58Z" style="fill:var(--frost,#FBE3E8)"/>
    <g fill="none" style="stroke:var(--frost-line,#E7A3B3)" stroke-width="1.6" opacity=".7" stroke-linecap="round">
      <path d="M24,84 C44,90 76,90 96,84"/><path d="M38,70 C52,75 70,75 82,70"/>
    </g>
    <ellipse cx="46" cy="64" rx="8" ry="4" fill="#fff" opacity=".45" transform="rotate(-20 46 64)"/>`;
}

function montarSprites() {
  const defs = document.getElementById("sprites");
  const sym = (id, vb, inner) => `<symbol id="${id}" viewBox="${vb}">${inner}</symbol>`;

  const brig = `<circle cx="60" cy="50" r="40" style="fill:var(--ball,#5A2D1A)"/>
    ${granulado(11, 60, ["var(--gr,#2B140B)", "var(--gr2,#3A1C10)"])}${brilhoBola()}${forminha()}`;

  const r = rng(5);
  let coco = "";
  for (let i = 0; i < 38; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 35;
    const x = 60 + Math.cos(a) * d, y = 50 + Math.sin(a) * d;
    if (y > 62) continue;
    coco += `<path d="M${x.toFixed(1)},${y.toFixed(1)} l${(r() * 6 - 3).toFixed(1)},${(r() * 4 - 2).toFixed(1)}" stroke="${i % 3 ? "#fff" : "#EADBC6"}" stroke-width="2" stroke-linecap="round"/>`;
  }
  const cravo = `<g transform="translate(60 12)"><circle r="3.2" fill="#3A1C10"/>${[0, 90, 180, 270].map(g => `<ellipse cx="0" cy="-4" rx="1.6" ry="3" fill="#3A1C10" transform="rotate(${g + 45})"/>`).join("")}</g>`;
  const beijinho = `<circle cx="60" cy="50" r="40" fill="#FBF1E4"/>${coco}${cravo}
    <ellipse cx="44" cy="32" rx="12" ry="7" fill="#fff" opacity=".5" transform="rotate(-35 44 32)"/>${forminha()}`;

  const casadinho = `<path d="M60,10 A40,40 0 0 0 60,90 Z" fill="#5A2D1A"/><path d="M60,10 A40,40 0 0 1 60,90 Z" fill="#FBF1E4"/>
    <circle cx="60" cy="50" r="40" fill="none" stroke="#3A1C10" stroke-opacity=".08" stroke-width="2"/>
    ${granulado(19, 26, ["#fff", "#3A1C10"])}
    ${brilhoBola()}${forminha()}`;

  const prato = `<ellipse cx="200" cy="64" rx="196" ry="52" fill="#E9A0B1"/>
    <ellipse cx="200" cy="56" rx="192" ry="48" fill="#F9D6DE"/>
    <ellipse cx="200" cy="56" rx="150" ry="32" fill="#F3BFCB" opacity=".55"/>
    <path d="M40,40 C80,20 160,12 220,12" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/>`;

  defs.innerHTML = `
    <radialGradient id="brilho" cx="35%" cy="30%" r="70%">
      <stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    ${sym("brig", "0 0 120 110", brig)}
    ${sym("beijinho", "0 0 120 110", beijinho)}
    ${sym("casadinho", "0 0 120 110", casadinho)}
    ${sym("cupcake", "0 0 120 150", cupcake())}
    ${sym("prato", "0 0 400 120", prato)}
    ${sym("estrela", "-10 -10 20 20", `<path d="${ESTRELA}"/>`)}`;
}

/* ---------- Calda escorrendo ---------- */

function calda(el, animar) {
  el.querySelector(":scope > .drip")?.remove();
  const W = el.clientWidth;
  const cor = el.dataset.drip, seed = +el.dataset.seed;
  const maxL = (+el.dataset.len || 60) * Math.max(0.5, Math.min(1, W / 1100));
  const base = 12, H = base + maxL + 50;
  const r = rng(seed);

  let gotas = "";
  let x = 16 + r() * 50;
  let i = 0;
  while (x < W - 16) {
    const rad = 7 + r() * 11;
    const L = rad * 1.9 + Math.pow(r(), 1.7) * maxL;
    const y0 = base - 2, fundo = base + L - rad;
    let d = `M${x - rad * 2.4},${y0} C${x - rad},${y0} ${x - rad},${base + rad * 0.5} ${x - rad},${fundo}`;
    d += ` A${rad},${rad} 0 0 0 ${x + rad},${fundo}`;
    d += ` C${x + rad},${base + rad * 0.5} ${x + rad},${y0} ${x + rad * 2.4},${y0} Z`;
    let brilho = "";
    if (L > rad * 3) {
      brilho = `<path d="M${x - rad * 0.45},${base + rad} L${x - rad * 0.45},${fundo - rad * 0.3}" stroke="#fff" stroke-opacity=".22" stroke-width="${(rad * 0.32).toFixed(1)}" stroke-linecap="round"/>`;
    }
    const dur = (0.9 + r() * 1.3).toFixed(2), delay = (0.15 + r() * 0.7).toFixed(2);
    gotas += `<g class="d" style="--l:${Math.round(L)};--dur:${dur}s;--delay:${delay}s"><path d="${d}" fill="${cor}"/>${brilho}</g>`;
    x += rad * 2 + 26 + r() * 130;
    i++;
  }

  // Borda de cima levemente irregular, como calda de verdade
  let ondas = "";
  for (let ox = 0; ox < W; ox += 60 + r() * 60) {
    ondas += `<ellipse cx="${ox.toFixed(0)}" cy="${base}" rx="${(40 + r() * 40).toFixed(0)}" ry="${(2 + r() * 4).toFixed(1)}" fill="${cor}"/>`;
  }

  const svg = `<svg class="drip ${animar ? "pour" : "done"}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">
    ${gotas}<rect x="0" y="0" width="${W}" height="${base}" fill="${cor}"/>${ondas}</svg>`;
  el.insertAdjacentHTML("afterbegin", svg);
}

function todasCaldas(primeiraVez) {
  document.querySelectorAll("[data-drip]").forEach(el => {
    calda(el, primeiraVez && !reduz && el.hasAttribute("data-pour"));
  });
}

/* ---------- WhatsApp ---------- */

function linkWa(texto) {
  return `https://wa.me/${WHATSAPP}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;
}

function linksWa() {
  document.querySelectorAll(".js-wa").forEach(a => {
    a.href = linkWa(MENSAGENS[a.dataset.msg] || MENSAGENS.oi);
    a.target = "_blank"; a.rel = "noopener";
  });
}

/* ---------- Depoimentos em carrossel infinito ---------- */

function print(nome, i, copia) {
  return `<img class="print" src="img/depoimentos/${nome}" data-n="${i + 1}" alt="${copia ? "" : `Depoimento de cliente ${i + 1}`}"${copia ? ' aria-hidden="true"' : ""}>`;
}

// Enquanto o print não existe na pasta, mostra um espaço reservado com o nome do arquivo esperado
function reservado(img) {
  const box = document.createElement("div");
  box.className = "print print--vazio";
  if (img.hasAttribute("aria-hidden")) box.setAttribute("aria-hidden", "true");
  box.innerHTML = `<span><strong>Print ${img.dataset.n}</strong>${img.getAttribute("src")}</span>`;
  img.replaceWith(box);
}

// Repete a lista até uma volta ficar maior que a tela; sem isso, em telas largas a fileira acaba antes do loop
function repetir(lista, larguraItem) {
  const tela = Math.max(innerWidth, screen.width || 0, 1600);
  const vezes = Math.max(1, Math.ceil((tela * 1.2) / (lista.length * larguraItem)));
  return Array.from({ length: vezes }, () => lista).flat();
}

function montarDepoimentos() {
  // Uma volta completa + a mesma volta de novo: quando a primeira sai, a segunda está no mesmo lugar e o loop não "pula"
  const el = document.getElementById("fila-depoimentos");
  const volta = repetir(DEPOIMENTOS, 250);
  const n = DEPOIMENTOS.length;
  el.innerHTML = [...volta, ...volta].map((arq, i) => print(arq, i % n, i >= n)).join("");
  el.querySelectorAll("img").forEach(img => {
    if (img.complete && !img.naturalWidth) reservado(img);
    else img.addEventListener("error", () => reservado(img));
  });
  el.style.setProperty("--tempo", `${volta.length * 7}s`);
}

/* ---------- Carrossel de trabalhos ---------- */

function montarTrabalhos() {
  // Mesmo esquema dos depoimentos; só a primeira sequência fica visível pra leitores de tela
  const el = document.getElementById("fila-trabalhos");
  const n = TRABALHOS.length;
  const fig = (arq, i) => `<figure class="redonda"${i >= n ? ' aria-hidden="true"' : ""}>
    <img src="img/${arq}" alt="${i >= n ? "" : `Trabalho da Brilí ${i + 1}`}"></figure>`;
  const volta = repetir(TRABALHOS, 245);
  el.innerHTML = [...volta, ...volta].map(fig).join("");
  el.style.setProperty("--tempo", `${volta.length * 8}s`);
}

/* ---------- Fotos redondas flutuando ---------- */

function montarBolhas() {
  document.querySelectorAll("[data-bolhas]").forEach(el => {
    const nome = el.dataset.bolhas, cfg = BOLHAS[nome];
    const estrela = cor => `<svg viewBox="-10 -10 20 20"><path d="${ESTRELA}" fill="${cor}"/></svg>`;
    el.style.setProperty("--fundo", cfg.fundo);
    el.innerHTML = `<span class="bolhas__fundo"></span>
      ${cfg.fotos.map((f, i) => {
        const cup = f.doce === "cupcake";
        const desenho = cup
          ? `<use href="#cupcake" x="25" y="14" width="50" height="62.5" style="${f.estilo || ""}"/>`
          : `<use href="#${f.doce}" x="16" y="20" width="68" height="62" style="${f.estilo || ""}"/>`;
        return `<figure class="bolha bolha--${i + 1}" style="--cor:${f.cor}">
          <img src="img/${nome}/${f.arq}" alt="">
          <svg viewBox="0 0 100 100">${desenho}</svg>
        </figure>`;
      }).join("")}
      <span class="bolhas__tag">${cfg.tag}</span>
      <span class="bolhas__enfeite bolhas__enfeite--1">${estrela("#D94F6E")}</span>
      <span class="bolhas__enfeite bolhas__enfeite--2">${estrela("#E7B75F")}</span>
      <span class="bolhas__enfeite bolhas__enfeite--3">${estrela("#D94F6E")}</span>`;

    el.querySelectorAll(".bolha img").forEach(img => {
      const ok = () => img.parentElement.classList.add("tem-img");
      if (img.complete && img.naturalWidth) ok();
      else img.addEventListener("load", ok);
    });
  });
}

/* ---------- Sabores em abas ---------- */

function montarSabores() {
  const abas = document.getElementById("abas");
  const paineis = document.getElementById("paineis");
  const pedir = document.getElementById("pedir-aba");

  abas.innerHTML = CARDAPIO.map((c, i) =>
    `<button class="aba" role="tab" id="aba-${c.id}" aria-controls="painel-${c.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${c.nome}</button>`).join("");

  paineis.innerHTML = CARDAPIO.map((c, i) => `
    <div class="painel" role="tabpanel" id="painel-${c.id}" aria-labelledby="aba-${c.id}"${i ? " hidden" : ""}>
      ${c.grupos.map(g => `${g.titulo ? `<h3>${g.titulo}</h3>` : ""}
        <ul class="sabores">${g.sabores.map(s => `<li>${s}</li>`).join("")}</ul>`).join("")}
      ${c.obs ? `<p class="obs">${c.obs}</p>` : ""}
    </div>`).join("");

  function abrir(i) {
    abas.querySelectorAll(".aba").forEach((b, j) => {
      b.setAttribute("aria-selected", i === j);
      b.tabIndex = i === j ? 0 : -1;
    });
    paineis.querySelectorAll(".painel").forEach((p, j) => { p.hidden = i !== j; });
    pedir.textContent = `Pedir ${CARDAPIO[i].nome.toLowerCase()}`;
    pedir.href = linkWa(MENSAGENS[CARDAPIO[i].id]);
  }

  abas.addEventListener("click", e => {
    const b = e.target.closest(".aba");
    if (b) abrir([...abas.children].indexOf(b));
  });
  // Setas do teclado trocam de aba
  abas.addEventListener("keydown", e => {
    const atual = [...abas.children].indexOf(document.activeElement);
    if (atual < 0 || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const prox = (atual + (e.key === "ArrowRight" ? 1 : -1) + CARDAPIO.length) % CARDAPIO.length;
    abrir(prox); abas.children[prox].focus();
  });
}

/* ---------- WhatsApp flutuante aparece depois do topo ---------- */

function flutuante() {
  const wa = document.querySelector(".wa-flutuante");
  const hero = document.querySelector(".hero");
  new IntersectionObserver(([e]) => wa.classList.toggle("on", !e.isIntersecting)).observe(hero);
}

/* ---------- Logo: usa img/logo.png quando existir ---------- */

function logo() {
  document.querySelectorAll(".logo__img").forEach(img => {
    const ok = () => img.closest(".logo").classList.add("tem-img");
    if (img.complete && img.naturalWidth) ok();
    else img.addEventListener("load", ok);
  });
}

/* ---------- Início ---------- */

montarSprites();
logo();
linksWa();
montarSabores();
montarBolhas();
montarTrabalhos();
montarDepoimentos();
flutuante();
document.fonts.ready.then(() => todasCaldas(true));

let largura = innerWidth, t;
addEventListener("resize", () => {
  clearTimeout(t);
  t = setTimeout(() => { if (innerWidth !== largura) { largura = innerWidth; todasCaldas(false); } }, 150);
});
