import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  sx?: any;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: boolean;
  fallbackColor?: string;
}

export default function OptimizedImage({
  src,
  webpSrc,
  alt,
  width,
  height,
  sx,
  loading = 'lazy',
  priority = false,
  placeholder = true,
  fallbackColor = 'grey.200',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Use WebP if supported and provided
  const shouldUseWebP = webpSrc && typeof window !== 'undefined' && 
    window.HTMLCanvasElement && 
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

  const imageSrc = shouldUseWebP ? webpSrc : src;

  if (hasError) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: fallbackColor,
          color: 'grey.500',
          fontSize: '0.875rem',
          width,
          height,
          ...sx,
        }}
      >
        Изображение недоступно
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      {placeholder && !isLoaded && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
      )}
      
      {/* Preload critical images */}
      {priority && (
        <link rel="preload" as="image" href={imageSrc} />
      )}
      
      <picture>
        {webpSrc && (
          <source srcSet={webpSrc} type="image/webp" />
        )}
        <Box
          component="img"
          src={imageSrc}
          alt={alt}
          loading={priority ? 'eager' : loading}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            display: isLoaded ? 'block' : 'none',
            width: '100%',
            height: 'auto',
            zIndex: 2,
            position: 'relative',
          }}
          {...props}
        />
      </picture>
    </Box>
  );
} 