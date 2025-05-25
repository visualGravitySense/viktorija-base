import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import InfoIcon from '@mui/icons-material/Info';
import Info from './Info';
import { useTranslation } from 'react-i18next';

interface InfoMobileProps {
  totalPrice: string;
  transmissionType?: string;
  onTransmissionChange?: (type: string) => void;
  instructor?: string | null;
}

function InfoMobile({ totalPrice, transmissionType, onTransmissionChange, instructor }: InfoMobileProps) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 'auto', px: 3, pb: 3, pt: 8 }} role="presentation">
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <Info 
        totalPrice={totalPrice} 
        transmissionType={transmissionType}
        onTransmissionChange={onTransmissionChange}
        instructor={instructor}
      />
    </Box>
  );

  return (
    <Box>
      <Button
        variant="outlined"
        size="small"
        endIcon={<InfoIcon />}
        onClick={toggleDrawer(true)}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
          borderColor: 'primary.light',
          color: 'primary.contrastText',
          '&:hover': {
            borderColor: 'primary.contrastText',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        {t('checkout.view_details', 'Детали')}
      </Button>
      <Drawer
        open={open}
        anchor="bottom"
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px 16px 0 0',
            backgroundImage: 'none',
            backgroundColor: 'background.paper',
            maxHeight: '85vh',
            overflowY: 'auto',
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}

export default InfoMobile;
