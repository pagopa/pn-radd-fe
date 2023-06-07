import { Box, Stack, Grid } from '@mui/material';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import TitleBox from '../components/Title/TitleBox';
import SearchInquiryForm from '../components/SearchInquiryForm/SearchInquiryForm';
import { HOMEPAGE } from '../navigation/routes.const';

const breadcrumbsLinks = [
  {
    linkLabel: 'Homepage',
    linkRoute: HOMEPAGE,
  },
];

const SearchInquiry = () => (
  <>
    <Box py={3}>
      <Breadcrumb currentLocationLabel="Storico delle richieste" links={breadcrumbsLinks} />
    </Box>

    <Stack spacing={2}>
      <Grid container item>
        <TitleBox title={'Storico delle richieste'} variantTitle="h4" />
      </Grid>

      <SearchInquiryForm />
    </Stack>
  </>
);

export default SearchInquiry;
