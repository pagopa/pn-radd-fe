import { Skeleton, Box, Stack } from '@mui/material';

type Props = {
  renderType?: 'whole' | 'part';
};

const headerHeight = '48px';
const footerHeight = '139px';

const LoadingPage = ({ renderType = 'part' }: Props) => (
    <Box p={1} height="80vh" data-testid="loading-skeleton">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={headerHeight}
        sx={{ marginBottom: 1 }}
        data-testid="header"
      />
      <Stack height={`calc(100%)`} direction={{ xs: 'column', lg: 'row' }} sx={{ flexGrow: 1 }}>
        {renderType === 'whole' && (
          <Box sx={{ width: { lg: 300 }, flexShrink: '0', marginRight: { lg: 1 } }} component="nav">
            <Skeleton variant="rectangular" width="100%" height="100%" data-testid="menu" />
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} component="main">
          <Skeleton variant="rectangular" width="100%" height="100%" data-testid="body" />
        </Box>
      </Stack>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={footerHeight}
        sx={{ marginTop: 1 }}
        data-testid="footer"
      />
    </Box>
  );

export default LoadingPage;
