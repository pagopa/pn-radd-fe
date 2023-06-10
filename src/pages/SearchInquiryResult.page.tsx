import {
  Box,
  Stack,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import TitleBox from '../components/Title/TitleBox';
import Table from '../components/Table/Table';
import { HOMEPAGE, SEARCH_INQUIRY } from '../navigation/routes.const';
import { Column, Item } from '../components/Table/types';
import { useAppSelector } from '../redux/hooks';
import { inquiryResultSearchSelector } from '../redux/inquiry-history/slice';
import { formatString } from '../utils/date.utils';
import { decodeOperationStatus, getColorByOperationStatus } from '../utils/decode.utils';
import OperationDetail from '../components/OperationDetail/OperationDetail';

const breadcrumbsLinks = [
  {
    linkLabel: 'Homepage',
    linkRoute: HOMEPAGE,
  },
  {
    linkLabel: 'Richieste precedenti',
    linkRoute: SEARCH_INQUIRY,
  },
];

type OperationColumn =
  | 'operationStartDate'
  | 'operationId'
  | 'iun'
  | 'recipientTaxId'
  | 'operationStatus';

type DialogState = {
  openDialog: boolean;
  selectedOperationId: string;
};

const SearchInquiryResult = () => {
  const [{ openDialog, selectedOperationId }, setDetailDialogData] = useState<DialogState>({
    openDialog: false,
    selectedOperationId: '',
  });

  const { operations } = useAppSelector(inquiryResultSearchSelector);
  const selectedOperation = selectedOperationId
    ? operations?.filter((op) => op.operationId === selectedOperationId)[0]
    : undefined;

  const handleRowClick = (operationId: string) => {
    setDetailDialogData({ openDialog: true, selectedOperationId: operationId });
  };
  const handleCloseDialog = () => {
    setDetailDialogData({ openDialog: false, selectedOperationId: '' });
  };

  const columns: Array<Column<OperationColumn>> = [
    {
      id: 'operationStartDate',
      label: 'Data richiesta',
      width: '20%',
      getCellLabel(value: string) {
        return formatString(value);
      },
      onClick(row: Item) {
        handleRowClick(String(row.operationId));
      },
    },
    {
      id: 'operationId',
      label: 'ID operazione',
      width: '20%',
      getCellLabel(value: string) {
        return value;
      },
      onClick(row: Item) {
        handleRowClick(String(row.operationId));
      },
    },
    {
      id: 'iun',
      label: 'Codice IUN',
      width: '20%',
      sortable: false,
      getCellLabel(value: string) {
        return value;
      },
      onClick(row: Item) {
        handleRowClick(String(row.operationId));
      },
    },
    {
      id: 'recipientTaxId',
      label: 'Codice Fiscale destinatario',
      width: '20%',
      sortable: false,
      getCellLabel(value: string) {
        return value;
      },
      onClick(row: Item) {
        handleRowClick(String(row.operationId));
      },
    },
    {
      id: 'operationStatus',
      label: 'Stato',
      width: '20%',
      getCellLabel(value: string) {
        const color = getColorByOperationStatus(value);
        const label = decodeOperationStatus(value);
        return <Chip label={label} color={color} />;
      },
      onClick(row: Item) {
        handleRowClick(String(row.operationId));
      },
    },
  ];

  const rows: Array<Item> = operations
    ? operations.map((n) => ({
        ...n,
        id: n.operationId ?? '',
        iun: n.iuns ? n.iuns.join(' ') : '',
      }))
    : [];

  return (
    <>
      <Box py={3}>
        <Breadcrumb currentLocationLabel="Risultati della ricerca" links={breadcrumbsLinks} />
      </Box>

      <Stack spacing={2}>
        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <TitleBox title={`Risultati della ricerca`} variantTitle="h4" />
          </Grid>
          <Grid item>
            <Link to={SEARCH_INQUIRY}>
              <Button variant="outlined">Nuova ricerca</Button>
            </Link>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box p={2}>
            <Table columns={columns} rows={rows} />
          </Box>
        </Grid>

        <Dialog open={openDialog} scroll="paper" fullWidth maxWidth="sm">
          <DialogTitle>Dettaglio della richiesta {selectedOperation?.operationId}</DialogTitle>
          <DialogContent>
            <Box p={2}>
              <OperationDetail operation={selectedOperation} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box p={2}>
              <Button onClick={handleCloseDialog} variant="outlined">
                Chiudi
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
};

export default SearchInquiryResult;
