import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { ReactComponent as SiteLogo } from '../icons/text_logo.svg';
import { Link } from "react-router-dom"
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, useTheme } from '@mui/material';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import { APP_BAR_HEIGHT } from '../App'

const pages = [
  { title: 'Spectacles', url: 'shows', icon: <TheaterComedyIcon /> },
  { title: 'Musique', url: 'music', icon: <LibraryMusicIcon /> },
  { title: 'À Propos', url: 'about', icon: <InfoIcon /> },
  { title: 'Contact', url: 'contact', icon: <PersonIcon /> },
]

function ResponsiveAppBar() {
  const theme = useTheme()
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setDrawerOpen(open);
      };


  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List sx={{ marginTop: 2 }}>
        {pages.map((page) => (
          <ListItem key={page.title} disablePadding>
            <ListItemButton component={Link} to={page.url}>
              <ListItemIcon>
                {page.icon}
              </ListItemIcon>
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const siteLogoComponent = <SiteLogo width={140} height={65} fill={theme.palette.text.primary} />

  return (
    <>
      <AppBar sx={{ backgroundColor: theme.palette.primary.main, height: APP_BAR_HEIGHT }} elevation={0} position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Desktop Layout */}
            <Button component={Link} to='home' sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, mr: 1, pt: 1.1, pb: 0.6 }}>
              {siteLogoComponent}
            </Button>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 1 }}>
              {pages.map((page) => (
                <Button
                  draggable={false}
                  component={Link}
                  to={page.url}
                  key={page.title}
                  onClick={toggleDrawer(false)}
                  sx={{
                    mx: 1.3,
                    display: 'block',
                    color: theme.palette.text.primary,
                    textTransform: 'none',
                    fontSize: 'larger',
                    fontWeight: 300
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            {/* Mobile Layout */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Button component={Link} to='home' sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, mr: 1, pt: 1.1, pb: 0.6 }}>
              {siteLogoComponent}
            </Button>
            <Box sx={{ mr: 4, flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />
          </Toolbar>
        </Container>
      </AppBar>

      <SwipeableDrawer
        PaperProps={{ sx: { backgroundColor: 'palette.primary' } }}
        anchor='left'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}>
        {drawerList()}
      </SwipeableDrawer>
    </>
  );
}
export default ResponsiveAppBar;