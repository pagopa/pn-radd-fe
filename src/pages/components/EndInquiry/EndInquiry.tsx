import { Box, Typography, Grid, Button } from '@mui/material';
import { IllusCompleted } from '@pagopa/mui-italia';
import { useNavigate } from 'react-router-dom';

const EndInquiry = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '300px', height: '100%', display: 'flex' }}>
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        <IllusCompleted />
        <Typography variant="body1" color="text.primary" sx={{ margin: '20px 0 10px 0' }}>
          La richiesta è stata completata con successo
        </Typography>
        <Typography variant="body2" color="text.primary">
          Puoi ricercare le informazioni prodotte nella sezione "Operazioni".
        </Typography>
        <Button variant="contained" sx={{ marginTop: '30px' }} onClick={handleNavigateToHome}>
          Torna alla home
        </Button>
      </Box>
    </Box>
  );
};

export default EndInquiry;
