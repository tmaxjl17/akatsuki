/* =========================================================
   AuraGroup — Proposition 3, données additionnelles
   ---------------------------------------------------------
   `members.js` est le fichier commun aux trois propositions,
   laissé intact. Cette maquette a besoin de trois champs de
   plus, fusionnés par nom au chargement : le nom en katakana
   pour l'habillage magazine, le binôme, et quatre indices
   chiffrés pour les barres de la fiche.
   ========================================================= */

window.MEMBER_EXTRAS = {
  Pain:    { kana: "ペイン",   partner: "Konan",   stats: { puissance: 98, vitesse: 80, technique: 95, endurance: 85 } },
  Itachi:  { kana: "イタチ",   partner: "Kisame",  stats: { puissance: 88, vitesse: 92, technique: 97, endurance: 58 } },
  Kisame:  { kana: "キサメ",   partner: "Itachi",  stats: { puissance: 95, vitesse: 78, technique: 82, endurance: 98 } },
  Deidara: { kana: "デイダラ", partner: "Sasori",  stats: { puissance: 84, vitesse: 74, technique: 88, endurance: 70 } },
  Konan:   { kana: "コナン",   partner: "Pain",    stats: { puissance: 76, vitesse: 82, technique: 86, endurance: 72 } },
  Sasori:  { kana: "サソリ",   partner: "Deidara", stats: { puissance: 86, vitesse: 68, technique: 94, endurance: 90 } },
  Hidan:   { kana: "ヒダン",   partner: "Kakuzu",  stats: { puissance: 80, vitesse: 70, technique: 64, endurance: 100 } },
  Kakuzu:  { kana: "カクズ",   partner: "Hidan",   stats: { puissance: 92, vitesse: 74, technique: 86, endurance: 96 } },
  Tobi:    { kana: "トビ",     partner: "Zetsu",   stats: { puissance: 90, vitesse: 88, technique: 96, endurance: 90 } },
  Zetsu:   { kana: "ゼツ",     partner: "Tobi",    stats: { puissance: 60, vitesse: 66, technique: 78, endurance: 85 } }
};

/* Remplissage des lettres, à défaut d'un visuel. Dès qu'un membre
   reçoit un `img` dans members.js, la photo prend la place du dégradé. */
window.MEMBER_FILLS = [
  "radial-gradient(130% 150% at 28% 18%, #E8342B 0%, #A6120F 34%, #3A0A0B 70%, #120708 100%)",
  "radial-gradient(120% 160% at 72% 22%, #C9201C 0%, #7E0E0D 40%, #241014 74%, #0E0A0C 100%)",
  "linear-gradient(118deg, #14100F 0%, #5E0C0C 42%, #D42A22 68%, #2B0B0C 100%)",
  "radial-gradient(150% 130% at 20% 78%, #F04A32 0%, #A11410 36%, #2A0C0D 72%, #100809 100%)",
  "linear-gradient(200deg, #2A1016 0%, #8E1218 44%, #E03A2E 72%, #170A0C 100%)",
  "radial-gradient(120% 140% at 62% 32%, #B8231C 0%, #6D0E0C 42%, #1F0B0C 76%, #0C0708 100%)",
  "linear-gradient(145deg, #0F0A0B 0%, #7A0F10 38%, #E5372A 66%, #1C090A 100%)",
  "radial-gradient(160% 140% at 34% 64%, #D22B20 0%, #8C1210 38%, #2C0E10 74%, #0E0708 100%)",
  "linear-gradient(95deg, #1A0C10 0%, #66100F 40%, #CF2A22 70%, #200A0C 100%)",
  "radial-gradient(140% 150% at 74% 70%, #A8221B 0%, #5F0D0C 40%, #1B0A0B 76%, #0B0607 100%)"
];
