import { useNavigate } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '350px', height: '100%', display: 'flex' }}>
      <Box sx={{ margin: 'auto', textAlign: 'center', width: '80vw' }}>
        <IllusError />
        <Typography variant="h4" color="text.primary" sx={{ margin: '20px 0 10px 0' }}>
          Qualcosa è andato storto
        </Typography>
        <Typography variant="body1" color="text.primary">
          Non siamo riusciti a trovare la pagina.
        </Typography>
        <Button variant="contained" sx={{ marginTop: '30px' }} onClick={handleNavigateToHome}>
          Torna alla home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
