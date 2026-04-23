import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "コシヒカリ",
    origin: "新潟県魚沼産",
    price: 3980,
    description:
      "日本を代表する最高級ブランド米。粘りが強く、甘みと旨みのバランスが絶妙です。",
    imageUrl: "/images/koshihikari.webp",
  },
  {
    id: "2",
    name: "あきたこまち",
    origin: "秋田県産",
    price: 2980,
    description:
      "あっさりとした食感で、冷めても美味しいのが特徴。お弁当やおにぎりに最適です。",
    imageUrl: "/images/akitakomachi.webp",
  },
  {
    id: "3",
    name: "ひとめぼれ",
    origin: "宮城県産",
    price: 2780,
    description:
      "柔らかい食感と上品な甘みが特徴。どんなおかずにも合う万能なお米です。",
    imageUrl: "/images/hitomebore.webp",
  },
  {
    id: "4",
    name: "ササニシキ",
    origin: "宮城県産",
    price: 3280,
    description:
      "さっぱりとした口当たりで、寿司職人にも愛される逸品。和食との相性抜群です。",
    imageUrl: "/images/sasanishiki.webp",
  },
  {
    id: "5",
    name: "つや姫",
    origin: "山形県産",
    price: 3480,
    description:
      "白く透明感のある粒と豊かな甘み。炊き上がりのツヤが美しい人気品種です。",
    imageUrl: "/images/tsuyahime.webp",
  },
  {
    id: "6",
    name: "ゆめぴりか",
    origin: "北海道産",
    price: 3180,
    description:
      "北海道が誇る最高峰のお米。濃厚な甘みともちもちとした食感が楽しめます。",
    imageUrl: "/images/yumepirika.webp",
  },
];
