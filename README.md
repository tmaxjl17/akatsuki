# AuraGroup — propositions de landing page

Trois directions artistiques pour la même landing page, présentées côte à côte
depuis une page d'accueil qui sert de sélecteur.

Le contenu est identique d'une proposition à l'autre : dix membres, leurs
dossiers, leurs techniques interdites, la chronologie et le registre des
missions. Seule la mise en scène change, pour que la comparaison porte sur la
direction artistique et pas sur ce qui est raconté.

---

## Lancer le projet

Aucune étape de build, aucune dépendance. Trois façons d'ouvrir :

| Méthode | Commande / action |
|---|---|
| Fichier direct | Ouvrir `index.html` dans un navigateur |
| WAMP | Démarrer Apache, puis `http://localhost/akatsuki/` |
| Serveur ponctuel | `npx serve .` ou `python -m http.server` depuis la racine |

Les chemins sont relatifs : les trois méthodes fonctionnent.

### Vérifier le rendu sans ouvrir de fenêtre

```bash
chrome --headless --disable-gpu --hide-scrollbars \
  --virtual-time-budget=7000 --window-size=1400,900 \
  --screenshot=out.png "file:///C:/wamp64/www/akatsuki/index.html"
```

---

## Structure

```
akatsuki/
├── index.html                  Page d'accueil — sélection des propositions
├── assets/
│   ├── css/hub.css             Styles de la page d'accueil
│   └── img/                    Bibliothèque d'images PARTAGÉE par les trois
│                               propositions (référencée en ../assets/img/…)
├── proposition-1/              « Dix ombres, un seul dessein »
├── proposition-2/              « Le registre d'Ame »
└── proposition-3/              « Registre 01 »
```

Chaque proposition est **autonome** — son propre `index.html`, son propre CSS,
son propre JS. On peut en modifier une sans toucher aux autres. Seul le dossier
`assets/img/` est commun, pour ne pas dupliquer les visuels.

```
proposition-N/
├── index.html
└── assets/
    ├── css/style.css
    ├── js/members.js           Données des dix membres
    └── js/app.js               Interactions
```

---

## Les trois propositions

### 01 — Dix ombres, un seul dessein
Sombre et écarlate. Fond `#0A0A0A`, rouge `#DC0000`, Anton + Barlow.
Écran de démarrage animé, héros plein écran avec sélecteur de membre, galerie
en grille de cartes, registre des interdits en tableau.

### 02 — Le registre d'Ame
Claire et éditoriale, direction inspirée de [voodoogroup.africa](https://voodoogroup.africa).
Ivoire et rouge sang `#A40F0B`, Oswald + Jost + Petit Formal Script.
Titre script posé sur une condensée massive, bandeau rouge défilant, sélecteur
d'implantations, domaines en accordéon, chiffres animés, formulaire.

### 03 — Registre 01
Mise en page de magazine sur papier ivoire `#EFEBE3`, Archivo Black + Space Mono
+ Noto Sans JP. **Le nom du membre est rempli par son visuel**
(`background-clip: text`), texte vertical japonais, fiches numérotées, barres
d'indices, exergue et code-barres.

---

## Modifier le contenu

### Ajouter ou changer un membre

Tout part de `proposition-N/assets/js/members.js`. Un membre :

```js
{
  name: "Pain",
  title: "Le Dieu d'Amegakure",
  village: "Amegakure",
  img: "../assets/img/pain.png",     // facultatif
  bio: "…",
  note: "…",                          // second paragraphe
  age: "35", years: "20",
  rank: "…", nature: "…",
  ring: "Rei 零", finger: "Pouce droit",
  bounty: "…", status: "Actif",
  abilities: [ { kind, name, desc }, … ],
  forbidden: { name, desc, cost, status }
}
```

Le fichier est dupliqué dans les trois propositions : **reporter la
modification dans les trois** pour qu'elles restent comparables.

### Ajouter une image

Déposer le fichier dans `assets/img/` à la racine, puis le déclarer sur le
membre en `../assets/img/nom.png`. Sans `img`, la proposition affiche un cadre
`[IMAGE_…]` — le repli est géré membre par membre, on peut n'en illustrer
que quelques-uns.

**Proposition 3, deux champs de plus :**

- `imgCover` — visuel réservé aux lettres géantes de la couverture. Un gros
  plan contrasté fonctionne bien mieux qu'un plan en pied. À défaut, `img`
  est utilisé.
- `imgFocus` — cadrage vertical, ex. `"center 8%"`, pour viser le visage dans
  les lettres. Défaut : `"center 28%"`.
- `imgFront` — PNG **détouré à fond transparent**, posé par-dessus les lettres
  pour que le visage passe devant la typographie. Facultatif et actuellement
  inutilisé, faute de fichier détouré.

> Les URL d'image sont rendues absolues en JS avant d'être injectées dans la
> variable CSS `--fill`. Un chemin relatif dans une variable CSS est résolu
> depuis la feuille de style et non depuis la page — ce qui faisait disparaître
> tout le titre. Ne pas revenir en arrière là-dessus.

### Ajouter une quatrième proposition

1. Dupliquer un dossier `proposition-N` ;
2. dans `index.html` à la racine, copier un bloc `<a class="prop">` et mettre à
   jour `href`, numéro, titre et description. Un commentaire dans le fichier
   rappelle la marche à suivre.

---

## Accessibilité et confort

- Tous les éléments cliquables sont de vrais `<button>` ou `<a>`, utilisables
  au clavier, avec `aria-current` sur l'élément actif.
- Lien d'évitement en tête de chaque page.
- `prefers-reduced-motion` respecté partout : écran de démarrage, compteurs,
  défilement et transitions sont neutralisés.
- Aucune image de fond animée — elles ont été retirées à la demande.
- Repli prévu pour les navigateurs sans `background-clip: text` : les titres
  de la proposition 3 redeviennent noirs et lisibles.

---

## Points en suspens

- **8 membres sur 10 n'ont pas de visuel.** Seuls Pain et Itachi sont illustrés.
- **`imgFront` inactif** — il faut des PNG détourés à fond transparent.
- **Les indices chiffrés de la proposition 3** (puissance, vitesse, technique,
  endurance, dans `proposition-3/assets/js/extras.js`) sont des valeurs
  estimées, contrairement au reste du contenu. À valider ou remplacer.
- **Les formulaires ne sont pas connectés.** Ils valident les champs
  obligatoires puis affichent explicitement qu'il s'agit d'une maquette. À
  brancher sur une messagerie lors de l'intégration.
- **Les visuels de mission et de campagne** sont des cadres à remplacer.

---

## Crédits et licence

Maquettes de présentation. Les noms, personnages et éléments d'univers de
Naruto appartiennent à leurs ayants droit et ne sont utilisés ici qu'à titre
de démonstration. La direction artistique de la proposition 2 s'inspire
publiquement du site de Voodoo Group ; les motifs ont été redessinés, aucun
fichier source n'a été repris.
