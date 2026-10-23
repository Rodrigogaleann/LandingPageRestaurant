/* ============ CONFIGURACIÓN (editá estos datos) ============ */
const CONFIG = {
  whatsapp: "5491100000000", // número con código de país, sin + ni espacios
  defaultMessage: "Hola Trattoria Lumina, quisiera reservar una mesa."
};

/* ============ DATOS ============ */
const REGIONS = [
  { n: "I",   name: "Toscana",  tag: "Centro de Italia", text: "Brasas, aceite verde y carne paciente. La cocina de campo toscana vive de pocos ingredientes y mucho respeto." },
  { n: "II",  name: "Campania", tag: "Costa del sur",    text: "Tomates de San Marzano, mozzarella de búfala y la masa que hizo célebre a Nápoles." },
  { n: "III", name: "Piamonte", tag: "Pie de los Alpes", text: "Trufa blanca de Alba, manteca y yemas: una cocina de otoño, profunda y aterciopelada." },
  { n: "IV",  name: "Sicilia",  tag: "Isla del sol",     text: "Ricota, pistacho y cítricos. Herencia árabe y normanda en cada postre." }
];

const DISHES = [
  { id: 1, img: "/assets/Tagliolini al tartufo.jpg", name: "Tagliolini al tartufo", region: "Piamonte", price: "$ 34",
    short: "Pasta al huevo, manteca de Bra y trufa negra rallada al momento.",
    ingredients: ["Yema de huevo", "Harina 00", "Manteca de Bra", "Trufa negra", "Parmigiano 30 meses"],
    rating: 5, c: "#f4ead6", a: "#8f7843", stats: { picor: 1, suavidad: 9, crocancia: 1, sabor: 9 } },
  { id: 2, img: "assets/Margherita Lumina.webp", name: "Margherita Lumina", region: "Campania", price: "$ 22",
    short: "Masa de 48 horas, San Marzano, fior di latte y albahaca fresca.",
    ingredients: ["Masa madre", "Tomate San Marzano", "Fior di latte", "Albahaca", "Aceite extra virgen"],
    rating: 4.5, c: "#f7e4d6", a: "#a8573a", stats: { picor: 1, suavidad: 6, crocancia: 8, sabor: 8 } },
  { id: 3, img: "assets/Bistecca alla fiorentina.jpg", name: "Bistecca alla fiorentina", region: "Toscana", price: "$ 58",
    short: "Corte alto madurado, brasa de encina, sal gruesa y aceite nuevo.",
    ingredients: ["Corte T-bone madurado", "Sal marina", "Romero", "Aceite toscano", "Limón"],
    rating: 5, c: "#efe3d0", a: "#6e4a2f", stats: { picor: 2, suavidad: 7, crocancia: 5, sabor: 10 } },
  { id: 4, img: "assets/Penne all’arrabbiata.webp", name: "Penne all’arrabbiata", region: "Lacio", price: "$ 24",
    short: "Pasta de trigo duro, tomate, ajo dorado y guindilla fresca.",
    ingredients: ["Penne rigate", "Tomate pelado", "Ajo", "Peperoncino", "Perejil", "Pecorino romano"],
    rating: 4, c: "#f6dfd8", a: "#a63d2f", stats: { picor: 8, suavidad: 3, crocancia: 2, sabor: 8 } },
  { id: 5, img: "assets/Risotto alla milanese.jpg", name: "Risotto alla milanese", region: "Lombardía", price: "$ 32",
    short: "Arroz carnaroli, azafrán en hebras y fondo de ossobuco.",
    ingredients: ["Arroz carnaroli", "Azafrán", "Médula de buey", "Fondo de ternera", "Grana padano"],
    rating: 4.5, c: "#f7efc8", a: "#a88a1f", stats: { picor: 1, suavidad: 10, crocancia: 1, sabor: 8 } },
  { id: 6, img: "assets/Cannolo siciliano.jpg", name: "Cannolo siciliano", region: "Sicilia", price: "$ 14",
    short: "Oblea frita al momento, ricota de oveja, pistacho de Bronte y naranja.",
    ingredients: ["Ricota de oveja", "Pistacho de Bronte", "Naranja confitada", "Chocolate amargo", "Marsala"],
    rating: 5, c: "#e6efdc", a: "#5f7a45", stats: { picor: 1, suavidad: 7, crocancia: 10, sabor: 9 } }
];

const REVIEWS = [
  ["Los tagliolini fueron lo mejor que comí este año.", "Valentina R.", 5],
  ["Servicio impecable, luz preciosa y una pasta de otro nivel.", "Martín G.", 5],
  ["La fiorentina, perfecta. Volvemos el sábado.", "Lucía & Tomás", 5],
  ["Un lugar sereno donde la comida es la protagonista.", "Federico A.", 4.5],
  ["El cannolo crocante y la ricota, increíble.", "Camila P.", 5],
  ["Perfecto para una cena de aniversario. Reservamos por WhatsApp en minutos.", "Julián M.", 5],
  ["Se nota el producto. El risotto, de manual.", "Sofía L.", 4.5],
  ["Elegante sin ser solemne. Nos sentimos en casa.", "Andrés V.", 5]
];

