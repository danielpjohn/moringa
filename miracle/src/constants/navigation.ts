import { FaHome, FaBoxOpen, FaShoppingCart, FaEnvelope, FaInfoCircle } from "react-icons/fa";

export const NAV_LINKS = [
  { name: "Home", path: "/home", icon: FaHome },
  { name: "About", path: "/about", icon: FaInfoCircle },
  { name: "Products", path: "/products", icon: FaBoxOpen },
  { name: "Recipes", path: "/recipe", icon: FaInfoCircle },
  { name: "Cart", path: "/cart", icon: FaShoppingCart },
  { name: "Contact", path: "/contact", icon: FaEnvelope },
];

export const ADMIN_SIDEBAR_ITEMS = [
  {
    title: 'User Management',
    path: '/user',
    icon: 'users',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Add Category',
    path: '/addcategory',
    icon: 'category',
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Add Product',
    path: '/addproduct',
    icon: 'product',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Add Coupon',
    path: '/coupon',
    icon: 'coupon',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  },
  {
    title: 'Add Recipes',
    path: '/addrecipes',
    icon: 'recipe',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  },
];
