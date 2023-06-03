import { Fragment, useRef, useState } from 'react';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { SideMenuItem } from './SideMenuItem';
import SideMenuListItem from './SideMenuListItem';

type Props = {
  menuItems: Array<SideMenuItem>;
};

const SideMenuList = ({ menuItems }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpenId] = useState<string>('');
  const prevOpenId = useRef(openId);

  const handleClick = (label: string) => {
    if (prevOpenId.current === label) {
      setOpen(!open);
    } else {
      setOpenId(label);
      prevOpenId.current = label;
      /* eslint-enalbe functional/immutable-data */
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: 'background.paper',
      }}
    >
      <List role="navigation" data-testid="menu-list" component="nav" aria-label={'menu RADD'}>
        {menuItems.map((item: SideMenuItem) =>
          item.children ? (
            // accordion se ci sono children
            <Fragment key={item.label}>
              <ListItemButton
                onClick={() => {
                  handleClick(item.label);
                }}
              >
                {item.icon && (
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                )}
                <ListItemText primary={item.label} />
                {openId === item.label && open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openId === item.label && open}
                timeout="auto"
                unmountOnExit
                data-testid={`collapse-${item.label}`}
              >
                <List disablePadding>
                  {item.children.map((child) => (
                    <SideMenuListItem key={child.label} item={child} style={{ pl: 4 }} />
                  ))}
                </List>
              </Collapse>
            </Fragment>
          ) : (
            <SideMenuListItem key={item.label} item={item} />
          )
        )}
      </List>
    </Box>
  );
};

export default SideMenuList;
