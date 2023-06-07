import { Box, Typography, Link, Button } from '@mui/material';
import { IllusCompleted } from '@pagopa/mui-italia';
import { useNavigate } from 'react-router-dom';
import { HOMEPAGE, SEARCH_INQUIRY } from '../../../navigation/routes.const';

const EndInquiry = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate(HOMEPAGE);
  };

  return (
    <Box sx={{ minHeight: '300px', height: '100%', display: 'flex' }}>
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        <IllusCompleted />
        <Typography variant="h4" color="text.primary" sx={{ margin: '20px 0 10px 0' }}>
          Grazie!
        </Typography>
        <Typography variant="body2" color="text.primary">
          Puoi vedere le informazioni relative a questa ricerca nello{' '}
          <Link href={SEARCH_INQUIRY}>storico delle ricerche.</Link>
        </Typography>
        <Button variant="contained" sx={{ marginTop: '30px' }} onClick={handleNavigateToHome}>
          Chiudi
        </Button>
      </Box>
    </Box>
  );
};

export default EndInquiry;
