import { describe, expect, it } from 'vitest';
import {
  applyProductFilters,
  filterByCategory,
  searchProducts,
  sortByPrice
} from '../../src/utils/productFilter.js';

const products = [
  {
    id: 'classic',
    name: 'Classic Milk Tea',
    category: 'milk-tea',
    price: 5,
    rating: 4.8,
    reviews: 120,
    availability: 'Available now',
    size: 'Regular',
    sugar: '50%',
    ice: 'Regular ice',
    tags: ['black tea', 'pearls']
  },
  {
    id: 'mango',
    name: 'Mango Sago',
    category: 'fruit-tea',
    price: 7,
    rating: 4.9,
    reviews: 240,
    availability: 'Available now',
    size: 'Large',
    sugar: '30%',
    ice: 'Less ice',
    tags: ['mango', 'sago'],
    isNew: true
  }
];

describe('productFilter', () => {
  it('filters products by category', () => {
    expect(filterByCategory(products, ['milk-tea'])).toEqual([products[0]]);
  });

  it('searches by name, category, and tags', () => {
    expect(searchProducts(products, 'mango')).toEqual([products[1]]);
    expect(searchProducts(products, 'pearls')).toEqual([products[0]]);
  });

  it('sorts by price without mutating the source array', () => {
    const sorted = sortByPrice(products, 'desc');

    expect(sorted.map((product) => product.id)).toEqual(['mango', 'classic']);
    expect(products.map((product) => product.id)).toEqual(['classic', 'mango']);
  });

  it('applies combined filters', () => {
    const result = applyProductFilters(products, {
      search: 'tea',
      categories: ['milk-tea'],
      maxPrice: 6,
      minRating: 4.5,
      availability: ['Available now'],
      sort: 'price-asc'
    });

    expect(result).toEqual([products[0]]);
  });
});

