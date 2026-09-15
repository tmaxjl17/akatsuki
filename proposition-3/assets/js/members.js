/* =========================================================
   AuraGroup — données des membres
   ---------------------------------------------------------
   DEUX IMAGES PAR MEMBRE, toutes deux facultatives :

     img:      "assets/img/pain.jpg"
               Visuel principal. C'est LUI qui remplit les lettres
               géantes de la couverture (effet « image dans le
               texte »). Sans lui, les lettres reçoivent un dégradé.
               Sert aussi de portrait dans le volet 02 du dossier.
               → cadrage large, sujet centré, minimum 1400 px de large.

     imgFront: "assets/img/pain-decoupe.png"
               PNG DÉTOURÉ, fond transparent. Posé PAR-DESSUS les
               lettres : c'est ce qui fait passer le visage devant
               la typographie, comme sur la couverture de référence.
               Facultatif — sans lui, l'image reste seulement
               à l'intérieur des lettres.

   Chaque membre alimente trois zones de la page :
     - le héros et sa fiche technique (dossier) ;
     - la galerie des membres ;
     - le registre des techniques interdites (clé `forbidden`).
   ========================================================= */

window.MEMBERS = [
  {
    name: "Pain",
    title: "Le Dieu d'Amegakure",
    village: "Amegakure",
    img: "../assets/img/pain.png",
    imgFocus: "center 8%",
    bio: "Chef de l'Akatsuki, Nagato manie le Rinnegan à travers six corps distincts. Il prêche un cycle de haine que seule une douleur partagée pourrait briser, et considère la paix comme une équation à résoudre par la force.",
    note: "Il n'apparaît jamais en personne : les six Voies de Pain sont des cadavres reliés à son chakra par des récepteurs métalliques, pilotés depuis la tour d'Ame. Trois des dix membres n'ont jamais vu son vrai visage.",
    age: "35",
    years: "20",
    rank: "Chef — rang S",
    nature: "Les cinq natures",
    ring: "Rei 零",
    finger: "Pouce droit",
    bounty: "Inestimable",
    status: "Actif",
    abilities: [
      { kind: "Dojutsu",   name: "Rinnegan",       desc: "Accès aux six voies et au contrôle total du chakra." },
      { kind: "Technique", name: "Shinra Tensei",  desc: "Répulsion gravitationnelle dévastatrice." },
      { kind: "Ultime",    name: "Chibaku Tensei", desc: "Création d'un satellite de gravité captive." }
    ],
    forbidden: {
      name: "Rinne Tensei",
      desc: "Rappelle à la vie tous ceux que l'utilisateur a tués dans un même rayon.",
      cost: "La vie de l'invocateur",
      status: "Classe Zéro"
    }
  },
  {
    name: "Itachi",
    title: "Le Corbeau de Konoha",
    village: "Konohagakure",
    img: "../assets/img/itachi.png",
    imgCover: "../assets/img/Itachi-walpaper.jpg",
    imgFocus: "center 32%",
    bio: "Génie du clan Uchiwa, Itachi a sacrifié son nom pour protéger son village. Son Sharingan hypnotique fait de chaque regard un piège, et son calme absolu masque une maladie qui le consume.",
    note: "Diplômé de l'académie à sept ans, capitaine ANBU à treize. Son dossier de désertion tient en une ligne : « a éliminé son clan en une nuit, épargné un seul survivant ». Aucun rapport n'a jamais expliqué cette exception.",
    age: "21",
    years: "8",
    rank: "Déserteur de rang S",
    nature: "Katon · Suiton",
    ring: "Shu 朱",
    finger: "Auriculaire droit",
    bounty: "Scellée par Konoha",
    status: "Actif",
    abilities: [
      { kind: "Dojutsu",   name: "Mangekyo Sharingan", desc: "Illusion et flamme noire au premier regard." },
      { kind: "Technique", name: "Tsukuyomi",          desc: "Trois jours de torture en une seconde." },
      { kind: "Ultime",    name: "Susanoo",            desc: "Avatar de chakra armé de l'épée de Totsuka." }
    ],
    forbidden: {
      name: "Izanami",
      desc: "Enferme la cible dans une boucle qui ne se brise que le jour où elle accepte ce qu'elle est.",
      cost: "La vue de l'œil qui la lance",
      status: "Proscrite par le clan"
    }
  },
  {
    name: "Kisame",
    title: "Le Monstre sans Queue",
    village: "Kirigakure",
    bio: "L'un des Sept Épéistes de la Brume, Kisame porte Samehada, une lame vivante qui dévore le chakra. Sa réserve d'énergie est si vaste qu'on le compare à une bête à queue.",
    note: "Ancien agent de la section de renseignement de Kiri, il a exécuté son propre supérieur pour empêcher une fuite d'informations. La brume ne le réclame plus : elle a effacé son nom des rôles.",
    age: "32",
    years: "11",
    rank: "Déserteur de rang S",
    nature: "Suiton",
    ring: "Minami 南",
    finger: "Annulaire gauche",
    bounty: "315 000 000 ryōs",
    status: "Actif",
    abilities: [
      { kind: "Arme",      name: "Samehada",          desc: "Épée vivante qui absorbe le chakra ennemi." },
      { kind: "Technique", name: "Suiton : Daikodan", desc: "Requin d'eau aspirant les attaques adverses." },
      { kind: "Ultime",    name: "Dôme Aquatique",    desc: "Transforme le champ de bataille en océan." }
    ],
    forbidden: {
      name: "Fusion Samehada",
      desc: "Greffe l'utilisateur à sa lame pour puiser dans une réserve de chakra sans fond.",
      cost: "Dissout peu à peu ce qui restait d'humain",
      status: "Tolérée"
    }
  },
  {
    name: "Deidara",
    title: "L'Art est une Explosion",
    village: "Iwagakure",
    bio: "Artificier obsédé par l'éphémère, Deidara pétrit son argile explosive avec les bouches greffées dans ses paumes. Pour lui, la beauté n'existe qu'à l'instant de la détonation.",
    note: "Recruté de force : il a rejoint l'organisation après avoir perdu un pari contre Itachi, et n'a jamais digéré cette défaite. Le plus jeune membre, et de loin le plus imprévisible en mission.",
    age: "19",
    years: "4",
    rank: "Déserteur de rang S",
    nature: "Doton · Katon — Bakuton",
    ring: "Sei 青",
    finger: "Index droit",
    bounty: "180 000 000 ryōs",
    status: "Actif",
    abilities: [
      { kind: "Kekkei Genkai", name: "Bakuton",   desc: "Argile explosive modelée en créatures." },
      { kind: "Technique",     name: "C2 Dragon", desc: "Monture aérienne larguant des bombes." },
      { kind: "Ultime",        name: "C4 Karura", desc: "Nuage de nanobombes invisibles." }
    ],
    forbidden: {
      name: "C0 — Ultime Œuvre",
      desc: "Convertit le corps entier en une seule bombe d'un rayon de dix kilomètres.",
      cost: "L'artiste meurt avec son œuvre",
      status: "Proscrite"
    }
  },
  {
    name: "Konan",
    title: "L'Ange de Papier",
    village: "Amegakure",
    bio: "Seule femme de l'organisation, Konan transforme son corps en millions de feuilles. Fidèle à Nagato et à la mémoire de Yahiko, elle veille sur Ame comme une divinité silencieuse.",
    note: "C'est elle qui tient les registres, distribue les anneaux et fixe les binômes. Les nouveaux membres passent devant elle avant de rencontrer Pain — beaucoup ne vont pas plus loin.",
    age: "35",
    years: "20",
    rank: "Second — rang S",
    nature: "Futon · Suiton",
    ring: "Haku 白",
    finger: "Majeur droit",
    bounty: "Non répertoriée",
    status: "Actif",
    abilities: [
      { kind: "Technique", name: "Shikigami no Mai",  desc: "Corps de papier insaisissable et tranchant." },
      { kind: "Soutien",   name: "Ailes d'Ange",      desc: "Vol libre et reconnaissance aérienne." },
      { kind: "Ultime",    name: "Mer de Parchemins", desc: "Six cents milliards de talismans explosifs." }
    ],
    forbidden: {
      name: "Mer de Parchemins",
      desc: "Six cents milliards de talismans explosifs déployés sur un lac entier.",
      cost: "Six mois de préparation, la moitié de son corps",
      status: "Tolérée"
    }
  },
  {
    name: "Sasori",
    title: "Le Marionnettiste Rouge",
    village: "Sunagakure",
    bio: "Sasori a converti son propre corps en marionnette pour atteindre l'éternité. Sa collection compte trois cents pantins humains, chacun conservant les techniques de sa victime.",
    note: "Il ne lui reste qu'un seul organe vivant, un noyau de chakra logé dans un cylindre gravé du kanji « scorpion ». Le reste n'est que bois, lames et poison — l'éternité qu'il réclamait, obtenue au prix de tout le reste.",
    age: "35",
    years: "19",
    rank: "Déserteur de rang S",
    nature: "Doton · Katon",
    ring: "Gyoku 玉",
    finger: "Pouce gauche",
    bounty: "Effacée des registres de Suna",
    status: "Actif",
    abilities: [
      { kind: "Technique", name: "Kugutsu no Jutsu",            desc: "Contrôle simultané de centaines de pantins." },
      { kind: "Arsenal",   name: "Poison Éternel",              desc: "Venin paralysant à l'issue fatale en trois jours." },
      { kind: "Ultime",    name: "Hiruko & Troisième Kazekage", desc: "Sable de fer et lames empoisonnées." }
    ],
    forbidden: {
      name: "Hitokugutsu",
      desc: "Transforme un corps humain en marionnette qui conserve ses techniques d'origine.",
      cost: "Exige un adversaire encore vivant",
      status: "Proscrite par Suna"
    }
  },
  {
    name: "Hidan",
    title: "L'Immortel de Jashin",
    village: "Yugakure",
    bio: "Fanatique du dieu Jashin, Hidan ne peut pas mourir. Son rituel sanglant retourne chaque blessure qu'il s'inflige contre sa cible, faisant de la douleur une prière.",
    note: "Son village natal avait renoncé aux armes pour devenir une station thermale. Il l'a pris comme une insulte personnelle et a massacré la garnison avant de partir. C'est le seul membre que l'organisation ne peut pas exécuter en cas de trahison.",
    age: "22",
    years: "3",
    rank: "Déserteur de rang S",
    nature: "Non répertoriée",
    ring: "San 三",
    finger: "Auriculaire gauche",
    bounty: "Aucune — déclaré mort trois fois",
    status: "Actif",
    abilities: [
      { kind: "Rituel", name: "Malédiction de Jashin", desc: "Lie sa victime à son propre corps." },
      { kind: "Arme",   name: "Faux à trois lames",    desc: "Portée longue, prélèvement de sang." },
      { kind: "Ultime", name: "Immortalité",           desc: "Survit à la décapitation et au démembrement." }
    ],
    forbidden: {
      name: "Rituel de Mort de Jashin",
      desc: "Lie l'officiant à sa cible : chaque plaie qu'il s'ouvre s'ouvre aussi chez elle.",
      cost: "Il doit encaisser tout ce qu'il inflige",
      status: "Culte interdit"
    }
  },
  {
    name: "Kakuzu",
    title: "Le Trésorier aux Cinq Cœurs",
    village: "Takigakure",
    bio: "Plus vieux membre de l'organisation, Kakuzu arrache les cœurs de ses adversaires pour prolonger sa vie. Mercenaire avant tout, il évalue chaque mission à sa prime.",
    note: "Il a affronté le Premier Hokage, perdu, et n'a jamais pardonné à son village de l'avoir puni pour cet échec. Soixante-seize ans plus tard, il finance encore l'organisation en revendant les têtes qu'il croise en chemin.",
    age: "91",
    years: "76",
    rank: "Déserteur de rang S",
    nature: "Les cinq natures",
    ring: "Hoku 北",
    finger: "Majeur gauche",
    bounty: "Chasse les primes des autres",
    status: "Actif",
    abilities: [
      { kind: "Technique", name: "Jiongu",               desc: "Fils noirs recousant et animant son corps." },
      { kind: "Réserve",   name: "Cinq Cœurs",           desc: "Cinq natures de chakra, cinq vies." },
      { kind: "Ultime",    name: "Masques Élémentaires", desc: "Feu, vent et foudre en tir combiné." }
    ],
    forbidden: {
      name: "Jiongu — Fils de Terre",
      desc: "Des milliers de fils vivants recousent le corps et y greffent des cœurs volés.",
      cost: "Un cœur arraché par vie supplémentaire",
      status: "Volée à Takigakure"
    }
  },
  {
    name: "Tobi",
    title: "Le Masque Tourbillonnant",
    village: "Inconnu",
    bio: "Silhouette masquée au comportement erratique, Tobi dissimule une identité et un plan bien plus anciens qu'AuraGroup lui-même. Rien ne l'atteint, littéralement.",
    note: "Officiellement le dernier arrivé, chargé des courses et du renseignement. Officieusement, personne ne sait qui lui a donné l'anneau de Sasori, ni pourquoi Zetsu lui rapporte directement.",
    age: "Inconnu",
    years: "Inconnu",
    rank: "Fondateur présumé",
    nature: "Katon · Suiton · Mokuton",
    ring: "Gyoku 玉",
    finger: "Repris à Sasori",
    bounty: "N'existe dans aucun registre",
    status: "Sous surveillance",
    abilities: [
      { kind: "Dojutsu",   name: "Kamui",        desc: "Intangibilité et téléportation dimensionnelle." },
      { kind: "Technique", name: "Espace-Temps", desc: "Absorbe toute attaque dans sa dimension." },
      { kind: "Ultime",    name: "Œil de Lune",  desc: "Projet d'illusion infinie sur le monde." }
    ],
    forbidden: {
      name: "Mugen Tsukuyomi",
      desc: "Projette une illusion définitive sur chaque être vivant depuis la lune.",
      cost: "Exige les neuf bijuu réunis",
      status: "Classe Apocalypse"
    }
  },
  {
    name: "Zetsu",
    title: "L'Espion Végétal",
    village: "Inconnu",
    bio: "Moitié blanche, moitié noire, Zetsu fusionne avec la terre et la végétation pour observer chaque bataille. Il sert de relais, de témoin et parfois de juge.",
    note: "Il n'a jamais été recruté : il était déjà là. Les deux moitiés se contredisent en public et se parlent à voix basse en mission, et aucun membre n'a réussi à déterminer laquelle décide.",
    age: "Inconnu",
    years: "Inconnu",
    rank: "Éclaireur — rang S",
    nature: "Mokuton",
    ring: "Gai 外",
    finger: "Index gauche",
    bounty: "Aucune",
    status: "Sous surveillance",
    abilities: [
      { kind: "Technique", name: "Mayfly",        desc: "Déplacement souterrain instantané." },
      { kind: "Soutien",   name: "Clones Blancs", desc: "Armée de copies imitant ses cibles." },
      { kind: "Ultime",    name: "Absorption",    desc: "Draine le chakra par ses spores." }
    ],
    forbidden: {
      name: "Clonage Spirituel",
      desc: "Produit des copies parfaites d'une cible à partir d'un simple prélèvement.",
      cost: "Consomme la chair de l'hôte",
      status: "Sous surveillance"
    }
  }
];
