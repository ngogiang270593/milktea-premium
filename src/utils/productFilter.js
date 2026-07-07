function asArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function normalize(value) {
  return String(value || '').toLowerCase().trim();
}

function matchesSelected(value, selectedValues) {
  const values = asArray(selectedValues);
  return !values.length || values.includes(value);
}

export function filterByCategory(products, categories = []) {
  return products.filter((product) => matchesSelected(product.category, categories));
}

export function filterByPrice(products, maxPrice = Infinity) {
  return products.filter((product) => Number(product.price) <= Number(maxPrice));
}

export function filterByRating(products, minRating = 0) {
  return products.filter((product) => Number(product.rating) >= Number(minRating));
}

export function filterByAvailability(products, availability = []) {
  return products.filter((product) => matchesSelected(product.availability, availability));
}

export function sortByPrice(products, direction = 'asc') {
  return [...products].sort((a, b) => {
    const result = Number(a.price) - Number(b.price);
    return direction === 'desc' ? -result : result;
  });
}

export function sortByPopularity(products) {
  return [...products].sort((a, b) => Number(b.reviews || 0) - Number(a.reviews || 0));
}

export function sortByNewest(products) {
  return [...products].sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
}

export function searchProducts(products, query = '') {
  const term = normalize(query);

  if (!term) {
    return products;
  }

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.title,
      product.category,
      ...(product.tags || [])
    ].map(normalize).join(' ');

    return searchableText.includes(term);
  });
}

export function applyProductFilters(products, filters = {}) {
  let result = [...products];

  result = searchProducts(result, filters.search);
  result = filterByCategory(result, filters.categories);
  result = filterByPrice(result, filters.maxPrice ?? Infinity);
  result = filterByRating(result, filters.minRating ?? 0);
  result = filterByAvailability(result, filters.availability);

  result = result.filter((product) => (
    matchesSelected(product.size, filters.sizes)
      && matchesSelected(product.sugar, filters.sugarLevels)
      && matchesSelected(product.ice, filters.iceLevels)
  ));

  if (filters.sort === 'rating-desc') {
    result = [...result].sort((a, b) => Number(b.rating) - Number(a.rating));
  } else if (filters.sort === 'price-asc') {
    result = sortByPrice(result, 'asc');
  } else if (filters.sort === 'price-desc') {
    result = sortByPrice(result, 'desc');
  } else if (filters.sort === 'newest') {
    result = sortByNewest(result);
  } else {
    result = sortByPopularity(result);
  }

  return result;
}
