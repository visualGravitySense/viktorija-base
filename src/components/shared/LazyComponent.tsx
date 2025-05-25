import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: string | number;
}

const DefaultFallback = ({ minHeight = '200px' }: { minHeight?: string | number }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight,
      gap: 2,
    }}
  >
    <CircularProgress size={40} />
    <Typography variant="body2" color="text.secondary">
      Загрузка...
    </Typography>
  </Box>
);

export default function LazyComponent({ 
  children, 
  fallback, 
  minHeight = '200px' 
}: LazyComponentProps) {
  return (
    <Suspense fallback={fallback || <DefaultFallback minHeight={minHeight} />}>
      {children}
    </Suspense>
  );
} 