import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';

export default function SitemarkIcon() {
  const theme = useTheme();
  
  return (
    <SvgIcon sx={{ height: 21, width: 120, mr: 2, color: theme.palette.primary.main }}>
      <svg
        width={120}
        height={21}
        viewBox="0 0 120 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="60"
          y="16"
          fontFamily="Georgia, Times, serif"
          fontSize="18"
          fontWeight="normal"
          fill="currentColor"
          textAnchor="middle"
          style={{ fontStyle: 'italic', letterSpacing: '1px' }}
        >
          Viktorija
        </text>
      </svg>
    </SvgIcon>
  );
}
