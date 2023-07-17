import { formatToTimezoneString, formatIsoString } from '../date.utils';

describe('date.utils', () => {
  it('formatToTimezoneString', () => {
    const date = new Date(2023, 5, 17);
    const formattedDate = formatToTimezoneString(date);
    expect(formattedDate).toEqual('2023-06-17T00:00:00.000Z');
  });

  it('formatIsoString', () => {
    const date = '2017-07-21T17:32:28Z';
    const formattedDate = formatIsoString(date);
    expect(formattedDate).toEqual('21/07/2017 19:32:28');
  });
});
