import { Add, Delete, Edit, FilterList, Visibility } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { activityService } from '../services/activityService.js';
import { landService } from '../services/landService.js';
import { ROLES } from '../utils/rbac.js';

const columns = [
  { key: 'surveyNumber', label: 'Survey Number' },
  { key: 'ownerName', label: 'Owner' },
  { key: 'location', label: 'Location' },
  { key: 'area', label: 'Area' },
  { key: 'titleStatus', label: 'Title Status' },
  { key: 'encumbranceStatus', label: 'Encumbrance Status' },
  { key: 'legalClearanceStatus', label: 'Legal Clearance' },
];

function LandRecords() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [orderBy, setOrderBy] = useState('surveyNumber');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewRecord, setViewRecord] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchRecords = () => {
    setLoading(true);
    landService.getAll().then((data) => {
      setRecords(data || []);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchRecords(); }, []);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return records
      .filter((record) => {
        const matchesSearch = [record.surveyNumber, record.ownerName, record.location, record.village, record.parcelId]
          .join(' ')
          .toLowerCase()
          .includes(normalized);
        const matchesFilter = statusFilter === 'All' || record.legalClearanceStatus === statusFilter || record.titleStatus === statusFilter || record.encumbranceStatus === statusFilter;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        const left = a[orderBy];
        const right = b[orderBy];
        if (typeof left === 'number') {
          return order === 'asc' ? left - right : right - left;
        }
        return order === 'asc'
          ? String(left).localeCompare(String(right))
          : String(right).localeCompare(String(left));
      });
  }, [records, query, statusFilter, orderBy, order]);

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSort = (key) => {
    const isCurrent = orderBy === key;
    setOrder(isCurrent && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(key);
  };

  const handleDelete = async () => {
    const record = records.find((r) => r.id === deleteId || r._id === deleteId);
    await landService.remove(deleteId);
    await activityService.create(`Record Deleted: ${record?.surveyNumber || deleteId}`, user);
    setDeleteId(null);
    fetchRecords();
  };

  const canEditRecords = [ROLES.ADMIN, ROLES.OFFICER, ROLES.LEGAL].includes(user?.role);
  const canDeleteRecords = user?.role === ROLES.ADMIN;

  if (loading) return <LoadingState label="Loading land records..." />;

  return (
    <Box>
      <SectionHeader
        title="Land Records Management"
        subtitle="Search, filter, sort, view, edit, and delete due diligence records."
        action={user?.role !== ROLES.LEGAL && <Button startIcon={<Add />} variant="contained" onClick={() => navigate('/entry')}>Add Record</Button>}
      />
      <Card>
        <CardContent>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={8}>
              <TextField
                label="Search records"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(0);
                }}
                fullWidth
                InputProps={{ startAdornment: <InputAdornment position="start"><FilterList /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField select label="Filter by Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} fullWidth>
                {['All', 'Pending', 'Verified', 'Clear', 'Issue Found', 'Cleared', 'Blocked', 'Rejected'].map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      <TableSortLabel active={orderBy === column.key} direction={orderBy === column.key ? order : 'asc'} onClick={() => handleSort(column.key)}>
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((record) => (
                  <TableRow hover key={record.id || record._id}>
                    <TableCell>{record.surveyNumber}</TableCell>
                    <TableCell>{record.ownerName}</TableCell>
                    <TableCell>{record.location}</TableCell>
                    <TableCell>{record.area} acres</TableCell>
                    <TableCell><StatusBadge label={record.titleStatus} /></TableCell>
                    <TableCell><StatusBadge label={record.encumbranceStatus} /></TableCell>
                    <TableCell><StatusBadge label={record.legalClearanceStatus} /></TableCell>
                    <TableCell align="right">
                      <Tooltip title="View">
                        <IconButton onClick={() => setViewRecord(record)}><Visibility /></IconButton>
                      </Tooltip>
                      {canEditRecords && (
                        <Tooltip title="Edit">
                          <IconButton onClick={() => navigate(`/entry/${record.id || record._id}`)}><Edit /></IconButton>
                        </Tooltip>
                      )}
                      {canDeleteRecords && (
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => setDeleteId(record.id || record._id)}><Delete /></IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filtered.length === 0 && !loading && <EmptyState />}
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={(_, nextPage) => setPage(nextPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardContent>
      </Card>

      <Dialog open={Boolean(viewRecord)} onClose={() => setViewRecord(null)} maxWidth="md" fullWidth>
        <DialogTitle>Land Record Details</DialogTitle>
        <DialogContent dividers>
          {viewRecord && (
            <Grid container spacing={2}>
              {Object.entries({
                'Survey Number': viewRecord.surveyNumber,
                'Parcel ID': viewRecord.parcelId,
                Location: viewRecord.location,
                Village: viewRecord.village,
                District: viewRecord.district,
                State: viewRecord.state,
                Area: `${viewRecord.area} acres`,
                Owner: viewRecord.ownerName,
                Contact: viewRecord.contactNumber,
                Address: viewRecord.address,
                Remarks: viewRecord.remarks,
              }).map(([label, value]) => (
                <Grid item xs={12} md={6} key={label}>
                  <Typography variant="caption" color="text.secondary">{label}</Typography>
                  <Typography fontWeight={700}>{value || '-'}</Typography>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <StatusBadge label={viewRecord.titleStatus} />
                  <StatusBadge label={viewRecord.encumbranceStatus} />
                  <StatusBadge label={viewRecord.legalClearanceStatus} />
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete land record"
        message="This action removes the selected record from the tracker."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}

export default LandRecords;
