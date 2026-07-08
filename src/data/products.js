import BrownSugar from '../assets/images/products/brown-sugar.jpg';
import EarlGreyCheesecake from '../assets/images/products/earl-grey-cheesecake.jpg';
import EspressoBoba from '../assets/images/products/espresso-boba.jpg';
import HoneyPearl from '../assets/images/products/honey-pearl.jpg';
import JasmineCloud from '../assets/images/products/jasmine-cloud.jpg';
import LycheeRose from '../assets/images/products/lychee-rose.jpg';
import MangoSago from '../assets/images/products/mango-sago.jpg';
import MatchaDream from '../assets/images/products/matcha-dream.jpg';
import StrawberryCloud from '../assets/images/products/strawberry-cloud.jpg';
import TiramisuCoffee from '../assets/images/products/tiramisu-coffee.jpg';
import TropicalHibiscus from '../assets/images/products/tropical-hibiscus.jpg';
import YuzuPeach from '../assets/images/products/yuzu-peach.jpg';

export const CATEGORY_PRODUCTS = [
  {
    title: 'Classic Milk Tea',
    description: 'Smooth black tea with silky milk and chewy pearls.',
    category: 'classic',
    icon: 'Cup',
    swatchClass: 'bg-brand-mint/80 text-brand-green'
  },
  {
    title: 'Fruit Tea',
    description: 'Refreshing citrus, mango, and berry blends with popping pearls.',
    category: 'fruit',
    icon: 'Berry',
    swatchClass: 'bg-[#fbedeb] text-[#b25449]'
  },
  {
    title: 'Matcha Creations',
    description: 'Ceremonial matcha with a creamy latte finish.',
    category: 'milk',
    icon: 'Leaf',
    swatchClass: 'bg-[#fff3d6] text-[#b7892f]'
  },
  {
    title: 'Signature Blends',
    description: 'Exclusive chef-crafted flavors for a premium pick.',
    category: 'classic',
    icon: 'Sparkle',
    swatchClass: 'bg-[#e7f8f6] text-[#1f7665]'
  }
];

export const FEATURED_PRODUCTS = [
  {
    id: 'midnight-milk-tea',
    title: 'Midnight Milk Tea',
    description: 'Velvet black tea with brown sugar boba, cream foam, and a subtle caramel note.',
    label: 'classic',
    image: BrownSugar,
    rating: 4.9,
    reviews: 428,
    price: 7.5,
    oldPrice: 9.5,
    discount: 21,
    badge: 'Best Seller'
  },
  {
    id: 'tropical-hibiscus',
    title: 'Tropical Hibiscus',
    description: 'Bright hibiscus with pineapple, passionfruit, and popping lemonade pearls.',
    label: 'fruit',
    image: TropicalHibiscus,
    rating: 4.8,
    reviews: 312,
    price: 6.8,
    oldPrice: 8.25,
    discount: 18,
    badge: 'Seasonal'
  },
  {
    id: 'vanilla-matcha-dream',
    title: 'Vanilla Matcha Dream',
    description: 'Silky matcha with house vanilla, oat milk, and a gold dust finish.',
    label: 'matcha',
    image: MatchaDream,
    rating: 5.0,
    reviews: 257,
    price: 8.2,
    oldPrice: 10,
    discount: 18,
    badge: 'Premium'
  },
  {
    id: 'strawberry-cloud-smoothie',
    title: 'Strawberry Cloud Smoothie',
    description: 'Fresh strawberry blend with yogurt cream, crystal pearls, and a soft vanilla finish.',
    label: 'smoothie',
    image: StrawberryCloud,
    rating: 4.9,
    reviews: 189,
    price: 7.9,
    oldPrice: 9.75,
    discount: 19,
    badge: 'New'
  }
];

