import type { Lang } from "./i18n";

export type Bi = { it: string; en: string };
export type DishTag = "veg" | "gf" | "raw" | "new";

export type Dish = {
  id: string;
  name: Bi;
  desc: Bi;
  /** Prezzo unico (es. "14,50"). */
  price?: string;
  /** Prezzi per misura (es. poke firmati: Regular/Large/XL). */
  sizes?: { label: string; price: string }[];
  /** Scelte per i "componi tu" (es. yogurt bowl, cheesecake): gruppi con opzioni. */
  choices?: { group: Bi; options: Bi[] }[];
  /** true = prezzo da confermare in cassa. */
  ask?: boolean;
  img?: string;
  tags?: DishTag[];
  /** Link opzionale (es. rimando a mestizo-lab.com). */
  link?: { label: Bi; href: string };
};

export type MenuCategory = {
  id: string;
  title: Bi;
  intro: Bi;
  kind: "poke" | "single" | "drinks";
  dishes: Dish[];
  /** Link opzionale a un sito esterno (es. Cucina messicana → mestizo-lab.com). */
  link?: { label: Bi; href: string };
};

/* ------------------------------------------------------------------
   PREZZI — dal sistema d'ordine ufficiale AloAlo (xMenu), lug 2026.
   Componi la tua pokè: Regular 12,00 · Large 14,50 · XL 17,00.
   Proposte firmate: 14,50 fisso.
   ------------------------------------------------------------------ */

export const POKE_REGULAR = "12,00";
export const POKE_LARGE = "14,50";
export const POKE_XL = "17,00";
export const POKE_SIGNATURE = "14,50";
// Poke firmati per misura (xMenu): Regular 14,50 · Large +2,50 · XL +5,00.
export const SIGNATURE_SIZES = [
  { label: "Regular", price: "14,50" },
  { label: "Large", price: "17,00" },
  { label: "XL", price: "19,50" },
];

export const signatureBowls: Dish[] = [
  {
    id: "ocean",
    name: { it: "Pokè Ocean", en: "Ocean Pokè" },
    desc: {
      it: "Riso venere, tonno marinato alla soia, maionese spicy, wakame, avocado, germogli di soia, papaya, ravanello e crispy onion.",
      en: "Black rice, soy-marinated tuna, spicy mayo, wakame, avocado, soy sprouts, papaya, radish and crispy onion.",
    },
    img: "/img/poke-ocean.jpg",
    tags: ["raw"],
    price: POKE_SIGNATURE,
    sizes: SIGNATURE_SIZES,
  },
  {
    id: "sky",
    name: { it: "Pokè Sky", en: "Sky Pokè" },
    desc: {
      it: "Riso basmati, salmone marinato soia e cipollotto, teriyaki, edamame, avocado, mango, zenzero, cavolo rosso e cocco.",
      en: "Basmati rice, soy & spring-onion marinated salmon, teriyaki, edamame, avocado, mango, ginger, red cabbage and coconut.",
    },
    img: "/img/poke-sky.jpg",
    tags: ["raw"],
    price: POKE_SIGNATURE,
    sizes: SIGNATURE_SIZES,
  },
  {
    id: "earth",
    name: { it: "Pokè Earth", en: "Earth Pokè" },
    desc: {
      it: "Quinoa, pollo, maionese curry & mango, feta, cetrioli, ceci, ananas, avocado, zucchino e noci.",
      en: "Quinoa, chicken, curry & mango mayo, feta, cucumber, chickpeas, pineapple, avocado, courgette and walnuts.",
    },
    img: "/img/poke-earth.jpg",
    tags: ["gf"],
    price: POKE_SIGNATURE,
    sizes: SIGNATURE_SIZES,
  },
  {
    id: "nature",
    name: { it: "Pokè Nature", en: "Nature Pokè" },
    desc: {
      it: "Lattuga, tofu, salsa thaipeanuts, pomodorini, avocado, carote, edamame, cavolo rosso e mandorle.",
      en: "Lettuce, tofu, thai peanut sauce, cherry tomatoes, avocado, carrots, edamame, red cabbage and almonds.",
    },
    img: "/img/poke-nature.jpg",
    tags: ["veg"],
    price: POKE_SIGNATURE,
    sizes: SIGNATURE_SIZES,
  },
];

