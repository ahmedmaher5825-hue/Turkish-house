/* ===== بيانات المتجر ===== */
const PHONE = "01063770118";
const WA = "201063770118";
const ADDRESS = "قرية الزمار – مركز المنصورة – محافظة الدقهلية";
const DISCOUNT = 0.15;

/* لاستخدام صور حقيقية: أضف image: "images/اسم-الصورة.jpg" لأي منتج وستظهر بدل الرسم */
const CATEGORIES = {
  mattresses: {
    title: "المراتب",
    desc: "مراتب طبية بأحجام مختلفة توفر دعماً مريحاً للظهر والعمود الفقري.",
    items: [
      { name: "مرتبة 170 سم", size: 170, price: 10000 },
      { name: "مرتبة 160 سم", size: 160, price: 9500 },
      { name: "مرتبة 150 سم", size: 150, price: 9000 },
      { name: "مرتبة 120 سم", size: 120, price: 6000 },
      { name: "مرتبة 110 سم", size: 110, price: 5500 },
    ],
  },
  pillows: {
    title: "المخدات",
    desc: "مخدات ناعمة ومريحة تناسب كل مقاسات الأسرّة، مع مخدة زينة صغيرة.",
    items: [
      { name: "مخدة 170 سم", size: 170, price: 450 },
      { name: "مخدة 160 سم", size: 160, price: 400 },
      { name: "مخدة 150 سم", size: 150, price: 400 },
      { name: "مخدة 120 سم", size: 120, price: 350 },
      { name: "مخدة 110 سم", size: 110, price: 350 },
      { name: "مخدة زينة صغيرة مربعة", size: 0, price: 200 },
    ],
  },
  covers: {
    title: "أغطية المراتب",
    desc: "أغطية واقية مضادة للسوائل توضع فوق المرتبة لحمايتها من البقع والرطوبة.",
    items: [
      { name: "غطاء مرتبة 170 سم", size: 170, price: 450 },
      { name: "غطاء مرتبة 160 سم", size: 160, price: 400 },
      { name: "غطاء مرتبة 150 سم", size: 150, price: 400 },
      { name: "غطاء مرتبة 120 سم", size: 120, price: 350 },
      { name: "غطاء مرتبة 110 سم", size: 110, price: 350 },
    ],
  },
};

