import { SideMenuItem } from '../types/SideMenuItem';
import { DOCUMENT_INQUIRY_ACT, DOCUMENT_INQUIRY_AOR } from '../navigation/routes.const';
import MailIcon from '@mui/icons-material/Mail';

export const getDefaultMenuItems = (): Array<SideMenuItem> => {
  return [
    {
      label: 'Richieste',
      route: '/',
      children: [
        {
          label: 'Documenti allegati e attestazioni opponibili a terzi',
          route: DOCUMENT_INQUIRY_ACT,
          icon: MailIcon,
        },
        {
          label: 'Avvisi di avvenuta ricezione',
          route: DOCUMENT_INQUIRY_AOR,
          icon: MailIcon,
        },
      ],
    },
  ];
};
