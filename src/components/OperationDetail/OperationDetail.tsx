import React, { Fragment } from 'react';

import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { OperationsDetailsResponse } from '../../api/types/operations-details-response';
import { decodeOperationStatus, decodeRecipientType } from '../../utils/decode.utils';
import { formatString } from '../../utils/date.utils';

type Props = {
  operation?: OperationsDetailsResponse;
};

type DefaultItem = { type: 'default'; label: string; value?: string };
type CustomItem = {
  type: 'custom';
  component: (detail: OperationsDetailsResponse) => React.ReactNode;
};
type ItemSchema = DefaultItem | CustomItem;

type DetailSchema = Array<ItemSchema>;

type CopyableListItemProps = { label: string; value: string };
const CopyableListItem = ({ label, value }: CopyableListItemProps) => {
  const handleCopyClick = () => {
    void navigator.clipboard.writeText(value);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton
          data-testid={`copy-${label}`}
          onClick={handleCopyClick}
          title={`Copia il valore del campo ${label}`}
        >
          <ContentCopyIcon />
        </IconButton>
      }
      key={label}
      divider
    >
      <ListItemText primary={label} secondary={value} />
    </ListItem>
  );
};

const OperationDetail = ({ operation }: Props) => {
  if (!operation) {
    return <Fragment />;
  }

  const detailSchema: DetailSchema = [
    {
      type: 'default',
      label: 'Data della richiesta',
      value: formatString(operation.operationStartDate),
    },
    {
      type: 'custom',
      component: ({ operationId }) => (
        <CopyableListItem label={'ID operazione'} value={operationId!} />
      ),
    },
    {
      type: 'custom',
      component: ({ iuns }) => <CopyableListItem label={'Codice IUN'} value={iuns!.join(' ')} />,
    },
    {
      type: 'default',
      label: 'Soggetto giuridico',
      value: decodeRecipientType(operation.recipientType),
    },
    {
      type: 'default',
      label: 'Codice Fiscale destinatario',
      value: operation.recipientTaxId,
    },
    {
      type: 'default',
      label: 'Codice fiscale delegato',
      value: operation.delegateTaxId,
    },
    {
      type: 'custom',
      component({ operationStatus }) {
        const label = decodeOperationStatus(operationStatus);
        return (
          <ListItem divider key="Stato">
            <ListItemText primary={'Stato'} secondary={label} />
          </ListItem>
        );
      },
    },
    {
      type: 'default',
      label: 'Errore',
      value: operation.errorReason,
    },
  ];

  return (
    <List>
      {detailSchema.map((item) =>
        item.type === 'custom' ? (
          item.component(operation)
        ) : (
          <ListItem divider key={item.label}>
            <ListItemText primary={item.label} secondary={item.value} />
          </ListItem>
        )
      )}
    </List>
  );
};

export default OperationDetail;
