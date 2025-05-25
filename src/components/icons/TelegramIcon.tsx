import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const TelegramIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon {...props} ref={ref} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-.38.24-1.73 1.14-.49.31-1.08.47-1.67.48-.55-.01-1.61-.31-2.39-.57-.96-.31-1.72-.48-1.65-.99.04-.26.32-.53.84-.8 3.15-1.4 5.25-2.33 6.3-2.78 3-.69 3.62-.81 4.02-.81.09 0 .28.02.4.12.1.08.13.19.14.27-.01.06.01.24-.02.37z"
      />
    </SvgIcon>
  );
});

TelegramIcon.displayName = 'TelegramIcon';

export default TelegramIcon; 