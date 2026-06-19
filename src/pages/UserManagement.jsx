import { Add, Block, Edit, Key } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { userService } from '../services/userService.js';
import { passwordMeetsPolicy, roleLabels, ROLES } from '../utils/rbac.js';
import { getStoredUsers } from '../utils/users.js';

const blankUser = {
  employeeId: '',
  username: '',
  password: '',
  role: ROLES.OFFICER,
  status: 'ACTIVE',
};

function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState(getStoredUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(blankUser);
  const [editingId, setEditingId] = useState('');
  const [error, setError] = useState('');

  const refresh = () => setUsers(getStoredUsers());

  const openCreate = () => {
    setEditingId('');
    setForm(blankUser);
    setError('');
    setDialogOpen(true);
  };

  const openEdit = (selectedUser) => {
    setEditingId(selectedUser.employeeId);
    setForm({ ...selectedUser, password: selectedUser.password || '' });
    setError('');
    setDialogOpen(true);
  };

  const saveUser = async () => {
    if (!form.employeeId || !form.username || !form.role || !form.password) {
      setError('Employee ID, username, role, and password are required.');
      return;
    }
    if (!passwordMeetsPolicy(form.password)) {
      setError('Password must be 8+ chars with uppercase, lowercase, number, and special character.');
      return;
    }
    if (editingId) {
      await userService.update(editingId, form, user);
    } else {
      await userService.create(form, user);
    }
    refresh();
    setDialogOpen(false);
  };

  const disableUser = async (employeeId) => {
    await userService.disable(employeeId, user);
    refresh();
  };

  const resetPassword = async (employeeId) => {
    await userService.resetPassword(employeeId, user);
    refresh();
  };

  return (
    <Box>
      <SectionHeader
        title="User Management"
        subtitle="Admin-only controls for users, roles, status, and password recovery."
        action={<Button startIcon={<Add />} variant="contained" onClick={openCreate}>Add User</Button>}
      />
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((managedUser) => (
                  <TableRow hover key={managedUser.employeeId}>
                    <TableCell>{managedUser.employeeId}</TableCell>
                    <TableCell>{managedUser.username}</TableCell>
                    <TableCell>{roleLabels[managedUser.role]}</TableCell>
                    <TableCell><StatusBadge label={managedUser.status} /></TableCell>
                    <TableCell>{managedUser.lastLogin ? new Date(managedUser.lastLogin).toLocaleString() : '-'}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit user">
                        <IconButton onClick={() => openEdit(managedUser)}><Edit /></IconButton>
                      </Tooltip>
                      <Tooltip title="Disable user">
                        <IconButton color="warning" onClick={() => disableUser(managedUser.employeeId)}><Block /></IconButton>
                      </Tooltip>
                      <Tooltip title="Reset password to Reset@123">
                        <IconButton color="primary" onClick={() => resetPassword(managedUser.employeeId)}><Key /></IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField label="Employee ID" value={form.employeeId} disabled={Boolean(editingId)} onChange={(e) => setForm({ ...form, employeeId: e.target.value.toUpperCase() })} fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} fullWidth>
                {Object.values(ROLES).map((role) => <MenuItem key={role} value={role}>{roleLabels[role]}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} fullWidth>
                {['ACTIVE', 'INACTIVE', 'SUSPENDED'].map((status) => <MenuItem key={status} value={status}>{status}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={Boolean(error)} helperText={error || 'Minimum 8 characters with uppercase, lowercase, number, and special character.'} fullWidth required />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveUser}>Save User</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserManagement;
