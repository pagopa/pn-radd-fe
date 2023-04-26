import { Box, Button, Stack, Typography } from '@mui/material';
import { DENIED_ACCESS_MESSAGE, DENIED_ACCESS_TITLE } from '../utils/string.utils';

type Props = {
  isLogged: boolean;
  goToLogin: () => void;
  goToHomePage: () => void;
};

const AccessDenied = ({ isLogged, goToLogin, goToHomePage }: Props) => (
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
            isLogged ? goToHomePage() : goToLogin();
          }}
        >
          {isLogged ? 'Vai alla home page' : 'Accedi'}
        </Button>
      </Box>
    </Stack>
  );
export default AccessDenied;
