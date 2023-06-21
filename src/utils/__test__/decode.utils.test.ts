import {
  decodeInquiryType,
  decodeOperationStatus,
  decodeRecipientType,
  decodeSearchType,
  getColorByOperationStatus,
} from '../decode.utils';

describe('decode.utils', () => {
  it('decodeRecipientType', () => {
    const emptyDecode = decodeRecipientType('');
    expect(emptyDecode).toEqual('');
    const pfDecode = decodeRecipientType('PF');
    expect(pfDecode).toEqual('Persona fisica');
    const pgDecode = decodeRecipientType('PG');
    expect(pgDecode).toEqual('Persona giuridica');
  });

  it('decodeInquiryType', () => {
    const emptyDecode = decodeInquiryType('');
    expect(emptyDecode).toEqual('');
    const actDecode = decodeInquiryType('ACT');
    expect(actDecode).toEqual('Documenti allegati e attestazioni opponibili a terzi');
    const aorDecode = decodeInquiryType('AOR');
    expect(aorDecode).toEqual('Avvisi di avvenuta ricezione');
  });

  it('decodeSearchType', () => {
    const emptyDecode = decodeSearchType('');
    expect(emptyDecode).toEqual('');
    const iunDecode = decodeSearchType('IUN');
    expect(iunDecode).toEqual('IUN');
    const operationIdDecode = decodeSearchType('OPERATION_ID');
    expect(operationIdDecode).toEqual('ID Operazione');
    const taxIdDecode = decodeSearchType('TAX_ID');
    expect(taxIdDecode).toEqual('Codice Fiscale');
  });

  it('getColorByOperationStatus', () => {
    const emptyDecode = getColorByOperationStatus('');
    expect(emptyDecode).toEqual(undefined);
    const completedDecode = getColorByOperationStatus('COMPLETED');
    expect(completedDecode).toEqual('success');
    const abortedDecode = getColorByOperationStatus('ABORTED');
    expect(abortedDecode).toEqual('default');
    const errorDecode = getColorByOperationStatus('ERROR');
    expect(errorDecode).toEqual('error');
    const startedDecode = getColorByOperationStatus('STARTED');
    expect(startedDecode).toEqual('warning');
  });

  it('decodeOperationStatus', () => {
    const emptyDecode = decodeOperationStatus('');
    expect(emptyDecode).toEqual('');
    const startedDecode = decodeOperationStatus('STARTED');
    expect(startedDecode).toEqual('Iniziata');
    const completedDecode = decodeOperationStatus('COMPLETED');
    expect(completedDecode).toEqual('Completata');
    const abortedDecode = decodeOperationStatus('ABORTED');
    expect(abortedDecode).toEqual('Annullata');
    const errorDecode = decodeOperationStatus('ERROR');
    expect(errorDecode).toEqual('Errore');
  });
});
