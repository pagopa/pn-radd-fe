import { SvgIconComponent } from '@mui/icons-material';

export interface SideMenuItem {
  label: string;
  icon?: SvgIconComponent;
  route: string;
  children?: Array<SideMenuItem>;
  dotBadge?: boolean;
  rightBadgeNotification?: number;
  notSelectable?: boolean;
}