/* Crea il tuo poke — 6 step (le porzioni variano per taglia) */
export const builderSteps: { n: number; title: Bi; note?: Bi; options: Bi[] }[] = [
  {
    n: 1,
    title: { it: "Base", en: "Base" },
    note: { it: "x2", en: "x2" },
    options: [
      { it: "Riso venere", en: "Black rice" },
      { it: "Riso basmati", en: "Basmati rice" },
      { it: "Riso giapponese (+1€)", en: "Japanese rice (+€1)" },
      { it: "Quinoa", en: "Quinoa" },
      { it: "Mix farro e orzo", en: "Farro & barley mix" },
      { it: "Lattuga", en: "Lettuce" },
    ],
  },
  {
    n: 2,
    title: { it: "Proteina", en: "Protein" },
    note: { it: "x2", en: "x2" },
    options: [
      { it: "Tonno", en: "Tuna" },
      { it: "Salmone", en: "Salmon" },
      { it: "Pollo", en: "Chicken" },
      { it: "Tofu", en: "Tofu" },
      { it: "Pulled pork", en: "Pulled pork" },
      { it: "Salmone cotto", en: "Cooked salmon" },
      { it: "Tonno cotto", en: "Cooked tuna" },
      { it: "Gambero cotto", en: "Cooked prawn" },
      { it: "Uovo sodo", en: "Boiled egg" },
      { it: "Polpetta veg quinoa e raparossa", en: "Veg quinoa & beetroot ball" },
      { it: "Polpettine green spinaci e piselli", en: "Green spinach & pea balls" },
      { it: "Polpette salmone, patata ed erba cipollina", en: "Salmon, potato & chive balls" },
      { it: "Pollo glassato teriyaki", en: "Teriyaki-glazed chicken" },
      { it: "Proteina extra (+2€)", en: "Extra protein (+€2)" },
    ],
  },
  {
    n: 3,
    title: { it: "Marinatura", en: "Marinade" },
    options: [
      { it: "Soia e cipollotto", en: "Soy & spring onion" },
      { it: "Olio EVO", en: "Extra virgin olive oil" },
      { it: "Soia togarashi e cipollotto", en: "Togarashi soy & spring onion" },
      { it: "Soia", en: "Soy" },
      { it: "Soia piccante", en: "Spicy soy" },
      { it: "Olio e scorza di lime", en: "Oil & lime zest" },
      { it: "Olio, lime e pepe rosa", en: "Oil, lime & pink pepper" },
    ],
  },
  {
    n: 4,
    title: { it: "Salsa", en: "Sauce" },
    note: { it: "x2", en: "x2" },
    options: [
      { it: "Leche de tigre", en: "Leche de tigre" },
      { it: "Teriyaki", en: "Teriyaki" },
      { it: "Soia", en: "Soy" },
      { it: "Soia piccante", en: "Spicy soy" },
      { it: "Mayo curry e mango", en: "Curry & mango mayo" },
      { it: "Mayo miele e grani di senape", en: "Honey & mustard-seed mayo" },
      { it: "Mayo aglio e sesamo", en: "Garlic & sesame mayo" },
      { it: "Spicy mayo", en: "Spicy mayo" },
      { it: "Soia gluten free", en: "Gluten-free soy" },
      { it: "Salsa yogurt alle erbe", en: "Herb yogurt sauce" },
      { it: "Olio extravergine", en: "Extra virgin olive oil" },
      { it: "Agrolime (veg)", en: "Agrolime (veg)" },
      { it: "Thaipeanuts (veg)", en: "Thai peanut (veg)" },
    ],
  },
  {
    n: 5,
    title: { it: "Ingredienti", en: "Toppings" },
    note: { it: "Reg 4 · Lg 5 · XL 6", en: "Reg 4 · Lg 5 · XL 6" },
    options: [
      { it: "Avocado (+0,50€)", en: "Avocado (+€0.50)" },
      { it: "Cipolla marinata", en: "Marinated onion" },
      { it: "Pomodorini", en: "Cherry tomatoes" },
      { it: "Mais", en: "Sweetcorn" },
      { it: "Feta", en: "Feta" },
      { it: "Edamame", en: "Edamame" },
      { it: "Cetriolo", en: "Cucumber" },
      { it: "Germogli di soia", en: "Soy sprouts" },
      { it: "Zenzero", en: "Ginger" },
      { it: "Cavolo rosso", en: "Red cabbage" },
      { it: "Zucchine", en: "Courgette" },
      { it: "Ceci", en: "Chickpeas" },
      { it: "Ravanelli", en: "Radish" },
      { it: "Alga wakame", en: "Wakame seaweed" },
      { it: "Mango", en: "Mango" },
      { it: "Tobiko (+1€)", en: "Tobiko (+€1)" },
      { it: "Ananas", en: "Pineapple" },
      { it: "Papaya (+0,50€)", en: "Papaya (+€0.50)" },
      { it: "Spinacino", en: "Baby spinach" },
      { it: "Jalapeño piccante", en: "Spicy jalapeño" },
      { it: "Carote", en: "Carrots" },
      { it: "Patata dolce", en: "Sweet potato" },
      { it: "Rucola", en: "Rocket" },
      { it: "Fagiolini alla menta", en: "Mint green beans" },
      { it: "Philadelphia (+1€)", en: "Philadelphia (+€1)" },
    ],
  },
  {
    n: 6,
    title: { it: "Crispy", en: "Crispy" },
    options: [
      { it: "Cipolla fritta", en: "Fried onion" },
      { it: "Semi di chia", en: "Chia seeds" },
      { it: "Semi di sesamo", en: "Sesame seeds" },
      { it: "Cocco", en: "Coconut" },
      { it: "Noci", en: "Walnuts" },
      { it: "Mandorle", en: "Almonds" },
      { it: "Alga nori", en: "Nori seaweed" },
      { it: "Arachidi", en: "Peanuts" },
      { it: "Chips di patata dolce (+0,50€)", en: "Sweet potato chips (+€0.50)" },
    ],
  },
];

