import {
  AccountCircle,
  AddLocationAlt,
  Analytics,
  AssignmentTurnedIn,
  Dashboard,
  Description,
  Logout,
  Menu,
  Settings,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu as MuiMenu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../hooks/useAuth.jsx';

const drawerWidth = 272;

const menuItems = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { label: 'Entry Form', icon: <AddLocationAlt />, path: '/entry' },
  { label: 'Land Records', icon: <Description />, path: '/records' },
  { label: 'Workflow Tracker', icon: <AssignmentTurnedIn />, path: '/workflow' },
  { label: 'Reports', icon: <Analytics />, path: '/reports' },
  { label: 'Settings', icon: <Settings />, path: '/settings' },
];

function AppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle = useMemo(() => {
    return menuItems.find((item) => location.pathname.startsWith(item.path))?.label ?? 'Dashboard';
  }, [location.pathname]);

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0b376d', color: 'white' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Crownridge LLP</Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)', mt: 0.5 }}>
          Land Due Diligence Tracker
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.14)' }} />
      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const selected = location.pathname.startsWith(item.path);
          return (
            <ListItemButton
              key={item.path}
              selected={selected}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                mb: 0.75,
                borderRadius: 2,
                color: selected ? '#0b376d' : 'rgba(255,255,255,0.84)',
                bgcolor: selected ? 'white !important' : 'transparent',
                '&:hover': { bgcolor: selected ? 'white' : 'rgba(255,255,255,0.1)' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: selected ? 700 : 500 }} />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ p: 2, color: 'rgba(255,255,255,0.72)' }}>
        <Typography variant="caption">Base API: localhost:5000/api</Typography>
      </Box>
    </Box>
  );

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        className="no-print"
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid rgba(20, 85, 163, 0.1)',
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" aria-label="Open navigation" onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}>
              <Menu />
            </IconButton>
          )}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" noWrap>{pageTitle}</Typography>
            <Typography variant="caption" color="text.secondary">Centralized acquisition, title verification, and legal clearance operations</Typography>
          </Box>
          <Tooltip title="User profile">
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                {(user?.name?.[0] ?? 'U').toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
          <MuiMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem disabled>
              <AccountCircle sx={{ mr: 1 }} />
              {user?.name}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </MuiMenu>
        </Toolbar>
      </AppBar>

      <Box component="nav" className="no-print" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, border: 0 } }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, mt: 8, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;
