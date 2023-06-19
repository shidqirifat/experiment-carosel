export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Nike Yoga Dri-FIT Luxe",
    category: "Women's Cropped Tank",
    price: 600_000,
    image: `https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_3.0/h_309,c_limit/6c6bdc2e-abbb-4b38-b57d-0a0d557b3f3f/yoga-dri-fit-luxe-cropped-tank-xvfQ34.png`,
  },
  {
    id: 2,
    name: "Nike Yoga Dri-FIT Luxe",
    category: "Women's Cropped Tank",
    price: 600_000,
    image: `
    https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_300,c_limit/9a3a1c1c-6ec9-4789-99ab-d912da331e75/dri-fit-all-over-print-short-sleeve-yoga-top-fHz8s2.png`,
  },
  {
    id: 3,
    name: "Nike Yoga Dri-FIT Luxe",
    category: "Women's Cropped Tank",
    price: 600_000,
    image: `https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_300,c_limit/d85578ff-ce35-470b-b73c-cac94ebbbb62/go-firm-support-high-waisted-7-8-leggings-with-pockets-frbRZ0.png`,
  },
  {
    id: 4,
    name: "Nike Yoga Dri-FIT Luxe",
    category: "Women's Cropped Tank",
    price: 600_000,
    image: `https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_300,c_limit/cdc89764-fe54-478c-a722-2cbe738e0d7b/yoga-dri-fit-top-fR3jt6.png`,
  },
  {
    id: 5,
    name: "Nike Yoga Dri-FIT Luxe",
    category: "Women's Cropped Tank",
    price: 600_000,
    image: `https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_300,c_limit/9a3a1c1c-6ec9-4789-99ab-d912da331e75/dri-fit-all-over-print-short-sleeve-yoga-top-fHz8s2.png`,
  },
  {
    id: 6,
    name: "Nike Yoga Dri-FIT Luxe",
    category: "Women's Cropped Tank",
    price: 600_000,
    image: `https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_3.0/h_309,c_limit/6c6bdc2e-abbb-4b38-b57d-0a0d557b3f3f/yoga-dri-fit-luxe-cropped-tank-xvfQ34.png`,
  },
];

export { products };
