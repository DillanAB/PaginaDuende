"use strict";
// Archivo con datos de prueba para el desarrollo de la aplicación
// mientras no se tenga conexión con la base de datos
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample_Products = exports.sample_users = exports.sample_tagsProduct = exports.sample_tags = exports.sample_subcatsProduct = exports.sample_subcats = exports.sample_catsProduct = exports.sample_cats = exports.sample_makeupServices = void 0;
exports.sample_makeupServices = [
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
exports.sample_cats = [
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
exports.sample_catsProduct = [
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
];
exports.sample_subcats = [
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
exports.sample_subcatsProduct = [
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
];
exports.sample_tags = [
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
exports.sample_tagsProduct = [
    {
        name: 'Belleza',
    },
    {
        name: 'Disfraz'
    }
];
exports.sample_users = [
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
exports.sample_Products = [
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
exports.sample_Events = [
    {
      id: 1,
      title: 'Entrega Pedido 1',
      start: '2023-11-14T10:30:00',
      end: '2023-11-14T11:30:00',
      color: 'red',
      type: 'Entrega'
    },
    {
      id: 2,
      title: 'Curso maquillaje avanzado',
      start: '2023-11-12T11:00:00',
      end: '2023-11-12T12:00:00',
      color: 'green',
      type: 'Curso'
    }
];