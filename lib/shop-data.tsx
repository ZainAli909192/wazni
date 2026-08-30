export type ProductType =
  | "Rings"
  | "Earrings"
  | "Necklaces"
  | "Bracelets"
  | "Pendants"
  | "Complete Sets";

export type Material =
  | "Yellow Gold"
  | "White Gold"
  | "Rose Gold"
  | "Platinum";

export type Product = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  image: string;
  productType: ProductType;
  material: Material;
  featured?: boolean;
  createdAt: string;
};

export const productTypes: ProductType[] = [
  "Rings",
  "Earrings",
  "Necklaces",
  "Bracelets",
  "Pendants",
  "Complete Sets",
];

export const materials: Material[] = [
  "Yellow Gold",
  "White Gold",
  "Rose Gold",
  "Platinum",
];

export const priceRanges = [
  {
    id: "under-5000",
    label: "Under AED 5,000",
    min: 0,
    max: 4999,
  },
  {
    id: "5000-10000",
    label: "AED 5,000 - AED 10,000",
    min: 5000,
    max: 10000,
  },
  {
    id: "10000-20000",
    label: "AED 10,000 - AED 20,000",
    min: 10000,
    max: 20000,
  },
  {
    id: "20000-50000",
    label: "AED 20,000 - AED 50,000",
    min: 20000,
    max: 50000,
  },
  {
    id: "50000-plus",
    label: "AED 50,000+",
    min: 50000,
    max: Infinity,
  },
];

export const sortOptions = [
  {
    value: "featured",
    label: "Featured",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "price-low-high",
    label: "Price: Low to High",
  },
  {
    value: "price-high-low",
    label: "Price: High to Low",
  },
] as const;

export const products: Product[] = [
  {
    id: 1,
    name: "Diamond Halo Ring",
    slug: "diamond-halo-ring",
    sku: "WZ-RNG-001",
    price: 8220,
    image: "/images/products/ring-1.png",
    productType: "Rings",
    material: "Yellow Gold",
    featured: true,
    createdAt: "2026-08-28",
  },
  {
    id: 2,
    name: "Rose Gold Diamond Ring",
    slug: "rose-gold-diamond-ring",
    sku: "WZ-RNG-002",
    price: 8260,
    image: "/images/products/ring-2.png",
    productType: "Rings",
    material: "Rose Gold",
    featured: true,
    createdAt: "2026-08-27",
  },
  {
    id: 3,
    name: "Square Diamond Ring",
    slug: "square-diamond-ring",
    sku: "WZ-RNG-003",
    price: 8840,
    image: "/images/products/ring-3.png",
    productType: "Rings",
    material: "Yellow Gold",
    createdAt: "2026-08-25",
  },
  {
    id: 4,
    name: "Diamond Wave Ring",
    slug: "diamond-wave-ring",
    sku: "WZ-RNG-004",
    price: 8920,
    image: "/images/products/ring-4.png",
    productType: "Rings",
    material: "Yellow Gold",
    createdAt: "2026-08-24",
  },
  {
    id: 5,
    name: "Diamond Circle Ring",
    slug: "diamond-circle-ring",
    sku: "WZ-RNG-005",
    price: 9210,
    image: "/images/products/ring-5.png",
    productType: "Rings",
    material: "Yellow Gold",
    createdAt: "2026-08-22",
  },
  {
    id: 6,
    name: "Diamond Leaf Ring",
    slug: "diamond-leaf-ring",
    sku: "WZ-RNG-006",
    price: 9250,
    image: "/images/products/ring-6.png",
    productType: "Rings",
    material: "Yellow Gold",
    createdAt: "2026-08-21",
  },
  {
    id: 7,
    name: "Heart Diamond Ring",
    slug: "heart-diamond-ring",
    sku: "WZ-RNG-007",
    price: 9500,
    image: "/images/products/ring-7.png",
    productType: "Rings",
    material: "Rose Gold",
    createdAt: "2026-08-20",
  },
  {
    id: 8,
    name: "Floral Diamond Ring",
    slug: "floral-diamond-ring",
    sku: "WZ-RNG-008",
    price: 9690,
    image: "/images/products/ring-8.png",
    productType: "Rings",
    material: "Rose Gold",
    createdAt: "2026-08-18",
  },

  {
    id: 9,
    name: "Sapphire Diamond Earrings",
    slug: "sapphire-diamond-earrings",
    sku: "WZ-EAR-001",
    price: 12400,
    image: "/images/products/earrings-1.png",
    productType: "Earrings",
    material: "White Gold",
    featured: true,
    createdAt: "2026-08-26",
  },
  {
    id: 10,
    name: "Emerald Drop Earrings",
    slug: "emerald-drop-earrings",
    sku: "WZ-EAR-002",
    price: 17500,
    image: "/images/products/earrings-2.png",
    productType: "Earrings",
    material: "White Gold",
    createdAt: "2026-08-23",
  },

  {
    id: 11,
    name: "Sapphire Diamond Necklace",
    slug: "sapphire-diamond-necklace",
    sku: "WZ-NEC-001",
    price: 33023,
    image: "/images/products/necklace-1.png",
    productType: "Necklaces",
    material: "White Gold",
    featured: true,
    createdAt: "2026-08-29",
  },
  {
    id: 12,
    name: "Emerald Diamond Necklace",
    slug: "emerald-diamond-necklace",
    sku: "WZ-NEC-002",
    price: 41368,
    image: "/images/products/necklace-2.png",
    productType: "Necklaces",
    material: "White Gold",
    createdAt: "2026-08-17",
  },

  {
    id: 13,
    name: "Classic Diamond Bracelet",
    slug: "classic-diamond-bracelet",
    sku: "WZ-BRA-001",
    price: 22150,
    image: "/images/products/bracelet-1.png",
    productType: "Bracelets",
    material: "White Gold",
    createdAt: "2026-08-16",
  },
  {
    id: 14,
    name: "Diamond Loop Bracelet",
    slug: "diamond-loop-bracelet",
    sku: "WZ-BRA-002",
    price: 28750,
    image: "/images/products/bracelet-2.png",
    productType: "Bracelets",
    material: "White Gold",
    createdAt: "2026-08-15",
  },

  {
    id: 15,
    name: "Emerald Diamond Pendant",
    slug: "emerald-diamond-pendant",
    sku: "WZ-PEN-001",
    price: 14800,
    image: "/images/products/necklace-3.png",
    productType: "Pendants",
    material: "White Gold",
    createdAt: "2026-08-14",
  },

  {
    id: 16,
    name: "Aquamarine Jewellery Set",
    slug: "aquamarine-jewellery-set",
    sku: "WZ-SET-001",
    price: 63341,
    image: "/images/products/set-1.png",
    productType: "Complete Sets",
    material: "White Gold",
    featured: true,
    createdAt: "2026-08-28",
  },
];
