export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type CustomerAddress = {
  id: number;
  label: string;

  firstName: string;
  lastName: string;

  phone: string;

  emirate: string;
  area: string;

  street: string;
  unit?: string;
  landmark?: string;

  isDefault: boolean;
};

export type CustomerOrder = {
  id: string;

  date: string;

  status:
    | "Confirmed"
    | "Processing"
    | "Delivered"
    | "Cancelled";

  total: number;

  items: {
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
};

export const mockCustomer: Customer = {
  firstName: "Ahmed",
  lastName: "Daniyal",

  email: "ahmed@example.com",

  phone: "+971 50 123 4567",
};

export const mockAddresses: CustomerAddress[] = [
  {
    id: 1,

    label: "Home",

    firstName: "Ahmed",
    lastName: "Daniyal",

    phone: "+971 50 123 4567",

    emirate: "Abu Dhabi",
    area: "Rabdan",

    street: "Al Maqta' St",

    unit: "Villa 12",

    landmark: "Near Qaryat Al Beri",

    isDefault: true,
  },

  {
    id: 2,

    label: "Office",

    firstName: "Ahmed",
    lastName: "Daniyal",

    phone: "+971 50 123 4567",

    emirate: "Abu Dhabi",
    area: "Al Reem Island",

    street: "Al Maryah Street",

    unit: "Office 504",

    isDefault: false,
  },
];

export const mockOrders: CustomerOrder[] = [
  {
    id: "WZ-2026-00128",

    date: "28 August 2026",

    status: "Confirmed",

    total: 16480,

    items: [
      {
        name: "Diamond Halo Ring",

        image:
          "/images/products/ring-1.jpg",

        quantity: 1,

        price: 8220,
      },

      {
        name:
          "Rose Gold Diamond Ring",

        image:
          "/images/products/ring-2.jpg",

        quantity: 1,

        price: 8260,
      },
    ],
  },

  {
    id: "WZ-2026-00111",

    date: "12 August 2026",

    status: "Delivered",

    total: 22150,

    items: [
      {
        name:
          "Classic Diamond Bracelet",

        image:
          "/images/products/bracelet-1.jpg",

        quantity: 1,

        price: 22150,
      },
    ],
  },
];