// @mui
import { alpha, styled } from '@mui/material/styles';
import { Button, Popover } from '@mui/material';
// config
import { NAVBAR } from '../../../config';

// ----------------------------------------------------------------------

export const ListItemStyle = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'activeRoot' &&
    prop !== 'activeSub' &&
    prop !== 'subItem' &&
    prop !== 'open',
})(({ activeRoot, activeSub, subItem, open, theme }) => {
  const activeRootStyle = {
    color: theme.palette.grey[800],
    backgroundColor: theme.palette.common.white,
    boxShadow: `-2px 4px 6px 0 ${alpha(theme.palette.grey[500], 0.16)}`,
    fontWeight: 900,
  };

  return {
    ...theme.typography.body2,
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(0, 1),
    color: theme.palette.common.white,
    textTransform: theme.palette.text.uppercase,
    height: NAVBAR.DASHBOARD_ITEM_HORIZONTAL_HEIGHT,
    fontWeight: 900,
    '&:hover': {
      color: theme.palette.grey[800],
      backgroundColor: theme.palette.common.white,
    },
    // activeRoot
    ...(activeRoot && {
      ...theme.typography.subtitle2,
      ...activeRootStyle,
      '&:hover': { ...activeRootStyle },
    }),
    // activeSub
    ...(activeSub && {
      ...theme.typography.subtitle2,
      color: theme.palette.text.primary,
    }),
    // subItem
    ...(subItem && {
      width: '100%',
      margin: 0,
      paddingRight: 0,
      paddingLeft: theme.spacing(1),
      justifyContent: 'space-between',
      color: theme.palette.grey[800],
      '&:hover': {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.primary,
      },
    }),
    // open
    ...(open &&
      !activeRoot && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.common.primary,
      }),
  };
});

// ----------------------------------------------------------------------

export const PaperStyle = styled(Popover)(({ theme }) => ({
  pointerEvents: 'none',
  '& .MuiPopover-paper': {
    width: 160,
    pointerEvents: 'auto',
    padding: theme.spacing(1),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    boxShadow: theme.customShadows.dropdown,
  },
}));
