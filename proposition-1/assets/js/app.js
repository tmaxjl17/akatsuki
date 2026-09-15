/* =========================================================
   AuraGroup — logique de la page
   ========================================================= */
(function () {
  "use strict";

  var MEMBERS = window.MEMBERS || [];
  if (!MEMBERS.length) return;

  var BOOT_MS = 2300;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var el = {
    boot:       document.getElementById("boot"),
    index:      document.getElementById("heroIndex"),
    total:      document.getElementById("heroTotal"),
    name:       document.getElementById("heroName"),
    title:      document.getElementById("heroTitle"),
    bio:        document.getElementById("heroBio"),
    note:       document.getElementById("heroNote"),
    abilities:  document.getElementById("heroAbilities"),
    media:      document.getElementById("heroMedia"),
    nextInitial: document.getElementById("nextInitial"),
    nextName:   document.getElementById("nextName"),
    prevBtn:    document.getElementById("prevBtn"),
    nextBtn:    document.getElementById("nextBtn"),
    cards:      document.getElementById("cards"),
    kinBody:    document.getElementById("kinBody"),
    // Fiche technique
    dAge:    document.getElementById("dAge"),
    dYears:  document.getElementById("dYears"),
    dRank:   document.getElementById("dRank"),
    dNature: document.getElementById("dNature"),
    dRing:   document.getElementById("dRing"),
    dFinger: document.getElementById("dFinger"),
    dBounty: document.getElementById("dBounty"),
    dStatus: document.getElementById("dStatus"),
    // Technique interdite du membre affiché
    forbName:   document.getElementById("forbName"),
    forbDesc:   document.getElementById("forbDesc"),
    forbCost:   document.getElementById("forbCost"),
    forbStatus: document.getElementById("forbStatus")
  };

  var current = 0;
  var cardNodes = [];

  /* ------------------------------------------------------- helpers */

  function pad(n) { return String(n + 1).padStart(2, "0"); }
  function tag(name) { return "[IMAGE_" + name.toUpperCase() + "]"; }

  function cloudSvg(className) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", className);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#ak-cloud");
    svg.appendChild(use);
    return svg;
  }

  function span(className, text) {
    var s = document.createElement("span");
    s.className = className;
    if (text != null) s.textContent = text;
    return s;
  }

  /* ------------------------------------------------- écran de boot */

  function dismissBoot() {
    if (el.boot) el.boot.classList.add("boot--done");
  }
  if (reduceMotion) dismissBoot();
  else window.setTimeout(dismissBoot, BOOT_MS);

  /* ---------------------------------------------------------- héros */

  function renderAbilities(list) {
    el.abilities.textContent = "";
    list.forEach(function (ab) {
      var li = document.createElement("li");
      li.className = "ability";
      li.appendChild(span("ability__kind", ab.kind));
      li.appendChild(span("ability__name", ab.name));
      li.appendChild(span("ability__desc", ab.desc));
      el.abilities.appendChild(li);
    });
  }

  function renderHeroMedia(m) {
    if (m.img) {
      el.media.textContent = "";
      el.media.classList.add("hero__media--filled");
      var img = document.createElement("img");
      img.src = m.img;
      img.alt = m.name + " — " + m.title;
      el.media.appendChild(img);
      return;
    }
    el.media.classList.remove("hero__media--filled");
    el.media.textContent = "";
    el.media.appendChild(span("hero__media-label", "Placeholder"));
    el.media.appendChild(span("hero__media-tag", tag("HERO_" + m.name)));
  }

  function isSoftStatus(status) {
    return /tolérée|surveillance/i.test(status || "");
  }

  function renderDossier(m) {
    el.dAge.textContent    = m.age;
    el.dYears.textContent  = m.years;
    el.dRank.textContent   = m.rank;
    el.dNature.textContent = m.nature;
    el.dRing.textContent   = m.ring;
    el.dFinger.textContent = m.finger;
    el.dBounty.textContent = m.bounty;
    el.dStatus.textContent = m.status;
  }

  function renderForbidden(f) {
    el.forbName.textContent   = f.name;
    el.forbDesc.textContent   = f.desc;
    el.forbCost.textContent   = f.cost;
    el.forbStatus.textContent = f.status;
  }

  function renderHero() {
    var m = MEMBERS[current];
    var nx = MEMBERS[(current + 1) % MEMBERS.length];

    el.index.textContent = pad(current);
    el.name.textContent = m.name;
    el.title.textContent = m.title;
    el.bio.textContent = m.bio;
    el.note.textContent = m.note;
    renderAbilities(m.abilities);
    renderHeroMedia(m);
    renderDossier(m);
    renderForbidden(m.forbidden);

    el.nextInitial.textContent = nx.name.charAt(0);
    el.nextName.textContent = nx.name;
    el.nextBtn.setAttribute("aria-label", "Membre suivant : " + nx.name);
    el.prevBtn.setAttribute(
      "aria-label",
      "Membre précédent : " + MEMBERS[(current - 1 + MEMBERS.length) % MEMBERS.length].name
    );

    document.title = m.name + " — AuraGroup";

    cardNodes.forEach(function (node, k) {
      node.setAttribute("aria-current", k === current ? "true" : "false");
    });
  }

  function select(i, scrollUp) {
    current = (i + MEMBERS.length) % MEMBERS.length;
    renderHero();
    if (scrollUp) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }

  el.prevBtn.addEventListener("click", function () { select(current - 1, false); });
  el.nextBtn.addEventListener("click", function () { select(current + 1, false); });

  /* -------------------------------------------------------- galerie */

  function buildCards() {
    var frag = document.createDocumentFragment();

    MEMBERS.forEach(function (m, k) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "card";
      card.setAttribute("aria-label", "Afficher " + m.name + " en héros");

      var accent = document.createElement("span");
      accent.className = "card__accent";
      card.appendChild(accent);

      var media = document.createElement("span");
      media.className = "card__media";
      if (m.img) {
        media.classList.add("card__media--filled");
        var img = document.createElement("img");
        img.src = m.img;
        img.alt = "";
        img.loading = "lazy";
        media.appendChild(img);
      } else {
        media.appendChild(cloudSvg("card__cloud"));
        media.appendChild(span("card__tag", tag("MEMBER_" + m.name)));
      }
      card.appendChild(media);

      var body = document.createElement("span");
      body.className = "card__body";
      body.appendChild(span("card__meta", pad(k) + " — " + m.village));
      var name = document.createElement("span");
      name.className = "card__name";
      name.textContent = m.name;
      body.appendChild(name);
      body.appendChild(span("card__title", m.title));

      var facts = document.createElement("span");
      facts.className = "card__facts";
      facts.appendChild(span("", m.age === "Inconnu" ? "Âge inconnu" : m.age + " ans"));
      facts.appendChild(span("", m.years === "Inconnu" ? "Activité inconnue" : m.years + " ans d'activité"));
      body.appendChild(facts);

      card.appendChild(body);

      card.addEventListener("click", function () { select(k, true); });

      cardNodes.push(card);
      frag.appendChild(card);
    });

    el.cards.appendChild(frag);
  }

  /* ------------------------------ registre des techniques interdites */

  function buildKinjutsu() {
    if (!el.kinBody) return;
    var frag = document.createDocumentFragment();

    MEMBERS.forEach(function (m, k) {
      var f = m.forbidden;
      if (!f) return;

      var row = document.createElement("div");
      row.className = "kin-row";
      row.setAttribute("role", "row");

      var num = span("kin__num", pad(k));
      num.setAttribute("role", "cell");
      row.appendChild(num);

      var name = span("kin__name", f.name);
      name.setAttribute("role", "cell");
      name.appendChild(span("kin__desc", f.desc));
      row.appendChild(name);

      // Le détenteur renvoie vers sa fiche en haut de page
      var holder = document.createElement("button");
      holder.type = "button";
      holder.className = "kin__holder";
      holder.textContent = m.name;
      holder.setAttribute("role", "cell");
      holder.setAttribute("aria-label", "Afficher la fiche de " + m.name);
      holder.addEventListener("click", function () { select(k, true); });
      row.appendChild(holder);

      var cost = span("kin__cost", f.cost);
      cost.setAttribute("role", "cell");
      row.appendChild(cost);

      var status = span("kin__status" + (isSoftStatus(f.status) ? " kin__status--soft" : ""), f.status);
      status.setAttribute("role", "cell");
      row.appendChild(status);

      frag.appendChild(row);
    });

    el.kinBody.appendChild(frag);
  }


  /* ------------------------------------------------------------ init */

  el.total.textContent = pad(MEMBERS.length - 1);
  buildCards();
  buildKinjutsu();
  renderHero();
})();
