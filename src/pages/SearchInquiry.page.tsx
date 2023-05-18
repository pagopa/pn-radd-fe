import { Box, Stack, Grid } from '@mui/material';
import { Fragment } from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import TitleBox from '../components/Title/TitleBox';
import SearchInquiryForm from '../components/SearchInquiryForm/SearchInquiryForm';

const SearchInquiry = () => (
  <>
    <Box py={3}>
      <Breadcrumb
        currentLocationLabel="Storico delle richieste"
        linkLabel={<Fragment>Homepage</Fragment>}
        linkRoute={'/'}
      />
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
