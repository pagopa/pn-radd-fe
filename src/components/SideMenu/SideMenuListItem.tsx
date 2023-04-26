import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';

import { SideMenuItem } from '../../types/SideMenuItem';

type Props = {
  item: SideMenuItem;
  style?: { [key: string]: string | number };
};

/**
 * SideMenu List Item: rappresenta un item nel menu di navigazione laterale.
 * @param item SideMenuItem
 * @param style optional
 */
const SideMenuListItem = ({ item, style }: Props) => (
  <NavLink to={item.route} style={{ textDecoration: 'none' }}>
    {({ isActive }) => (
      <ListItemButton selected={isActive} sx={style}>
        {item.icon && (
          <ListItemIcon>
            {item.dotBadge ? (
              <Badge color="primary" variant="dot">
                <item.icon />
              </Badge>
            ) : (
              <item.icon />
            )}
          </ListItemIcon>
        )}
        <ListItemText primary={item.label} />
      </ListItemButton>
    )}
  </NavLink>
);

export default SideMenuListItem;
