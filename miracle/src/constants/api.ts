  export const API_ENDPOINTS = {
  BASE_URL: 'http://127.0.0.1:8000',
  GET_ALL_IMAGES: '/get-all-images/',
  PRODUCTS: '/products/',
  USERS: '/users/',
  CATEGORIES: '/categories/',
  COUPONS: '/coupons/',
  RECIPES: '/recipes/',
  ABOUT_VIDEOS: '/about-videos/',
} as const;

export const IMAGE_TYPES = {
  LOGO: 'logo',
  HOMEPAGE: 'homepage',
  PRODUCT: 'product',
} as const;
