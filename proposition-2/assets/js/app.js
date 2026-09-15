/* =========================================================
   AuraGroup — Proposition 2
   Sélecteur d'implantations, index des membres, accordéon
   des domaines, compteurs, registre des kinjutsu, formulaire.
   ========================================================= */
(function () {
  "use strict";

  var MEMBERS = window.MEMBERS || [];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function pad(n) { return String(n + 1).padStart(2, "0"); }
  function tag(name) { return "[IMAGE_" + name.toUpperCase() + "]"; }
  function isSoftStatus(s) { return /tolérée|surveillance/i.test(s || ""); }

  function span(cls, text) {
    var s = document.createElement("span");
    if (cls) s.className = cls;
    if (text != null) s.textContent = text;
    return s;
  }

  function cloudSvg(cls, symbol) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", cls);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#" + symbol);
    svg.appendChild(use);
    return svg;
  }

  /* ----------------------------------------------- Implantations */

  function initVillages() {
    var list = document.getElementById("omniList");
    var city = document.getElementById("omniCity");
    var country = document.getElementById("omniCountry");
    var note = document.getElementById("omniNote");
    if (!list || !city) return;

    var items = [].slice.call(list.querySelectorAll(".omni__item"));

    function activate(btn) {
      items.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-current", on ? "true" : "false");
      });
      city.textContent = btn.dataset.city;
      country.textContent = btn.dataset.country;
      note.textContent = btn.dataset.note;
    }

    items.forEach(function (btn) {
      btn.addEventListener("click", function () { activate(btn); });
      btn.addEventListener("mouseenter", function () { activate(btn); });
    });

    if (items.length) activate(items[0]);
  }

  /* ------------------------------------------- Index des membres */

  var el = {
    index:  document.getElementById("mIndex"),
    village: document.getElementById("mVillage"),
    name:   document.getElementById("mName"),
    title:  document.getElementById("mTitle"),
    media:  document.getElementById("mMedia"),
    imgTag: document.getElementById("mTag"),
    bio:    document.getElementById("mBio"),
    note:   document.getElementById("mNote"),
    abilities: document.getElementById("mAbilities"),
    list:   document.getElementById("mList"),
    powers: document.getElementById("powers"),
    dAge:    document.getElementById("dAge"),
    dYears:  document.getElementById("dYears"),
    dRank:   document.getElementById("dRank"),
    dNature: document.getElementById("dNature"),
    dRing:   document.getElementById("dRing"),
    dFinger: document.getElementById("dFinger"),
    dBounty: document.getElementById("dBounty"),
    dStatus: document.getElementById("dStatus"),
    fName:   document.getElementById("fName"),
    fDesc:   document.getElementById("fDesc"),
    fCost:   document.getElementById("fCost"),
    fStatus: document.getElementById("fStatus")
  };

  var current = 0;
  var listNodes = [];

  function renderMedia(m) {
    el.media.textContent = "";
    if (m.img) {
      el.media.classList.add("idx__media--filled");
      var img = document.createElement("img");
      img.src = m.img;
      img.alt = m.name + " — " + m.title;
      el.media.appendChild(img);
      return;
    }
    el.media.classList.remove("idx__media--filled");
    el.media.appendChild(cloudSvg("idx__cloud", "ak-cloud"));
    el.media.appendChild(span("idx__tag", tag("HERO_" + m.name)));
  }

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

  function renderMember() {
    var m = MEMBERS[current];
    if (!m) return;

    el.index.textContent = pad(current);
    el.village.textContent = m.village;
    el.name.textContent = m.name;
    el.title.textContent = m.title;
    el.bio.textContent = m.bio;
    el.note.textContent = m.note;
    renderMedia(m);
    renderAbilities(m.abilities);

    el.dAge.textContent    = m.age;
    el.dYears.textContent  = m.years;
    el.dRank.textContent   = m.rank;
    el.dNature.textContent = m.nature;
    el.dRing.textContent   = m.ring;
    el.dFinger.textContent = m.finger;
    el.dBounty.textContent = m.bounty;
    el.dStatus.textContent = m.status;

    el.fName.textContent   = m.forbidden.name;
    el.fDesc.textContent   = m.forbidden.desc;
    el.fCost.textContent   = m.forbidden.cost;
    el.fStatus.textContent = m.forbidden.status;
    el.fStatus.classList.toggle("is-soft", isSoftStatus(m.forbidden.status));

    document.title = m.name + " — AuraGroup";

    listNodes.forEach(function (btn, k) {
      var on = k === current;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-current", on ? "true" : "false");
    });
  }

  function select(i, scrollToFile) {
    current = (i + MEMBERS.length) % MEMBERS.length;
    renderMember();
    if (scrollToFile) {
      var target = document.getElementById("membres");
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  function buildList() {
    if (!el.list) return;
    var frag = document.createDocumentFragment();

    MEMBERS.forEach(function (m, k) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "idx__item";
      btn.setAttribute("aria-label", "Ouvrir le dossier de " + m.name);
      btn.appendChild(span("idx__item-num", pad(k)));
      btn.appendChild(span("idx__item-name", m.name));
      btn.appendChild(span("idx__item-title", m.title));
      btn.addEventListener("click", function () { select(k, false); });

      listNodes.push(btn);
      li.appendChild(btn);
      frag.appendChild(li);
    });

    el.list.appendChild(frag);
  }

  /* --------------------------------- Registre des kinjutsu (cartes) */

  function buildPowers() {
    if (!el.powers) return;
    var frag = document.createDocumentFragment();
    var sigils = ["ak-sigil", "ak-ring", "ak-cloud"];

    MEMBERS.forEach(function (m, k) {
      var f = m.forbidden;
      if (!f) return;

      var card = document.createElement("article");
      card.className = "power";

      card.appendChild(cloudSvg("power__sigil", sigils[k % sigils.length]));

      var holder = document.createElement("button");
      holder.type = "button";
      holder.className = "power__holder";
      holder.textContent = pad(k) + " — " + m.name;
      holder.setAttribute("aria-label", "Ouvrir le dossier de " + m.name);
      holder.addEventListener("click", function () { select(k, true); });
      card.appendChild(holder);

      var title = document.createElement("h3");
      title.className = "power__title";
      title.textContent = f.name;
      card.appendChild(title);

      var desc = document.createElement("p");
      desc.className = "power__desc";
      desc.textContent = f.desc;
      card.appendChild(desc);

      var foot = document.createElement("span");
      foot.className = "power__foot";
      var cost = span("power__cost");
      cost.appendChild(span("power__cost-label", "Prix à payer"));
      cost.appendChild(span("", f.cost));
      foot.appendChild(cost);
      foot.appendChild(span("power__status" + (isSoftStatus(f.status) ? " is-soft" : ""), f.status));
      card.appendChild(foot);

      frag.appendChild(card);
    });

    el.powers.appendChild(frag);
  }

  /* ------------------------------------------ Domaines (accordéon) */

  function initAccordion() {
    var acc = document.getElementById("acc");
    if (!acc) return;
    var items = [].slice.call(acc.querySelectorAll(".acc__item"));

    items.forEach(function (item) {
      var head = item.querySelector(".acc__head");
      if (!head) return;
      head.addEventListener("click", function () {
        var willOpen = !item.classList.contains("is-open");
        items.forEach(function (other) {
          other.classList.remove("is-open");
          var h = other.querySelector(".acc__head");
          if (h) h.setAttribute("aria-expanded", "false");
        });
        if (willOpen) {
          item.classList.add("is-open");
          head.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* --------------------------------------------------- Compteurs */

  function countUp(node) {
    var target = parseFloat(node.dataset.count);
    if (isNaN(target)) return;

    var width = node.textContent.trim().length;
    function out(v) { return String(Math.round(v)).padStart(width, "0"); }

    if (reduceMotion) { node.textContent = out(target); return; }

    var start = target > 100 ? Math.max(0, target - 30) : 0;
    var dur = 1100;
    var t0 = null;

    function step(now) {
      if (t0 === null) t0 = now;
      var p = Math.min(1, (now - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      node.textContent = out(start + (target - start) * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var nodes = [].slice.call(document.querySelectorAll("[data-count]"));
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(countUp);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* --------------------------------------- Formulaire (maquette) */

  function initForm() {
    var form = document.getElementById("form");
    var status = document.getElementById("formStatus");
    if (!form || !status) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var missing = [].slice.call(form.querySelectorAll("[required]"))
        .filter(function (f) { return !String(f.value).trim(); });

      if (missing.length) {
        status.textContent = "Merci de remplir les champs obligatoires.";
        status.classList.add("is-error");
        missing[0].focus();
        return;
      }

      status.classList.remove("is-error");
      status.textContent = "Maquette de présentation : le formulaire n'est relié à aucun serveur. "
        + "À brancher lors de l'intégration.";
    });
  }

  /* ------------------------------------------------------- init */

  initVillages();
  buildList();
  buildPowers();
  renderMember();
  initAccordion();
  initCounters();
  initForm();
})();
