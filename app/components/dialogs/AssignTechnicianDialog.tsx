"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Typography,
  Box,
} from "@mui/material";
import {
  getAllTechnicians,
  Technician,
} from "@/app/services/technician/technician.service";
import {
  assignTechnician,
  unassignTechnician,
} from "@/app/services/connectionData/connectionData.service";

interface AssignTechnicianDialogProps {
  open: boolean;
  onClose: () => void;
  connectionDataId: string;
  currentTechnicianId?: string;
  currentTechnicianName?: string;
  onSuccess: () => void;
}

export default function AssignTechnicianDialog({
  open,
  onClose,
  connectionDataId,
  currentTechnicianId,
  currentTechnicianName,
  onSuccess,
}: AssignTechnicianDialogProps) {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [selectedTechnicianId, setSelectedTechnicianId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchTechnicians();
      setSelectedTechnicianId(currentTechnicianId || "");
      setError(null);
    }
  }, [open, currentTechnicianId]);

  const fetchTechnicians = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Unauthorized. Please login again.");
        return;
      }

      const response = await getAllTechnicians(token);
      // Handle both array and wrapped responses
      const techniciansData = Array.isArray(response)
        ? response
        : response.data || [];
      setTechnicians(techniciansData);
    } catch (err: any) {
      console.error("Error fetching technicians:", err);
      setError(err.response?.data?.message || "Failed to load technicians");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedTechnicianId) {
      setError("Please select a technician");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Unauthorized. Please login again.");
        return;
      }

      await assignTechnician(connectionDataId, selectedTechnicianId, token);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Error assigning technician:", err);
      setError(err.response?.data?.message || "Failed to assign technician");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnassign = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Unauthorized. Please login again.");
        return;
      }

      await unassignTechnician(connectionDataId, token);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Error unassigning technician:", err);
      setError(err.response?.data?.message || "Failed to unassign technician");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="assign-technician-dialog-title"
    >
      <DialogTitle id="assign-technician-dialog-title">
        {currentTechnicianId ? "Ubah Teknisi" : "Assign Teknisi"}
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {currentTechnicianName && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Teknisi saat ini:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {currentTechnicianName}
            </Typography>
          </Box>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" py={3}>
            <CircularProgress />
          </Box>
        ) : (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="technician-select-label">Pilih Teknisi</InputLabel>
            <Select
              labelId="technician-select-label"
              id="technician-select"
              value={selectedTechnicianId}
              label="Pilih Teknisi"
              onChange={(e) => setSelectedTechnicianId(e.target.value)}
              disabled={submitting}
            >
              <MenuItem value="">
                <em>-- Pilih Teknisi --</em>
              </MenuItem>
              {technicians.map((technician) => (
                <MenuItem key={technician._id} value={technician._id}>
                  {technician.fullName} - {technician.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        {currentTechnicianId && (
          <Button
            onClick={handleUnassign}
            disabled={submitting || loading}
            color="error"
            variant="outlined"
          >
            {submitting ? "Removing..." : "Hapus Assignment"}
          </Button>
        )}
        <Box sx={{ flex: 1 }} />
        <Button onClick={handleClose} disabled={submitting} color="inherit">
          Batal
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={submitting || loading || !selectedTechnicianId}
          variant="contained"
          color="primary"
        >
          {submitting ? <CircularProgress size={24} /> : "Assign"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
