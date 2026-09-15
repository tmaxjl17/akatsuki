/* =========================================================
   AuraGroup — Proposition 3 « Registre »
   Couverture à lettres remplies, dossier, index des dix,
   registre des kinjutsu.
   ========================================================= */
(function () {
  "use strict";

  var MEMBERS = window.MEMBERS || [];
  var EXTRAS = window.MEMBER_EXTRAS || {};
  var FILLS = window.MEMBER_FILLS || [];
  if (!MEMBERS.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Fusion des champs propres à cette maquette
  MEMBERS.forEach(function (m) {
    var x = EXTRAS[m.name];
    if (!x) return;
    m.kana = x.kana;
    m.partner = x.partner;
    m.stats = x.stats;
  });

  function pad(n) { return String(n + 1).padStart(2, "0"); }
  function tag(name) { return "[IMAGE_" + name.toUpperCase() + "]"; }
  function isSoftStatus(s) { return /tolérée|surveillance/i.test(s || ""); }

  // Remplissage des lettres : `imgCover` en priorité (cadrage serré prévu
  // pour la typo), sinon le visuel principal, sinon le dégradé.
  //
  // L'URL est rendue ABSOLUE : un chemin relatif placé dans une variable
  // CSS n'est pas résolu depuis le document mais depuis la feuille de
  // style qui consomme le var(), donc « ../assets/img/… » pointait à côté
  // et l'image ne se chargeait pas — ce qui rendait tout le titre invisible.
  function fillFor(m, k) {
    var src = m.imgCover || m.img;
    if (src) return 'url("' + new URL(src, document.baseURI).href + '")';
    return FILLS[k % FILLS.length] || "linear-gradient(120deg, #7E0E0D, #E8342B)";
  }

  function hasPhoto(m) { return Boolean(m.imgCover || m.img); }

  // Première phrase de la biographie, pour l'exergue de couverture
  function firstSentence(text) {
    var m = String(text).match(/^[\s\S]*?[.!?](?=\s|$)/);
    return m ? m[0] : text;
  }

  function span(cls, text) {
    var s = document.createElement("span");
    if (cls) s.className = cls;
    if (text != null) s.textContent = text;
    return s;
  }

  function cloudSvg(cls) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", cls);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#ak-cloud");
    svg.appendChild(use);
    return svg;
  }

  var el = {
    coverTitle: document.getElementById("coverTitle"),
    coverType:  document.getElementById("coverType"),
    coverFront: document.getElementById("coverFront"),
    coverL1:    document.getElementById("coverL1"),
    coverL2:    document.getElementById("coverL2"),
    coverKana:  document.getElementById("coverKana"),
    coverRoman: document.getElementById("coverRoman"),
    coverIndex: document.getElementById("coverIndex"),
    coverExcerpt: document.getElementById("coverExcerpt"),
    prevBtn: document.getElementById("prevBtn"),
    nextBtn: document.getElementById("nextBtn"),

    pVillage: document.getElementById("pVillage"),
    pRank:    document.getElementById("pRank"),
    pMedia:   document.getElementById("pMedia"),
    pPartner: document.getElementById("pPartner"),
    pStatus:  document.getElementById("pStatus"),

    chips:     document.getElementById("chips"),
    dName:     document.getElementById("dName"),
    dBio:      document.getElementById("dBio"),
    dNote:     document.getElementById("dNote"),
    dAbilities: document.getElementById("dAbilities"),
    bars:      document.getElementById("bars"),

    kName:   document.getElementById("kName"),
    kDesc:   document.getElementById("kDesc"),
    kCost:   document.getElementById("kCost"),
    kStatus: document.getElementById("kStatus"),

    index: document.getElementById("index"),
    kins:  document.getElementById("kins")
  };

  var current = 0;
  var rowNodes = [];

  /* ------------------------------------------------- couverture */

  function renderCover(m, k) {
    el.coverL1.textContent = m.name;
    el.coverL2.textContent = m.village;

    // Un seul remplissage pour tout le bloc : l'image traverse les deux lignes
    el.coverTitle.style.setProperty("--fill", fillFor(m, k));
    // Cadrage vertical : sur un visuel en pied, il faut viser le visage
    el.coverTitle.style.setProperty("--focus", m.imgFocus || "center 28%");
    // Les visuels sont très sombres : on remonte les noirs dans les lettres
    el.coverTitle.classList.toggle("has-photo", hasPhoto(m));

    // Découpe éventuelle posée devant les lettres
    el.coverFront.textContent = "";
    if (m.imgFront) {
      var front = document.createElement("img");
      front.src = m.imgFront;
      front.alt = "";
      el.coverFront.appendChild(front);
      el.coverType.classList.add("has-front");
    } else {
      el.coverType.classList.remove("has-front");
    }

    el.coverKana.textContent = m.kana || m.name;
    el.coverRoman.textContent = m.name + " — " + m.title;
    el.coverIndex.textContent = pad(k);
    el.coverExcerpt.textContent = firstSentence(m.bio);
  }

  /* ---------------------------------------------------- dossier */

  function renderPanels(m) {
    el.pVillage.textContent = m.village;
    el.pRank.textContent = m.rank;
    el.pPartner.textContent = m.partner || "—";
    el.pStatus.textContent = m.status;

    el.pMedia.textContent = "";
    if (m.img) {
      el.pMedia.classList.add("panel__media--filled");
      var img = document.createElement("img");
      img.src = m.img;
      img.alt = m.name + " — " + m.title;
      el.pMedia.appendChild(img);
    } else {
      el.pMedia.classList.remove("panel__media--filled");
      el.pMedia.appendChild(cloudSvg("panel__cloud"));
      el.pMedia.appendChild(span("panel__tag", tag("HERO_" + m.name)));
    }
  }

  function renderChips(m) {
    var rows = [
      ["Âge", m.age === "Inconnu" ? "Inconnu" : m.age + " ans"],
      ["Années d'activité", m.years === "Inconnu" ? "Inconnu" : m.years + " ans"],
      ["Affinité", m.nature],
      ["Anneau", m.ring + " — " + m.finger],
      ["Prime", m.bounty]
    ];
    el.chips.textContent = "";
    rows.forEach(function (r) {
      var li = document.createElement("li");
      var b = document.createElement("b");
      b.textContent = r[0];
      li.appendChild(b);
      li.appendChild(span("", r[1]));
      el.chips.appendChild(li);
    });
  }

  function renderAbilities(list) {
    el.dAbilities.textContent = "";
    list.forEach(function (ab) {
      var li = document.createElement("li");
      li.className = "ability";
      li.appendChild(span("ability__kind", ab.kind));
      li.appendChild(span("ability__name", ab.name));
      li.appendChild(span("ability__desc", ab.desc));
      el.dAbilities.appendChild(li);
    });
  }

  var BAR_LABELS = {
    puissance: "Puissance",
    vitesse: "Vitesse",
    technique: "Technique",
    endurance: "Endurance"
  };

  function renderBars(m) {
    el.bars.textContent = "";
    if (!m.stats) return;

    Object.keys(BAR_LABELS).forEach(function (key) {
      var value = m.stats[key];
      if (value == null) return;

      var wrap = document.createElement("div");
      wrap.className = "bar";

      var dt = document.createElement("dt");
      dt.appendChild(span("", BAR_LABELS[key]));
      var em = document.createElement("em");
      em.textContent = value;
      dt.appendChild(em);
      wrap.appendChild(dt);

      var dd = document.createElement("dd");
      var fill = span("bar__fill");
      dd.appendChild(fill);
      wrap.appendChild(dd);

      el.bars.appendChild(wrap);

      if (reduceMotion) {
        fill.style.width = value + "%";
      } else {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { fill.style.width = value + "%"; });
        });
      }
    });
  }

  function renderKin(f) {
    el.kName.textContent = f.name;
    el.kDesc.textContent = f.desc;
    el.kCost.textContent = f.cost;
    el.kStatus.textContent = f.status;
    el.kStatus.classList.toggle("is-soft", isSoftStatus(f.status));
  }

  /* ------------------------------------------------- rendu global */

  function render() {
    var m = MEMBERS[current];
    if (!m) return;

    renderCover(m, current);
    renderPanels(m);
    renderChips(m);
    el.dName.textContent = "À propos de " + m.name;
    el.dBio.textContent = m.bio;
    el.dNote.textContent = m.note;
    renderAbilities(m.abilities);
    renderBars(m);
    renderKin(m.forbidden);

    document.title = "Registre 01 — " + m.name + " · AuraGroup";

    rowNodes.forEach(function (btn, k) {
      var on = k === current;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-current", on ? "true" : "false");
    });
  }

  function select(i, scrollTo) {
    current = (i + MEMBERS.length) % MEMBERS.length;
    render();
    if (scrollTo) {
      var target = document.getElementById(scrollTo);
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  el.prevBtn.addEventListener("click", function () { select(current - 1, null); });
  el.nextBtn.addEventListener("click", function () { select(current + 1, null); });

  /* --------------------------------------------- index des dix */

  function buildIndex() {
    if (!el.index) return;
    var frag = document.createDocumentFragment();

    MEMBERS.forEach(function (m, k) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "row";
      btn.style.setProperty("--fill", fillFor(m, k));
      btn.style.setProperty("--focus", m.imgFocus || "center 28%");
      if (hasPhoto(m)) btn.classList.add("has-photo");
      btn.setAttribute("aria-label", "Mettre " + m.name + " en couverture");

      btn.appendChild(span("row__n", pad(k)));
      btn.appendChild(span("row__name", m.name));
      btn.appendChild(span("row__meta", m.title + " — " + m.village));
      btn.appendChild(span("row__kana", m.kana || ""));

      btn.addEventListener("click", function () { select(k, "couverture"); });

      rowNodes.push(btn);
      li.appendChild(btn);
      frag.appendChild(li);
    });

    el.index.appendChild(frag);
  }

  /* ------------------------------------ registre des kinjutsu */

  function buildKins() {
    if (!el.kins) return;
    var frag = document.createDocumentFragment();

    MEMBERS.forEach(function (m, k) {
      var f = m.forbidden;
      if (!f) return;

      var card = document.createElement("article");
      card.className = "kincard";
      card.appendChild(span("kincard__n", pad(k)));

      var holder = document.createElement("button");
      holder.type = "button";
      holder.className = "kincard__holder";
      holder.textContent = m.name;
      holder.setAttribute("aria-label", "Mettre " + m.name + " en couverture");
      holder.addEventListener("click", function () { select(k, "dossier"); });
      card.appendChild(holder);

      var name = document.createElement("h3");
      name.className = "kincard__name";
      name.textContent = f.name;
      card.appendChild(name);

      var desc = document.createElement("p");
      desc.className = "kincard__desc";
      desc.textContent = f.desc;
      card.appendChild(desc);

      var foot = document.createElement("span");
      foot.className = "kincard__foot";
      var cost = span("kincard__cost");
      cost.appendChild(span("kincard__cost-label", "Prix à payer"));
      cost.appendChild(span("", f.cost));
      foot.appendChild(cost);
      foot.appendChild(span("kincard__status" + (isSoftStatus(f.status) ? " is-soft" : ""), f.status));
      card.appendChild(foot);

      frag.appendChild(card);
    });

    el.kins.appendChild(frag);
  }

  /* --------------------------------------------------------- init */

  buildIndex();
  buildKins();
  render();
})();
