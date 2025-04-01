import postcssImport from 'postcss-import';
import tailwindcss from '@tailwindcss/postcss'; 
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    postcssImport,
    tailwindcss,  
    autoprefixer
  ]
};
