import { Box, Stack, Grid } from '@mui/material';
import { Fragment } from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import TitleBox from '../components/Title/TitleBox';
import SearchInquiryForm from '../components/SearchInquiryForm/SearchInquiryForm';
import { SEARCH_INQUIRY } from '../navigation/routes.const';
import SearchInquiryResult from '../components/SearchInquiryResult/SearchInquiryResult';

const SearchInquiry = () => (
  <>
    <Box py={3}>
      <Breadcrumb
        currentLocationLabel="Risultato ricerca"
        linkLabel={<Fragment>Storico delle richieste</Fragment>}
        linkRoute={SEARCH_INQUIRY}
      />
    </Box>

    <Stack spacing={2}>
      <Grid container item>
        <TitleBox title={'Risultato ricerca'} variantTitle="h4" />
      </Grid>

      <SearchInquiryResult />
    </Stack>
  </>
);

export default SearchInquiry;
