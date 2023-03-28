import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { MemoryRouter } from 'react-router-dom';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Link from '@mui/material/Link';

function Router(props) {
  const { children } = props;

  return <MemoryRouter>{children}</MemoryRouter>;
}

function AppHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElSearch, setAnchorElSearch] = React.useState(false);
  const searchInputRefMobile = React.useRef();
  const searchInputRef = React.useRef();

  //temporary
  const [loggedIn, setLoggedIn] = React.useState(true);

  const logOut = () => {
    setLoggedIn(false);
  };

  const pages = [
    {
      name: 'Flashcards',
      to: '/flashcards',
    },
    {
      name: 'About',
      to: '/about',
    },
  ];
  const settings = [
    {
      name: 'My Profile',
      to: '/me',
    },
    {
      name: 'Log out',
      cb: logOut,
    },
  ];
  const notLoggedIn = [
    {
      name: 'Log in',
      to: '/login',
    },
    {
      name: 'Sign up',
      to: '/register',
    },
  ];

  const searchHandlerMobile = () => {
    if (searchInputRefMobile.current.value?.length)
      console.log(searchInputRefMobile.current.value);
    else setAnchorElSearch((prev) => !prev);
  };

  const searchHandler = () => {
    if (searchInputRef.current.value?.length)
      console.log(searchInputRef.current.value);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              flexGrow: 1,
              textDecoration: 'none',
              color: '#333',
            }}
          >
            Name
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Router>
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link href={page.to} underline="none">
                      {page.name}
                    </Link>
                  </MenuItem>
                ))}
                {loggedIn
                  ? settings.map((page) =>
                      page.to ? (
                        <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                          <Link href={page.to} underline="none">
                            {page.name}
                          </Link>
                        </MenuItem>
                      ) : (
                        <Button
                          key={page.name}
                          onClick={() => {
                            handleCloseNavMenu();
                            page.cb();
                          }}
                          sx={{ m: 1, display: 'block', color: '#fff' }}
                          variant="contained"
                        >
                          {page.name}
                        </Button>
                      )
                    )
                  : notLoggedIn.map((page) => (
                      <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Link href={page.to} underline="none">
                          {page.name}
                        </Link>
                      </MenuItem>
                    ))}
              </Router>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: '#333',
              textDecoration: 'none',
            }}
          >
            Name
          </Typography>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexGrow: 0,
              px: 1,
              border: '1px solid #2E7531',
              borderRadius: 1,
              ml: 2,
            }}
          >
            <InputBase placeholder="Search..." inputRef={searchInputRef} />
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="search"
              onClick={searchHandler}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 0,
              px: 1,
              border: anchorElSearch ? '1px solid #2E7531' : '0',
              borderRadius: 1,
              ml: 2,
            }}
          >
            <InputBase
              placeholder="Search..."
              inputRef={searchInputRefMobile}
              sx={{ display: anchorElSearch ? 'flex' : 'none' }}
            />
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="search"
              onClick={searchHandlerMobile}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              justifyContent: 'flex-end',
              display: { xs: 'none', md: 'flex' },
              mx: 3,
            }}
          >
            <Router>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ mx: 1, color: '#333', display: 'block' }}
                  href={page.to}
                >
                  {page.name}
                </Button>
              ))}
            </Router>
          </Box>

          {loggedIn ? (
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((page) =>
                  page.to ? (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Link href={page.to} underline="none">
                        {page.name}
                      </Link>
                    </MenuItem>
                  ) : (
                    <Button
                      key={page.name}
                      onClick={() => {
                        handleCloseNavMenu();
                        page.cb();
                      }}
                      sx={{ m: 1, display: 'block', color: '#fff' }}
                      variant="contained"
                    >
                      {page.name}
                    </Button>
                  )
                )}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Router>
                {notLoggedIn.map((page) => (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ m: 1, display: 'block', color: '#fff' }}
                    href={page.to}
                    variant="contained"
                  >
                    {page.name}
                  </Button>
                ))}
              </Router>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppHeader;
