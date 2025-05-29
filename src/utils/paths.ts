// Utility function to get the correct image path for both development and production
export const getImagePath = (imagePath: string): string => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // In production (GitHub Pages), we need to include the base path
  if (import.meta.env.PROD) {
    return `/viktorija-base/${cleanPath}`;
  }
  
  // In development, use the path as is
  return `/${cleanPath}`;
};

// Alternative approach using Vite's base URL
export const getAssetPath = (assetPath: string): string => {
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}; 