export const menu: MenuCategory[] = [
  {
    id: "poke",
    kind: "single",
    title: { it: "Le nostre proposte Pokè", en: "Our signature pokè" },
    intro: {
      it: "Ricette d’autore già bilanciate. Oppure creale tu, passo dopo passo.",
      en: "Chef-balanced recipes. Or build your own, step by step.",
    },
    dishes: signatureBowls,
  },
  {
    id: "avotoast",
    kind: "single",
    title: { it: "AvoToast", en: "AvoToast" },
    intro: {
      it: "Pane d’orzo tostato e avocado cremoso, di mare o di terra.",
      en: "Toasted barley bread and creamy avocado, from the sea or the land.",
    },
    dishes: [
      {
        id: "avo-cheese",
        name: { it: "AvoToast Cheese", en: "Cheese AvoToast" },
        desc: {
          it: "Pane d’orzo, avocado, pomodorini, feta, coriandolo e mandorle.",
          en: "Barley bread, avocado, cherry tomatoes, feta, coriander and almonds.",
        },
        price: "10,00",
        img: "/img/avotoast-cheese.jpg",
        tags: ["veg"],
      },
      {
        id: "avo-hummus",
        name: { it: "AvoToast Hummus", en: "Hummus AvoToast" },
        desc: {
          it: "Pane d’orzo, hummus di ceci, rucola, ravanello, avocado, lime e semi di sesamo.",
          en: "Barley bread, chickpea hummus, rocket, radish, avocado, lime and sesame seeds.",
        },
        price: "10,00",
        img: "/img/avotoast-hummus.jpg",
        tags: ["veg"],
      },
      {
        id: "avo-chicken",
        name: { it: "AvoToast Chicken", en: "Chicken AvoToast" },
        desc: {
          it: "Pane d’orzo, avocado, pollo, feta, cavolo rosso e noci.",
          en: "Barley bread, avocado, chicken, feta, red cabbage and walnuts.",
        },
        price: "11,00",
        img: "/img/avotoast-chicken.jpg",
      },
      {
        id: "avo-passion",
        name: { it: "AvoToast Passion", en: "Passion AvoToast" },
        desc: {
          it: "Pane d’orzo, avocado, spinacino, salmone marinato finocchietto e pepe rosa, passion fruit, scaglie di cocco e sesamo.",
          en: "Barley bread, avocado, baby spinach, wild fennel & pink-pepper marinated salmon, passion fruit, coconut flakes and sesame.",
        },
        price: "12,00",
        img: "/img/avotoast-passion.jpg",
        tags: ["raw", "new"],
      },
      {
        id: "avo-mestizo",
        name: { it: "AvoToast Mestizo Lab", en: "Mestizo Lab AvoToast" },
        desc: {
          it: "Insalata di cavolo rosso e carote tipo americana (coleslaw), pulled pork, ananas alla piastra e cipolla marinata.",
          en: "American-style red cabbage & carrot slaw, pulled pork, grilled pineapple and marinated onion.",
        },
        price: "12,00",
        img: "/img/avotoast-mestizo.jpg",
        tags: ["new"],
        link: {
          label: { it: "Scopri Mestizo Lab", en: "Discover Mestizo Lab" },
          href: "https://mestizo-lab.com",
        },
      },
    ],
  },
  {
    id: "tapas",
    kind: "single",
    title: { it: "Da stuzzicare e condividere", en: "To nibble & share" },
    intro: {
      it: "Da condividere, o da aggiungere alla tua bowl.",
      en: "To share, or to add to your bowl.",
    },
    dishes: [
      {
        id: "hummus-tapas",
        name: { it: "Hummus di ceci & nachos", en: "Chickpea hummus & nachos" },
        desc: {
          it: "Hummus di ceci con nachos di mais.",
          en: "Chickpea hummus with corn nachos.",
        },
        price: "6,00",
        img: "/img/hummus.jpg",
        tags: ["veg"],
      },
      {
        id: "wakame",
        name: { it: "Alga wakame", en: "Wakame salad" },
        desc: {
          it: "Insalata di alga wakame con semi di sesamo.",
          en: "Wakame seaweed salad with sesame seeds.",
        },
        price: "6,00",
        img: "/img/wakame.png",
        tags: ["veg", "gf"],
      },
      {
        id: "polpette",
        name: { it: "Tris di polpettine", en: "Trio of bites" },
        desc: {
          it: "Polpette green (spinaci e piselli), veg (rapa rossa e quinoa) e salmone (patata ed erba cipollina), con due salse.",
          en: "Green (spinach & peas), veg (beetroot & quinoa) and salmon (potato & chives) bites, with two dips.",
        },
        price: "5,50",
        img: "/img/polpette.png",
        tags: ["new"],
      },
      {
        id: "poke-nachos",
        name: { it: "Poke Nachos", en: "Poke Nachos" },
        desc: {
          it: "Tortilla chips, avocado, jalapeño, salsa della casa (stile messicano) e cipollotto. A scelta: tonno, salmone o gamberi.",
          en: "Tortilla chips, avocado, jalapeño, house sauce (Mexican style) and spring onion. Your choice: tuna, salmon or prawn.",
        },
        sizes: [
          { label: "Individuale", price: "8,00" },
          { label: "Da condividere", price: "15,00" },
        ],
        img: "/img/poke-nachos.jpg",
      },
    ],
  },
  {
    id: "burger",
    kind: "single",
    title: { it: "Burgers", en: "Burgers" },
    intro: {
      it: "Il nostro tocco hawaiano nel pane, con chips di patata dolce.",
      en: "Our Hawaiian twist in a bun, with sweet-potato chips.",
    },
    dishes: [
      {
        id: "burger-tuna",
        name: { it: "Tuna burger", en: "Tuna burger" },
        desc: {
          it: "Bun ai semi, tartare di tonno con olive taggiasche, stracciatella, spinacino, mayo al cappero e cipolla marinata.",
          en: "Seeded bun, tuna tartare with Taggiasca olives, stracciatella, baby spinach, caper mayo and marinated onion.",
        },
        price: "14,50",
        img: "/img/burger-tartare.png",
        tags: ["raw", "new"],
      },
      {
        id: "burger-spring",
        name: { it: "Spring burger", en: "Spring burger" },
        desc: {
          it: "Bun ai semi, gamberi piastrati, hummus di piselli, bacon croccante, rucola e mayo al lime.",
          en: "Seeded bun, seared prawns, pea hummus, crispy bacon, rocket and lime mayo.",
        },
        price: "14,50",
        img: "/img/burger-shrimp.jpg",
        tags: ["new"],
      },
    ],
  },
  {
    id: "dolci",
    kind: "single",
    title: { it: "Dolci home made", en: "Homemade desserts" },
    intro: {
      it: "Il finale dolce, fatto in casa.",
      en: "A sweet, homemade finish.",
    },
    dishes: [
      {
        id: "yogurt-bowl",
        name: { it: "Yogurt Bowl", en: "Yogurt Bowl" },
        desc: {
          it: "Yogurt greco montato, con frutta, guarnizione e croccante a scelta.",
          en: "Whipped Greek yogurt, with your choice of fruit, topping and crunch.",
        },
        price: "6,00",
        img: "/img/yogurt-bowl.jpg",
        tags: ["veg"],
        choices: [
          {
            group: { it: "Frutta", en: "Fruit" },
            options: [
              { it: "Ananas", en: "Pineapple" },
              { it: "Mango", en: "Mango" },
              { it: "Mix bosco", en: "Mixed berries" },
              { it: "Papaya", en: "Papaya" },
              { it: "Guava", en: "Guava" },
              { it: "Frutto di stagione", en: "Seasonal fruit" },
            ],
          },
          {
            group: { it: "Guarnizione", en: "Topping" },
            options: [
              { it: "Miele", en: "Honey" },
              { it: "Nutella", en: "Nutella" },
              { it: "Burro di arachidi", en: "Peanut butter" },
            ],
          },
          {
            group: { it: "Croccante", en: "Crunch" },
            options: [
              { it: "Granola di cioccolato", en: "Chocolate granola" },
              { it: "Noci", en: "Walnuts" },
              { it: "Mandorle", en: "Almonds" },
              { it: "Cocco", en: "Coconut" },
              { it: "Croccante salato alle mandorle", en: "Salted almond brittle" },
              { it: "Pistacchi (+0,50€)", en: "Pistachios (+€0.50)" },
            ],
          },
        ],
      },
      {
        id: "cinnamon-roll",
        name: { it: "Sfornato del giorno", en: "Bake of the day" },
        desc: {
          it: "I lievitati cambiano ogni giorno: cinnamon roll, concha messicana e altri.",
          en: "The bakes change daily: cinnamon roll, Mexican concha and more.",
        },
        price: "3,50",
        img: "/img/sfornato.jpg",
        link: {
          label: { it: "Scopri Mestizo Lab", en: "Discover Mestizo Lab" },
          href: "https://mestizo-lab.com",
        },
      },
      {
        id: "cheesecake",
        name: { it: "Cheesecake Americana", en: "American Cheesecake" },
        desc: {
          it: "Cheesecake americana fatta in casa, con 2 topping a scelta (+0,50€).",
          en: "Homemade American cheesecake, with 2 toppings of your choice (+€0.50).",
        },
        price: "5,00",
        img: "/img/cheesecake.jpg",
      },
    ],
  },
  {
    id: "cucina-messicana",
    kind: "single",
    title: { it: "Mestizo Lab · Cucina messicana", en: "Mestizo Lab · Mexican kitchen" },
    intro: {
      it: "La cucina messicana di Mestizo Lab, nello stesso locale: piatti da condividere e novità dal Messico.",
      en: "Mestizo Lab's Mexican kitchen, in the same venue: sharing plates and Mexican specials.",
    },
    link: {
      label: { it: "Scopri la Cucina messicana", en: "Discover the Mexican kitchen" },
      href: "https://mestizo-lab.com/cucina-messicana-bologna",
    },
    dishes: [
      {
        id: "guacamole",
        name: { it: "Guacamole & nachos", en: "Guacamole & nachos" },
        desc: {
          it: "Guacamole fresco con nachos di mais.",
          en: "Fresh guacamole with corn nachos.",
        },
        price: "6,00",
        img: "/img/guacamole.jpg",
        tags: ["veg"],
      },
      {
        id: "ceviche",
        name: { it: "Ceviche", en: "Ceviche" },
        desc: {
          it: "Gamberi, avocado, cetriolo, mango, jalapeño, cipolla rossa, coriandolo, limone, pomodoro e tortilla chips.",
          en: "Prawns, avocado, cucumber, mango, jalapeño, red onion, coriander, lemon, tomato and tortilla chips.",
        },
        sizes: [
          { label: "Individuale", price: "10,00" },
          { label: "Da condividere", price: "15,00" },
        ],
        img: "/img/ceviche.jpg",
        tags: ["raw"],
      },
      {
        id: "tacos-gamberi",
        name: { it: "Tacos di gamberi (3)", en: "Prawn tacos (3)" },
        desc: {
          it: "Tortilla, gamberi sale pepe e aglio, guacamole e salsa verde messicana.",
          en: "Tortilla, prawns with salt, pepper & garlic, guacamole and Mexican green sauce.",
        },
        price: "15,00",
        img: "/img/tacos-gamberi.jpg",
        tags: ["new"],
      },
      {
        id: "tostada-tonno",
        name: { it: "Tostadas di tonno (2)", en: "Tuna tostadas (2)" },
        desc: {
          it: "Tortilla croccante, guacamole e insalata messicana di tonno.",
          en: "Crispy tortilla, guacamole and Mexican-style tuna salad.",
        },
        price: "10,00",
        img: "/img/tostada-tonno.jpg",
        tags: ["raw", "new"],
      },
      {
        id: "flautas-patata",
        name: { it: "Flautas di patata (4)", en: "Potato flautas (4)" },
        desc: {
          it: "Tortilla fritta ripiena di patate con salsa de guacamole, panna acida e formaggio.",
          en: "Fried tortilla filled with potato, with guacamole salsa, sour cream and cheese.",
        },
        price: "12,00",
        tags: ["new"],
      },
      {
        id: "enchiladas-rojas",
        name: { it: "Enchiladas Rojas (3)", en: "Red enchiladas (3)" },
        desc: {
          it: "Tortillas di mais nella salsa roja di chile ancho e pasilla, ripiene di formaggio fresco e cipolla. Servite con patate e carote, insalata e salsa verde. Con pollo +3€.",
          en: "Corn tortillas in red ancho & pasilla chile sauce, filled with fresh cheese and onion. Served with potato and carrots, salad and green salsa. With chicken +€3.",
        },
        price: "12,00",
        tags: ["new"],
      },
      {
        id: "pico-de-gallo",
        name: { it: "Pico de Gallo", en: "Pico de Gallo" },
        desc: {
          it: "Salsa fresca messicana di pomodori, cipolla, peperoncino e lime.",
          en: "Fresh Mexican salsa of tomato, onion, chilli and lime.",
        },
        price: "2,00",
        tags: ["veg", "new"],
      },
    ],
  },
  {
    id: "bevande",
    kind: "drinks",
    title: { it: "Bevande", en: "Drinks" },
    intro: {
      it: "Bibite, tè e acqua per accompagnare la tua bowl.",
      en: "Soft drinks, teas and water to go with your bowl.",
    },
    dishes: [
      { id: "acqua-nat", name: { it: "Acqua naturale", en: "Still water" }, desc: { it: "", en: "" }, price: "1,50" },
      { id: "acqua-friz", name: { it: "Acqua frizzante", en: "Sparkling water" }, desc: { it: "", en: "" }, price: "1,50" },
      { id: "coca", name: { it: "Coca Cola", en: "Coca Cola" }, desc: { it: "", en: "" }, price: "3,00" },
      { id: "coca-zero", name: { it: "Coca Cola Zero", en: "Coca Cola Zero" }, desc: { it: "", en: "" }, price: "3,00" },
      { id: "te-pesca", name: { it: "Thè pesca San Benedetto", en: "Peach tea San Benedetto" }, desc: { it: "", en: "" }, price: "3,00" },
      { id: "te-limone", name: { it: "Thè limone San Benedetto", en: "Lemon tea San Benedetto" }, desc: { it: "", en: "" }, price: "3,00" },
      { id: "te-limone-zero", name: { it: "Thè limone San Benedetto Zero", en: "Lemon tea San Benedetto Zero" }, desc: { it: "", en: "" }, price: "3,50" },
      { id: "te-pesca-zero", name: { it: "Thè pesca San Benedetto Zero", en: "Peach tea San Benedetto Zero" }, desc: { it: "", en: "" }, price: "3,50" },
      { id: "indian-limone", name: { it: "Indian Black Tea limone", en: "Indian Black Tea lemon" }, desc: { it: "", en: "" }, price: "4,50" },
      { id: "indian-pesca", name: { it: "Indian Black Tea pesca", en: "Indian Black Tea peach" }, desc: { it: "", en: "" }, price: "4,50" },
      { id: "matcha", name: { it: "Thè verde matcha San Benedetto", en: "Matcha green tea San Benedetto" }, desc: { it: "", en: "" }, price: "4,50" },
      { id: "aranciata-lurisia", name: { it: "Aranciata Lurisia", en: "Lurisia Orangeade" }, desc: { it: "", en: "" }, price: "4,50" },
      { id: "limonata-lurisia", name: { it: "Limonata Lurisia", en: "Lurisia Lemonade" }, desc: { it: "", en: "" }, price: "4,50" },
      { id: "chinotto-lurisia", name: { it: "Chinotto Lurisia", en: "Lurisia Chinotto" }, desc: { it: "", en: "" }, price: "4,50" },
    ],
  },
  {
    id: "birre",
    kind: "drinks",
    title: { it: "Birre", en: "Beers" },
    intro: {
      it: "Una selezione di birre in bottiglia.",
      en: "A selection of bottled beers.",
    },
    dishes: [
      { id: "corona", name: { it: "Corona", en: "Corona" }, desc: { it: "", en: "" }, price: "4,50" },
      { id: "raffo", name: { it: "Raffo Grezza", en: "Raffo Grezza" }, desc: { it: "Bionda non filtrata, 4,8%.", en: "Unfiltered lager, 4.8%." }, price: "5,50" },
      { id: "sapporo", name: { it: "Sapporo", en: "Sapporo" }, desc: { it: "", en: "" }, price: "5,50" },
      { id: "leffe", name: { it: "Leffe Ambrée", en: "Leffe Ambrée" }, desc: { it: "", en: "" }, price: "5,50" },
      { id: "hoegaarden", name: { it: "Hoegaarden", en: "Hoegaarden" }, desc: { it: "", en: "" }, price: "5,50" },
    ],
  },
];

export const tagLabels: Record<DishTag, Bi> = {
  veg: { it: "Veg", en: "Veg" },
  gf: { it: "Gluten free", en: "Gluten free" },
  raw: { it: "Crudo", en: "Raw" },
  new: { it: "Novità", en: "New" },
};

export function biText(bi: Bi, lang: Lang): string {
  return bi[lang];
}
