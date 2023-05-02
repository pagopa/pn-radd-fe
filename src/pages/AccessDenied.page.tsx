import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DENIED_ACCESS_MESSAGE, DENIED_ACCESS_TITLE } from '../utils/string.utils';
import { HOMEPAGE } from '../navigation/routes.const';

type Props = {
  isLogged: boolean;
};

const AccessDenied = ({ isLogged }: Props) => {
  const navigate = useNavigate();

  const goToHomePage = () => navigate(HOMEPAGE, { replace: true });
  const goToLoginPortal = (href: string) => {
    throw new Error('Function not implemented. ' + href);
  };

  return (
    <Stack direction="column" alignItems="center" my={4} sx={{ minHeight: '50vh' }}>
      <Box mt={4}>
        <Typography align="center" color="text.primary" variant="h4">
          {DENIED_ACCESS_TITLE}
        </Typography>
      </Box>
      <Box my={2}>
        <Typography align="center" color="text.primary" variant="body1">
          {DENIED_ACCESS_MESSAGE}
        </Typography>
      </Box>

      <Box my={4}>
        <Button
          variant="contained"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            isLogged ? goToHomePage() : goToLoginPortal(window.location.href);
          }}
        >
          {isLogged ? 'Vai alla home page' : 'Accedi'}
        </Button>
      </Box>
    </Stack>
  );
};

export default AccessDenied;
