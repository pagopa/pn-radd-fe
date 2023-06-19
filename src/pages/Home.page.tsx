import { Box, Card, CardActions, CardContent, Fab, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import {
  DOCUMENT_INQUIRY_ACT,
  DOCUMENT_INQUIRY_AOR,
  SEARCH_INQUIRY,
} from '../navigation/routes.const';
import TitleBox from '../components/Title/TitleBox';

const titleMessage = 'Cosa vuoi fare?';
const subTitleMessage =
  'Seleziona i documenti che vuoi ottenere o consulta le richieste precedenti.';

const Home = () => {
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
              data-testid="act-request-card"
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ottenere documenti allegati della notifica e attestazioni opponibili a terzi
                </Typography>
              </CardContent>
              <CardActions>
                <Fab
                  onClick={() => {
                    navigate(DOCUMENT_INQUIRY_ACT);
                  }}
                  color="primary"
                  aria-label="Vai alla pagina Ottenere documenti allegati della notifica e attestazioni opponibili a terzi"
                  data-testid="act-request-button"
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
              data-testid="aor-request-card"
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ottenere avvisi di avvenuta ricezione
                </Typography>
              </CardContent>
              <CardActions>
                <Fab
                  onClick={() => {
                    navigate(DOCUMENT_INQUIRY_AOR);
                  }}
                  color="primary"
                  aria-label="Vai alla pagina Ottenere avvisi di avvenuta ricezione"
                  data-testid="aor-request-button"
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
              data-testid="previous-requests-card"
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Consultare le richieste precedenti
                </Typography>
              </CardContent>
              <CardActions>
                <Fab
                  onClick={() => {
                    navigate(SEARCH_INQUIRY);
                  }}
                  color="primary"
                  aria-label="Vai alla pagina Consultare le richieste precedenti"
                  data-testid="previous-requests-button"
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

export default Home;
