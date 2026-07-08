import TeaBar01 from '../assets/images/testimonials/tea-bar-01.jpg';
import TeaBar02 from '../assets/images/testimonials/tea-bar-02.jpg';
import TeaBar03 from '../assets/images/testimonials/tea-bar-03.jpg';
import TeaBar04 from '../assets/images/testimonials/tea-bar-04.jpg';

export const BRAND_NAME = 'MilkTea Premium';

export const NAV_LINKS = [
  { label: 'Menu', labelKey: 'navbar.menu', href: '/menu' },
  { label: 'Categories', labelKey: 'navbar.categories', href: '#categories' },
  { label: 'Featured', labelKey: 'navbar.featured', href: '#featured' },
  { label: 'Testimonials', labelKey: 'navbar.testimonials', href: '#testimonials' },
  { label: 'Instagram', labelKey: 'navbar.instagram', href: '#instagram' },
  { label: 'Newsletter', labelKey: 'navbar.newsletter', href: '#newsletter' }
];

export const CATEGORIES = [
  {
    label: 'Milk Tea',
    value: 'milk-tea',
    count: 24,
    icon: 'MilkTea',
    toneClass: 'from-[#0d3b2e] to-[#2f6b58]',
    description: 'Velvety classics and brown sugar signatures.'
  },
  {
    label: 'Fruit Tea',
    value: 'fruit-tea',
    count: 18,
    icon: 'FruitTea',
    toneClass: 'from-[#f8c3b6] to-[#d86f5d]',
    description: 'Bright citrus, berry, mango, and popping pearls.'
  },
  {
    label: 'Coffee',
    value: 'coffee',
    count: 12,
    icon: 'Coffee',
    toneClass: 'from-[#6f4329] to-[#2f2419]',
    description: 'Tea bar espresso blends with creamy foam.'
  },
  {
    label: 'Smoothie',
    value: 'smoothie',
    count: 16,
    icon: 'Smoothie',
    toneClass: 'from-[#cdebf6] to-[#62a8b8]',
    description: 'Cold, silky fruit blends for slower afternoons.'
  },
  {
    label: 'Cake',
    value: 'cake',
    count: 10,
    icon: 'Cake',
    toneClass: 'from-[#d3a86a] to-[#b7793f]',
    description: 'Soft patisserie pairings for every tea order.'
  },
  {
    label: 'Topping',
    value: 'topping',
    count: 22,
    icon: 'Topping',
    toneClass: 'from-[#e7f8f6] to-[#1f7665]',
    description: 'Pearls, jellies, foam, pudding, and crunch.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Sophie H.',
    quote: 'The Premium collection feels luxurious yet comforting. Every cup is a beautiful treat.',
    rating: '5.0'
  },
  {
    name: 'Daniel P.',
    quote: 'The perfect blend of modern design and delicious drinks. The matcha latte is unforgettable.',
    rating: '5.0'
  },
  {
    name: 'Ava W.',
    quote: 'Elegant flavors and attentive service. This feels like a true premium tea destination.',
    rating: '5.0'
  }
];

export const INSTAGRAM_POSTS = [
  {
    label: 'Tokyo-inspired bubble tea',
    src: TeaBar01
  },
  {
    label: 'Refreshing summer flavor',
    src: TeaBar02
  },
  {
    label: 'Minimal premium cafe',
    src: TeaBar03
  },
  {
    label: 'Styled tea and pearls',
    src: TeaBar04
  }
];