export const MENU_PRODUCTS = [
  {
    id: 'royal-brown-sugar',
    name: 'Royal Brown Sugar Milk Tea',
    category: 'milk-tea',
    image: BrownSugar,
    rating: 4.9,
    reviews: 428,
    price: 7.5,
    oldPrice: 9.5,
    discount: 21,
    size: 'Large',
    sugar: '70%',
    ice: 'Regular ice',
    availability: 'Available now',
    isNew: false
  },
  {
    id: 'jasmine-cloud',
    name: 'Jasmine Cloud Milk Tea',
    category: 'milk-tea',
    image: JasmineCloud,
    rating: 4.8,
    reviews: 286,
    price: 6.9,
    oldPrice: 8.2,
    discount: 16,
    size: 'Regular',
    sugar: '50%',
    ice: 'Less ice',
    availability: 'Available now',
    isNew: true
  },
  {
    id: 'tropical-hibiscus-menu',
    name: 'Tropical Hibiscus Fruit Tea',
    category: 'fruit-tea',
    image: TropicalHibiscus,
    rating: 4.8,
    reviews: 312,
    price: 6.8,
    oldPrice: 8.25,
    discount: 18,
    size: 'Large',
    sugar: '50%',
    ice: 'Regular ice',
    availability: 'Seasonal',
    isNew: false
  },
  {
    id: 'yuzu-peach-tea',
    name: 'Yuzu Peach Green Tea',
    category: 'fruit-tea',
    image: YuzuPeach,
    rating: 4.7,
    reviews: 198,
    price: 6.4,
    oldPrice: 7.9,
    discount: 19,
    size: 'Regular',
    sugar: '30%',
    ice: 'Regular ice',
    availability: 'Available now',
    isNew: true
  },
  {
    id: 'espresso-boba-latte',
    name: 'Espresso Boba Latte',
    category: 'coffee',
    image: EspressoBoba,
    rating: 4.9,
    reviews: 241,
    price: 7.8,
    oldPrice: 9.25,
    discount: 16,
    size: 'Large',
    sugar: '30%',
    ice: 'Less ice',
    availability: 'Available now',
    isNew: false
  },
  {
    id: 'matcha-vanilla-dream',
    name: 'Vanilla Matcha Dream',
    category: 'milk-tea',
    image: MatchaDream,
    rating: 5,
    reviews: 257,
    price: 8.2,
    oldPrice: 10,
    discount: 18,
    size: 'Large',
    sugar: '50%',
    ice: 'Less ice',
    availability: 'Available now',
    isNew: false
  },
  {
    id: 'strawberry-cloud',
    name: 'Strawberry Cloud Smoothie',
    category: 'smoothie',
    image: StrawberryCloud,
    rating: 4.9,
    reviews: 189,
    price: 7.9,
    oldPrice: 9.75,
    discount: 19,
    size: 'Regular',
    sugar: '70%',
    ice: 'Regular ice',
    availability: 'Available now',
    isNew: true
  },
  {
    id: 'mango-sago',
    name: 'Mango Sago Smoothie',
    category: 'smoothie',
    image: MangoSago,
    rating: 4.8,
    reviews: 174,
    price: 7.2,
    oldPrice: 8.9,
    discount: 19,
    size: 'Large',
    sugar: '70%',
    ice: 'Regular ice',
    availability: 'Seasonal',
    isNew: false
  },
  {
    id: 'earl-grey-cheesecake',
    name: 'Earl Grey Cheesecake',
    category: 'cake',
    image: EarlGreyCheesecake,
    rating: 4.7,
    reviews: 132,
    price: 6.5,
    oldPrice: 7.5,
    discount: 13,
    size: 'Regular',
    sugar: '50%',
    ice: 'No ice',
    availability: 'Pickup only',
    isNew: false
  },
  {
    id: 'honey-pearl-cup',
    name: 'Honey Pearl Topping Cup',
    category: 'topping',
    image: HoneyPearl,
    rating: 4.6,
    reviews: 96,
    price: 2.2,
    oldPrice: 3,
    discount: 27,
    size: 'Regular',
    sugar: '100%',
    ice: 'No ice',
    availability: 'Available now',
    isNew: false
  },
  {
    id: 'tiramisu-cream-coffee',
    name: 'Tiramisu Cream Coffee',
    category: 'coffee',
    image: TiramisuCoffee,
    rating: 4.8,
    reviews: 203,
    price: 8.4,
    oldPrice: 9.9,
    discount: 15,
    size: 'Large',
    sugar: '30%',
    ice: 'Less ice',
    availability: 'Available now',
    isNew: true
  },
  {
    id: 'lychee-rose-tea',
    name: 'Lychee Rose Fruit Tea',
    category: 'fruit-tea',
    image: LycheeRose,
    rating: 4.7,
    reviews: 165,
    price: 6.7,
    oldPrice: 8,
    discount: 16,
    size: 'Regular',
    sugar: '30%',
    ice: 'Regular ice',
    availability: 'Seasonal',
    isNew: false
  }
];

const normalizeProduct = (product) => ({
  id: product.id,
  name: product.name || product.title,
  title: product.title || product.name,
  description: product.description || 'A handcrafted premium tea bar favorite made with balanced flavor, silky texture, and fresh toppings.',
  image: product.image,
  gallery: product.gallery || [
    product.image,
    YuzuPeach,
    TropicalHibiscus
  ],
  rating: product.rating || 4.8,
  reviews: product.reviews || 128,
  discount: product.discount || 0,
  price: product.price,
  oldPrice: product.oldPrice,
  size: product.size || 'Regular',
  sugar: product.sugar || '50%',
  ice: product.ice || 'Regular ice',
  category: product.category || product.label || 'milk-tea',
  tags: product.tags || [
    product.category || product.label || 'milk-tea',
    product.badge,
    product.availability,
    product.size,
    product.sugar,
    product.ice,
    ...(product.name || product.title || '').split(' ')
  ].filter(Boolean)
});

export const CART_PRODUCTS = [
  ...FEATURED_PRODUCTS.map(normalizeProduct),
  ...MENU_PRODUCTS.map(normalizeProduct)
];

export function getProductById(id) {
  return CART_PRODUCTS.find((product) => product.id === id);
}
