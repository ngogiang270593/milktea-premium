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
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1605209971703-60cda7d3f26f?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?auto=format&fit=crop&w=900&q=80',
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
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80'
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