/* ============ UTILIDADES ============ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const stars = r => `<span class="stars" style="--p:${r / 5 * 100}%" role="img" aria-label="${r} de 5 estrellas">★★★★★</span>`;
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || CONFIG.defaultMessage)}`;

/* ============ WHATSAPP ============ */
$$("[data-wa]").forEach(a => { a.href = waLink(); a.target = "_blank"; a.rel = "noopener"; });
$("#bookForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  const msg = `Hola Trattoria Lumina, soy ${f.name}. Quisiera reservar para ${f.people} personas el ${f.date} a las ${f.time}. ¡Gracias!`;
  window.open(waLink(msg), "_blank", "noopener");
});
const dateInput = $("input[type=date]");
dateInput.min = new Date().toISOString().split("T")[0];

/* ============ RENDER ============ */
$("#regionGrid").innerHTML = REGIONS.map((r, i) => `
  <article class="region reveal" style="--d:${i * 100}ms">
    <div class="region__n">${r.n}</div><h3>${r.name}</h3><small>${r.tag}</small><p>${r.text}</p>
  </article>`).join("");

// Si la foto no existe todavía, se oculta y queda el plato ilustrado de fondo
const photo = (d, alt) => `<img src="${d.img}" alt="${alt}" loading="lazy" onerror="this.remove()">`;

$("#dishGrid").innerHTML = DISHES.map((d, i) => `
  <button class="dish f${d.id} reveal" style="--c:${d.c};--a:${d.a};--d:${(i % 3) * 100}ms" data-id="${d.id}" aria-haspopup="dialog">
    <span class="dish__img">${photo(d, d.name)}</span>
    <span class="dish__body">
      <span class="dish__top"><span>${d.region}</span><span class="dish__price">${d.price}</span></span>
      <h3>${d.name}</h3><p>${d.short}</p><span class="dish__more">Ver detalle</span>
    </span>
  </button>`).join("");

const card = ([t, n, r]) => `<article class="review">${stars(r)}<p>“${t}”</p><footer>${n}</footer></article>`;
[["#marqueeA", REVIEWS.slice(0, 4).concat(REVIEWS.slice(4))], ["#marqueeB", REVIEWS.slice().reverse()]].forEach(([sel, list]) => {
  const html = list.map(card).join("");
  $(".marquee__track", $(sel)).innerHTML = html + html; // duplicado para bucle continuo
});

/* ============ MODAL DE PLATO ============ */
const modal = $("#modal"), body = $("#modalBody");
const LABELS = { picor: "Picor", suavidad: "Suavidad", crocancia: "Crocancia", sabor: "Sabor" };
function openDish(id) {
  const d = DISHES.find(x => x.id === +id);
  modal.style.setProperty("--c", d.c); modal.style.setProperty("--a", d.a);
  body.innerHTML = `
    <div class="m">
      <div class="m__img">${photo(d, d.name)}</div>
      <div class="m__l f${d.id}">
        <p class="m__reg">${d.region} · Italia</p>
        <h3 id="mTitle">${d.name}</h3>
        ${stars(d.rating)} <span style="font-size:.85rem;color:var(--ink-2)">${d.rating}/5</span>
        <p style="margin-top:1rem;color:var(--ink-2)">${d.short}</p>
        <h4>Ingredientes</h4>
        <ul class="chips">${d.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
        <h4>Precio</h4><p style="font-family:var(--serif);font-size:1.8rem">${d.price}</p>
      </div>
      <div class="m__r">
        <h4 style="margin-top:0">Perfil de sabor</h4>
        ${Object.entries(d.stats).map(([k, v]) => `
          <div class="meter"><div class="meter__row"><span>${LABELS[k]}</span><span>${v}/10</span></div>
          <div class="meter__bar" role="img" aria-label="${LABELS[k]} ${v} de 10"><i data-w="${v * 10}"></i></div></div>`).join("")}
        <a class="btn btn--dark" style="width:100%;margin-top:1rem" target="_blank" rel="noopener"
           href="${waLink(`Hola Trattoria Lumina, quisiera reservar y probar el plato "${d.name}".`)}">Reservar mesa</a>
      </div>
    </div>`;
  modal.showModal();
  requestAnimationFrame(() => requestAnimationFrame(() => $$(".meter__bar i", body).forEach(i => i.style.width = i.dataset.w + "%")));
}
$("#dishGrid").addEventListener("click", e => { const b = e.target.closest(".dish"); if (b) openDish(b.dataset.id); });
$("#mClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); }); // clic en el fondo

/* ============ NAV ============ */
const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
const onScroll = () => nav.classList.toggle("is-solid", scrollY > 20);
onScroll(); addEventListener("scroll", onScroll, { passive: true });
const setMenu = open => {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
};
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));

/* ============ REVEAL AL HACER SCROLL ============ */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .12 });
$$(".reveal").forEach(el => io.observe(el));

/* ============ HORARIO: marcar el día de hoy ============ */
const today = new Date().getDay();
$$(".hours tr").forEach(tr => { if (tr.dataset.days.split(",").includes(String(today))) tr.classList.add("today"); });
$("#year").textContent = new Date().getFullYear();