/* ===== رسومات المنتجات (SVG) ===== */
function mattressSVG(size, cover) {
  const w = 150 + (size - 110) * 1.5, x = (300 - w) / 2, x1 = x + w;
  const lines = [0.2, 0.4, 0.6, 0.8].map(f => {
    const a = x + 30 + (w - 30) * f, b = x + (w - 30) * f;
    return `<line x1="${a}" y1="52" x2="${b}" y2="92" stroke="${cover ? '#6FC3D6' : '#9ED1CB'}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
  }).join("");
  const drops = cover ? [[x + w * .35, 34], [x + w * .55, 24], [x + w * .72, 38]].map(([cx, cy]) =>
    `<path d="M${cx} ${cy - 9}c5 7 7 10 7 13a7 7 0 0 1-14 0c0-3 2-6 7-13z" fill="#3AA8D8"/>`).join("") : "";
  const sheet = cover ? `<polygon points="${x + 30},48 ${x1 + 3},48 ${x1 - 27},95 ${x - 3},95" fill="#7FD3EA" fill-opacity=".55" stroke="#3AA8D8" stroke-width="2"/>
    <g transform="translate(${x + w * .2} 118)"><path d="M0-14l10 4v8c0 7-4 11-10 14-6-3-10-7-10-14v-8z" fill="#fff" stroke="#0E7C7B" stroke-width="2"/><path d="M-4 -1l3 3 6-7" fill="none" stroke="#0E7C7B" stroke-width="2.2" stroke-linecap="round"/></g>` : "";
  return `<svg viewBox="0 0 300 190" role="img" aria-label="${cover ? "غطاء مرتبة" : "مرتبة"} ${size} سم">
  <ellipse cx="150" cy="168" rx="${w / 2 + 10}" ry="9" fill="#0B2545" opacity=".12"/>
  <rect x="${x}" y="92" width="${w - 30}" height="14" fill="#BFE3DD"/>
  <rect x="${x}" y="106" width="${w - 30}" height="14" fill="#0E7C7B"/>
  <rect x="${x}" y="120" width="${w - 30}" height="22" rx="6" fill="#0B2545"/>
  <polygon points="${x1 - 30},92 ${x1},50 ${x1},100 ${x1 - 30},142" fill="#8FC9C2"/>
  <polygon points="${x + 30},50 ${x1},50 ${x1 - 30},92 ${x},92" fill="#F4FBFA" stroke="#BFE3DD" stroke-width="2"/>
  ${lines}${sheet}${drops}
  <text x="${x + (w - 30) / 2}" y="136" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="IBM Plex Sans Arabic,Tahoma,sans-serif">${size} سم</text>
  </svg>`;
}
function pillowSVG(size) {
  if (!size) return `<svg viewBox="0 0 300 190" role="img" aria-label="مخدة زينة مربعة">
  <ellipse cx="150" cy="168" rx="70" ry="8" fill="#0B2545" opacity=".12"/>
  <g transform="rotate(-6 150 90)"><rect x="95" y="35" width="110" height="110" rx="20" fill="#F2A541"/>
  <rect x="105" y="45" width="90" height="90" rx="14" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="5 4"/>
  <path d="M150 90L108 52M150 90l42-38M150 90l-42 38M150 90l42 38" stroke="#D88B1E" stroke-width="2"/><circle cx="150" cy="90" r="7" fill="#0B2545"/></g></svg>`;
  const w = 130 + (size - 110) * 1.4, x = (300 - w) / 2;
  return `<svg viewBox="0 0 300 190" role="img" aria-label="مخدة ${size} سم">
  <ellipse cx="150" cy="158" rx="${w / 2}" ry="9" fill="#0B2545" opacity=".12"/>
  <path d="M${x + 14} 60Q150 36 ${x + w - 14} 60Q${x + w + 6} 100 ${x + w - 14} 140Q150 162 ${x + 14} 140Q${x - 6} 100 ${x + 14} 60z" fill="#fff" stroke="#9ED1CB" stroke-width="3"/>
  <path d="M${x + 30} 74Q150 56 ${x + w - 30} 74M${x + 30} 126Q150 144 ${x + w - 30} 126" fill="none" stroke="#9ED1CB" stroke-width="2" stroke-dasharray="5 4"/>
  <path d="M${x + 14} 60Q${x + 30} 100 ${x + 14} 140M${x + w - 14} 60Q${x + w - 30} 100 ${x + w - 14} 140" fill="none" stroke="#DDF0EC" stroke-width="3"/>
  <text x="150" y="106" text-anchor="middle" fill="#0E7C7B" font-size="16" font-weight="700" font-family="IBM Plex Sans Arabic,Tahoma,sans-serif">${size} سم</text></svg>`;
}
function artFor(cat, it) {
  if (it.image) return `<img src="${it.image}" alt="${it.name}" style="width:100%;display:block;border-radius:12px">`;
  return cat === "pillows" ? pillowSVG(it.size) : mattressSVG(it.size, cat === "covers");
}

/* ===== أدوات ===== */
const fmt = n => n.toLocaleString("ar-EG");
const oldPrice = p => Math.round(p / (1 - DISCOUNT) / 10) * 10;
const app = document.getElementById("app");

function productCard(cat, it) {
  const msg = encodeURIComponent(`مرحباً، أريد طلب: ${it.name} بسعر ${it.price} جنيه`);
  return `<article class="card">
    <span class="tag">خصم 15%</span>
    <div class="art">${artFor(cat, it)}</div>
    <div class="info">
      <h3>${it.name}</h3>
      <div class="prices"><span class="now">${fmt(it.price)} <small>جنيه</small></span><span class="old">${fmt(oldPrice(it.price))} جنيه</span></div>
      <div class="actions">
        <a class="wa" href="https://wa.me/${WA}?text=${msg}" target="_blank" rel="noopener">اطلب واتساب</a>
        <a class="tel" href="tel:${PHONE}">اتصل الآن</a>
      </div>
    </div></article>`;
}

/* ===== الصفحات ===== */
function homePage() {
  const cats = Object.entries(CATEGORIES).map(([k, c]) => `
    <a class="cat" href="#${k}">
      <div class="art">${artFor(k, c.items[0])}</div>
      <div class="body"><h3>${c.title}</h3><p>${c.desc}</p><span class="go">تصفح ${c.title} ‹</span></div>
    </a>`).join("");
  return `
  <section class="hero"><div class="wrap">
    <div>
      <span class="badge-15">🏷️ خصم 15% لفترة محدودة</span>
      <h1>نوم صحي يبدأ من مرتبة طبية مناسبة لك</h1>
      <p>مراتب ومخدات وأغطية واقية من السوائل بجودة عالية، بأسعار تشمل الخصم، من قلب قرية الزمار إلى بيتك.</p>
      <a class="btn btn-primary" href="#mattresses">تسوّق المراتب</a>
      <a class="btn btn-ghost" href="tel:${PHONE}">اتصل بنا</a>
    </div>
    <div class="hero-art">${mattressSVG(170, false)}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <h2>تسوّق حسب القسم</h2><p class="sub">اختر القسم لعرض المقاسات والأسعار.</p>
    <div class="cats">${cats}</div>
  </div></section>
  <section class="section" style="padding-top:0"><div class="wrap"><div class="feats">
    <div class="feat"><b>دعم طبي للظهر</b><span>تصميم يساعد على توزيع الوزن بشكل متوازن.</span></div>
    <div class="feat"><b>حماية من السوائل</b><span>أغطية واقية تحافظ على المرتبة نظيفة وجافة.</span></div>
    <div class="feat"><b>مقاسات متعددة</b><span>من 110 سم حتى 170 سم لتناسب كل سرير.</span></div>
    <div class="feat"><b>اطلب بسهولة</b><span>اتصال أو واتساب مباشر مع كل منتج.</span></div>
  </div></div></section>`;
}

function categoryPage(key) {
  const c = CATEGORIES[key];
  const others = Object.entries(CATEGORIES).filter(([k]) => k !== key)
    .map(([k, o]) => `<a href="#${k}">${o.title}</a>`).join("");
  return `
  <section class="page-head"><div class="wrap">
    <div class="crumbs"><a href="#home">الرئيسية</a> / ${c.title}</div>
    <h1>${c.title}</h1><p>${c.desc}</p>
  </div></section>
  <section class="section"><div class="wrap">
    <div class="grid">${c.items.map(it => productCard(key, it)).join("")}</div>
    <p class="note">جميع الأسعار المعروضة بعد خصم 15% (عرض لفترة محدودة). للطلب أو الاستفسار اتصل على <b dir="ltr">${PHONE}</b>.</p>
    <div class="others"><span>تصفح أيضاً:</span>${others}</div>
  </div></section>`;
}

function contactPage() {
  return `
  <section class="page-head"><div class="wrap">
    <div class="crumbs"><a href="#home">الرئيسية</a> / تواصل معنا</div>
    <h1>تواصل معنا</h1><p>يسعدنا خدمتك والإجابة عن أي استفسار.</p>
  </div></section>
  <section class="section"><div class="wrap contact">
    <div class="box"><h3>بيانات المتجر</h3>
      <div class="row"><span class="ic">📍</span><div><b>العنوان</b><br>${ADDRESS}</div></div>
      <div class="row"><span class="ic">📞</span><div><b>رقم الهاتف</b><br><a class="ph" href="tel:${PHONE}">${PHONE}</a></div></div>
    </div>
    <div class="box"><h3>اطلب الآن</h3>
      <p style="color:var(--muted);margin-bottom:16px">تواصل معنا مباشرة لتأكيد المقاس والسعر وترتيب التوصيل.</p>
      <a class="btn btn-primary" href="tel:${PHONE}">اتصل الآن</a>
      <a class="btn wa" style="margin-inline-start:10px" href="https://wa.me/${WA}" target="_blank" rel="noopener">واتساب</a>
    </div>
  </div></section>`;
}

/* ===== التنقل ===== */
function route() {
  const page = (location.hash || "#home").slice(1);
  app.innerHTML = `<div class="fade">${
    CATEGORIES[page] ? categoryPage(page) : page === "contact" ? contactPage() : homePage()
  }</div>`;
  document.querySelectorAll("[data-link]").forEach(a =>
    a.classList.toggle("active", a.dataset.link === (CATEGORIES[page] || page === "contact" ? page : "home")));
  document.getElementById("nav").classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
}
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => {
  const open = document.getElementById("nav").classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
window.addEventListener("hashchange", route);
route();