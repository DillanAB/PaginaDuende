// Archivo con datos de prueba para el desarrollo de la aplicación
// mientras no se tenga conexión con la base de datos

export const sample_makeupServices: any[] = [
  {
    name: 'Catrina corazón',
    price: 25000,
    image: 'https://example.com/image.jpg',
    description: 'Traditional Mexican skull makeup',
    category: "Caracterización",
    subCategories: ["Catrinas"],
    tags: ['Mexico', 'Horror']
  },

  {
    name: 'El Grinch',
    price: 30000,
    image: 'https://example.com/image.jpg',
    description: 'Makeup inspired by the Grinch movie',
    category: "Caracterización",
    subCategories: ["Personajes"],
    tags: ['Cartoon']
  }
];

export const sample_cats: any[] = [
  {
    name: 'Caracterización',
    subcategories: []
  },
  {
    name: 'Básico',
    subcategories: []
  },
  {
    name: 'Eventos',
    subcategories: []
  }

];

export const sample_catsProduct: any[] = [
  {
    name: 'Maquillaje',
    subcategories: []
  },
  {
    name: 'Pelucas',
    subcategories: []
  },
  {
    name: 'Lentes',
    subcategories: []
  }

]

export const  sample_subcats: any =[
  {
    fromCatName: 'Caracterización',
    subCatName: 'Catrinas'
  },
  {
    fromCatName: 'Caracterización',
    subCatName: 'Personajes'
  },
  {
    fromCatName: 'Caracterización',
    subCatName: 'Calaveras'
  },
  {
    fromCatName: 'Caracterización',
    subCatName: 'Hadas'
  },
  {
    fromCatName: 'Caracterización',
    subCatName: 'Villanos'
  },
  {
    fromCatName: 'Caracterización',
    subCatName: 'Zombies'
  }
];

export const  sample_subcatsProduct: any =[
  {
    fromCatName: 'Maquillaje',
    subCatName: 'Labial'
  },
  {
    fromCatName: 'Maquillaje',
    subCatName: 'Corrector'
  },
  {
    fromCatName: 'Maquillaje',
    subCatName: 'Base'
  },
  {
    fromCatName: 'Pelucas',
    subCatName: 'Afro'
  },
  {
    fromCatName: 'Lentes',
    subCatName: 'Estrella'
  },
  {
    fromCatName: 'Lentes',
    subCatName: 'Cuadrados'
  }
]

export const sample_tags: any[] = [
  {
    
    name: 'Mexico',
  },
  {
    name: 'Horror',
  },
  {
    name: 'Cartoon',
  },
  {
    name: 'Famoso'
  }
];

export const sample_tagsProduct: any[] = [
  {
    
    name: 'Belleza',
  },
  {
    name: 'Disfraz'
  }
];

export const sample_users : any[] = [
  {
    name: 'Duende',
    email: 'duende@gmail.com',
    password: 'ddMK',
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'jd@gmail.com',
    password: '1234',
    isAdmin: false
  },
  {
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    password: '1234',
    isAdmin: false
  },
  {
    name: 'Dillan',
    email: 'dillan@gmail.com',
    password: 'DAB',
    isAdmin: false
  }
];


export const sample_Products: any[] = [
  {
    name: 'Labial',
    price: 3000,
    image: 'https://example.com/image.jpg',
    category: "Maquillaje",
    subCategories: ["Labial"],
    availability: true,
    description: 'Lips for personal makeup, red color'
  },
  {
    name: 'Corrector',
    price: 4500,
    image: 'https://example.com/image.jpg',
    category: "Maquillaje",
    subCategories: ["Corrector"],
    availability: true,
    description: 'Concealer for personal makeup, beige tone'
  }
];