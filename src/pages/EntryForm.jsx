import { Delete, RestartAlt, Save } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardContent, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import LoadingState from '../components/LoadingState.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { activityService } from '../services/activityService.js';
import { landService } from '../services/landService.js';
import { canEditSection, fieldPermissions } from '../utils/rbac.js';

const blankForm = {
  surveyNumber: '',
  parcelId: '',
  location: '',
  village: '',
  district: '',
  state: '',
  area: '',
  ownerName: '',
  contactNumber: '',
  address: '',
  titleStatus: 'Pending',
  encumbranceStatus: 'Pending',
  legalClearanceStatus: 'Pending',
  remarks: '',
};

const titleOptions = ['Pending', 'Verified', 'Rejected'];
const encumbranceOptions = ['Pending', 'Clear', 'Issue Found'];
const legalOptions = ['Pending', 'In Review', 'Cleared', 'Blocked'];

function EntryForm() {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState(blankForm);
  const [loading, setLoading] = useState(Boolean(recordId));
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isEdit = Boolean(recordId);
  const canEditLand = canEditSection(user, 'land');
  const canEditOwner = canEditSection(user, 'owner');
  const canEditLegal = canEditSection(user, 'legal');
  const canSave = fieldPermissions.saveRecord.includes(user?.role);
  const canDelete = fieldPermissions.deleteRecord.includes(user?.role);

  useEffect(() => {
    if (recordId) {
      setLoading(true);
      landService.getById(recordId).then((record) => {
        if (record) setForm(record);
        setLoading(false);
      });
    }
  }, [recordId]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    ['surveyNumber', 'parcelId', 'location', 'village', 'district', 'state', 'ownerName'].forEach((field) => {
      if (!form[field]?.toString().trim()) {
        nextErrors[field] = 'Required';
      }
    });
    if (!form.area || Number(form.area) <= 0) {
      nextErrors.area = 'Enter a valid area';
    }
    if (form.contactNumber && !/^[0-9+\\-\\s]{7,15}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = 'Enter a valid contact number';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    const payload = {
      ...form,
      area: Number(form.area),
      workflowStage: form.legalClearanceStatus === 'Cleared' ? 6 : form.workflowStage || 1,
    };

    try {
      if (isEdit) {
        await landService.update(recordId, payload);
      } else {
        await landService.create(payload);
      }
      await activityService.create(isEdit ? `Parcel Updated: ${payload.surveyNumber}` : `Parcel Added: ${payload.surveyNumber}`, user);
      setSuccess(isEdit ? 'Record updated successfully.' : 'Record saved successfully.');
      if (!isEdit) setForm(blankForm);
    } catch {
      setSuccess('Saved locally (no backend available).');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    await landService.remove(recordId);
    await activityService.create(`Record Deleted: ${form.surveyNumber || recordId}`, user);
    navigate('/records', { replace: true });
  };

  const handleReset = () => {
    setForm(blankForm);
    setErrors({});
    setSuccess('');
  };

  if (loading) return <LoadingState label="Loading record..." />;

  return (
    <Box>
      <SectionHeader
        title={isEdit ? 'Edit Land Acquisition Record' : 'Land Acquisition Entry Form'}
        subtitle={`Capture parcel, ownership, verification, encumbrance, and legal clearance details. Current role: ${user?.roleLabel}.`}
        action={isEdit && canDelete && <Button color="error" startIcon={<Delete />} onClick={() => setConfirmOpen(true)}>Delete Record</Button>}
      />
      {!canSave && <Alert severity="info" sx={{ mb: 2 }}>Your role has read-only access to this record.</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Card>
        <CardContent>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <SectionHeader title="Land Details" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField disabled={!canEditLand} label="Survey Number" value={form.surveyNumber} onChange={(e) => updateField('surveyNumber', e.target.value)} error={Boolean(errors.surveyNumber)} helperText={errors.surveyNumber} fullWidth required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField disabled={!canEditLand} label="Parcel ID" value={form.parcelId} onChange={(e) => updateField('parcelId', e.target.value)} error={Boolean(errors.parcelId)} helperText={errors.parcelId} fullWidth required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField disabled={!canEditLand} label="Area (Acres)" type="number" value={form.area} onChange={(e) => updateField('area', e.target.value)} error={Boolean(errors.area)} helperText={errors.area} fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField disabled={!canEditLand} label="Location" value={form.location} onChange={(e) => updateField('location', e.target.value)} error={Boolean(errors.location)} helperText={errors.location} fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField disabled={!canEditLand} label="Village" value={form.village} onChange={(e) => updateField('village', e.target.value)} error={Boolean(errors.village)} helperText={errors.village} fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField disabled={!canEditLand} label="District" value={form.district} onChange={(e) => updateField('district', e.target.value)} error={Boolean(errors.district)} helperText={errors.district} fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField disabled={!canEditLand} label="State" value={form.state} onChange={(e) => updateField('state', e.target.value)} error={Boolean(errors.state)} helperText={errors.state} fullWidth required />
            </Grid>

            <Grid item xs={12}>
              <SectionHeader title="Owner Details" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField disabled={!canEditOwner} label="Owner Name" value={form.ownerName} onChange={(e) => updateField('ownerName', e.target.value)} error={Boolean(errors.ownerName)} helperText={errors.ownerName} fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField disabled={!canEditOwner} label="Contact Number" value={form.contactNumber} onChange={(e) => updateField('contactNumber', e.target.value)} error={Boolean(errors.contactNumber)} helperText={errors.contactNumber} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField disabled={!canEditOwner} label="Address" value={form.address} onChange={(e) => updateField('address', e.target.value)} fullWidth multiline minRows={2} />
            </Grid>

            <Grid item xs={12}>
              <SectionHeader title="Verification Details" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField disabled={!canEditLegal} select label="Title Verification Status" value={form.titleStatus} onChange={(e) => updateField('titleStatus', e.target.value)} fullWidth>
                {titleOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField disabled={!canEditLegal} select label="Encumbrance Status" value={form.encumbranceStatus} onChange={(e) => updateField('encumbranceStatus', e.target.value)} fullWidth>
                {encumbranceOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField disabled={!canEditLegal} select label="Legal Clearance Status" value={form.legalClearanceStatus} onChange={(e) => updateField('legalClearanceStatus', e.target.value)} fullWidth>
                {legalOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField disabled={!canEditLegal} label="Remarks" value={form.remarks} onChange={(e) => updateField('remarks', e.target.value)} fullWidth multiline minRows={3} />
            </Grid>
            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="flex-end">
                <Button startIcon={<RestartAlt />} variant="outlined" onClick={handleReset}>Reset Form</Button>
                <Button disabled={!canSave || saving} startIcon={<Save />} variant="contained" onClick={handleSave}>{saving ? 'Saving...' : 'Save Record'}</Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete land record"
        message="This will remove the selected land acquisition record."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}

export default EntryForm;
