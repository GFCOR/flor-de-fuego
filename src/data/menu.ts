export type Item = { name: string; price: string; note?: string; star?: boolean };
export type Section = { title: string; subtitle?: string; items: Item[] };

export const menu: Section[] = [
  {
    title: "Café negro",
    subtitle: "Moka italiana o aeropress",
    items: [
      { name: "Espresso (doble)", price: "7.50" },
      { name: "Americano", price: "8.00" },
      { name: "Americano grande", price: "9.00" },
    ],
  },
  {
    title: "Café con leche",
    subtitle: "Las recetas clásicas",
    items: [
      { name: "Capuccino", price: "9.50", star: true },
      { name: "Capuccino frío", price: "10.00" },
      { name: "Flat white", price: "10.50" },
      { name: "Mocaccino", price: "12.00", note: "Con cacao · + S/ 3.50 con leche de coco" },
      { name: "Mocaccino frío", price: "12.50" },
    ],
  },
  {
    title: "Café frío",
    subtitle: "Frescura todo el año",
    items: [
      { name: "Café tonic", price: "12.00", note: "Espresso con agua tónica" },
      { name: "Cold brew orange", price: "14.50", note: "Jugo de naranja, hielo y miel de abejas" },
      {
        name: "Rosso brew",
        price: "15.00",
        note: "Flor de Jamaica, kion y un toque de canela · + S/ 5.00 con shot de pisco",
      },
      { name: "Cold brew frutos exóticos", price: "16.00", note: "Frutas de la selva y la sierra" },
    ],
  },
  {
    title: "Café especial",
    subtitle: "Nuestras bebidas de autor",
    items: [
      { name: "Choco miel", price: "14.00", note: "Con cacao y miel", star: true },
      { name: "Cholo café", price: "14.50", note: "Aceite de coco, miel y harina de coca" },
      { name: "Choco miel ice", price: "16.00" },
      { name: "Iced cholo café", price: "17.00", note: "Aceite de oliva, miel y harina de coca" },
      { name: "Super Espresso", price: "9.50", note: "Espresso con aceite de oliva" },
    ],
  },
  {
    title: "Métodos",
    subtitle: "Cafeteras artesanales, clásicas y modernas",
    items: [
      { name: "Gota a gota (de la abuela)", price: "10.00" },
      { name: "Prensa francesa", price: "12.00", note: "Café en inmersión, cuerpo denso e intenso" },
      { name: "V60 · Origami", price: "12.50", note: "Filtrado por goteo, taza limpia y aromática" },
      { name: "Aeropress", price: "12.50", note: "Presión manual, extracción rápida y suave" },
    ],
  },
  {
    title: "Chocolate y matcha",
    items: [
      {
        name: "Chocolate caliente",
        price: "15.50",
        note: "Puro cacao con leche · + S/ 3.50 con leche de coco",
      },
      { name: "Kat en Calma", price: "14.50", note: "Matcha latte con miel infusionada" },
      { name: "Sol en Verde", price: "14.50", note: "Matcha con agua tónica" },
    ],
  },
  {
    title: "Salados",
    subtitle: "Para aplacar el hambre",
    items: [
      { name: "Empanada clásica", price: "9.00", note: "De pollo o carne, con su limoncito peruano" },
      { name: "Ciabatta con queso y jamón", price: "10.20", note: "Queso andino y jamón bondiola" },
      { name: "Empanada Porky", price: "10.20", note: "Chancho al cilindro" },
      { name: "Empanada en Flor", price: "10.50", note: "Aceite de oliva extra virgen, cúrcuma, orégano y sal de maras", star: true },
      {
        name: "Huevazo Tostón",
        price: "18.50",
        note: "Masa madre, huevo de corral, salsa de tomate, albahaca al olivo y pan de yuca",
      },
      { name: "Hamburguesa clásica", price: "19.50", note: "Res, tomate y lechuga" },
      { name: "Hamburguesa Cholona", price: "24.50", note: "Res, queso andino, jamón bondiola artesanal" },
    ],
  },
  {
    title: "Cositas dulces",
    subtitle: "De las manos de María Belén",
    items: [
      { name: "Media luna clásica", price: "8.10" },
      { name: "El Poderoso", price: "8.50", note: "Galletón de avena, nueces, chía y aceite de oliva" },
      { name: "Media luna con chocolate", price: "9.80" },
      { name: "Keke de chocolate y plátano", price: "9.90", note: "Cacao amazónico, harina de avena y huevos de corral", star: true },
      { name: "Bombón de dátiles", price: "10.50", note: "Almendras, dátiles, pistacho y chocolate" },
      { name: "Torta de chocolate", price: "16.00", note: "Cacao amazónico, camote y huevos de corral" },
    ],
  },
  {
    title: "Infusiones y frescos",
    items: [
      { name: "Agua sin gas", price: "3.50" },
      { name: "Agua con gas", price: "4.00" },
      { name: "Frutos silvestres", price: "8.00" },
      { name: "Jugo de naranja o papaya", price: "8.50", note: "220 ml de pura fruta" },
      { name: "Jamaica y kion", price: "9.00", note: "Miel de abejas y gotas de limón piurano" },
      { name: "Cáscara de cacao", price: "9.00", note: "Infusión de cacao y canela" },
      { name: "Rosso Light", price: "10.00", note: "Jamaica con hielo" },
      { name: "Kola Escocesa y Pasteurina", price: "7.50" },
    ],
  },
  {
    title: "Chocolates",
    subtitle: "Maranke · Alto Marankiari, Ucayali",
    items: [
      {
        name: "Tableta Bitter",
        price: "20.50",
        note: "70 gr · cacao criollo y chuncho 70% con azúcar de caña",
      },
      { name: "Tableta Pistacho", price: "20.50", note: "70 gr" },
      { name: "Tableta Nibs de cacao", price: "20.50", note: "70 gr" },
    ],
  },
  {
    title: "Café & cariño",
    subtitle: "After office intelectual",
    items: [
      { name: "Vermouth clásico", price: "16.50", note: "Vermouth rosso, hielo… y su olivo verde" },
      { name: "Café pisquero", price: "17.50", note: "Pisco acholado iqueño, cold brew y miel de abejas" },
      { name: "Irish coffee", price: "18.00", note: "Con whisky y vermouth" },
      { name: "Marroni", price: "20.00", note: "Pisco, vermouth italiano, cold brew de Cajamarca y Campari" },
    ],
  },
];

export const rituals = [
  {
    name: "Espresso de Flor",
    price: "13.00",
    detail: "Aeropress dark, trozos de cacao Maranke y dados de queso andino",
  },
  {
    name: "Pausa librera",
    price: "17.00",
    detail: "Americano para quedarse con keke de plátano y chocolate",
  },
  {
    name: "Otoño en mi pueblo",
    price: "20.00",
    detail: "Mocaccino acompañado del galletón El Poderoso",
  },
  {
    name: "Sesenta grados",
    price: "23.00",
    detail: "V60 con café premium y bombón de dátiles",
  },
];

