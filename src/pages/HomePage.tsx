import { Box, Card, CardActions, CardContent, Fab, Grid, Typography } from '@mui/material';
import TitleBox from './components/Title/TitleBox';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { DOCUMENT_INQUIRY_ACT, DOCUMENT_INQUIRY_AOR } from '../navigation/routes.const';

const titleMessage = 'Che documenti vuoi ottenere?';
const subTitleMessage =
  'Seleziona il tipo di documenti che vuoi ottenere: allegati della notifica e attestazioni opponibili a terzi o avvisi di avvenuta ricezione.';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box py={5} px={14}>
        <TitleBox
          title={titleMessage}
          subTitle={subTitleMessage}
          variantTitle="h3"
          variantSubTitle="body1"
        />

        <Grid container spacing={2} mt={2}>
          <Grid item xs={6} style={{ display: 'flex' }}>
            <Card
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Documenti allegati della notifica e attestazioni opponibili a terzi
                </Typography>
              </CardContent>
              <CardActions>
                <Fab
                  onClick={(evt) => {
                    navigate(DOCUMENT_INQUIRY_ACT);
                  }}
                  color="primary"
                  aria-label="Vai a Documenti allegati della notifica e attestazioni opponibili a terzi"
                >
                  <ArrowForwardIcon />
                </Fab>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex' }}>
            <Card
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Avvisi di avvenuta ricezione
                </Typography>
              </CardContent>
              <CardActions>
                <Fab
                  onClick={(evt) => {
                    navigate(DOCUMENT_INQUIRY_AOR);
                  }}
                  color="primary"
                  aria-label="Vai a Avvisi di avvenuta ricezione"
                >
                  <ArrowForwardIcon />
                </Fab>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
