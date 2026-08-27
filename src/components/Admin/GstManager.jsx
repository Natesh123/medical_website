import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Button, Card, CardContent, Typography, CircularProgress, Box,
    Dialog, DialogTitle, DialogContent, TextField, Grid
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';

import MetaData from "../Layouts/MetaData";
import { getAdminGsts, createGst, updateGst, deleteGst, clearErrors } from "../../actions/gstAction";
import { NEW_GST_RESET, UPDATE_GST_RESET, DELETE_GST_RESET } from "../../constants/gstConstants";

const GstManager = () => {
    const dispatch = useDispatch();

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedGst, setSelectedGst] = useState(null);

    const [gstForm, setGstForm] = useState({ name: '', percentage: '' });
    const [validation, setValidation] = useState({});

    const { loading, gsts, error } = useSelector((state) => state.gsts);
    const { isDeleted, error: deleteError, isUpdated, error: updateError } = useSelector((state) => state.gst);
    const { success: createSuccess, error: createError } = useSelector((state) => state.newGst);

    useEffect(() => {
        dispatch(getAdminGsts());
    }, [dispatch]);

    useEffect(() => {
        if (error) { Swal.fire({ title: "Failed!", text: error, icon: "error", timer: 2000 }); dispatch(clearErrors()); }
        if (deleteError) { Swal.fire({ title: "Failed!", text: deleteError, icon: "error", timer: 2000 }); dispatch(clearErrors()); }
        if (createError) { Swal.fire({ title: "Failed!", text: createError, icon: "error", timer: 2000 }); dispatch(clearErrors()); }
        if (updateError) { Swal.fire({ title: "Failed!", text: updateError, icon: "error", timer: 2000 }); dispatch(clearErrors()); }

        if (isDeleted) {
            Swal.fire({ title: "Success!", text: "GST deleted successfully!", icon: "success", timer: 2000 });
            dispatch({ type: DELETE_GST_RESET });
            dispatch(getAdminGsts());
        }
        if (createSuccess) {
            Swal.fire({ title: "Success!", text: "GST created successfully!", icon: "success", timer: 2000 });
            dispatch({ type: NEW_GST_RESET });
            dispatch(getAdminGsts());
            handleCloseAddModal();
        }
        if (isUpdated) {
            Swal.fire({ title: "Success!", text: "GST updated successfully!", icon: "success", timer: 2000 });
            dispatch({ type: UPDATE_GST_RESET });
            dispatch(getAdminGsts());
            handleCloseEditModal();
        }
    }, [dispatch, error, deleteError, isDeleted, createSuccess, createError, isUpdated, updateError]);

    const handleOpenAddModal = () => {
        setGstForm({ name: '', percentage: '' });
        setValidation({});
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => setOpenAddModal(false);

    const handleOpenEditModal = (gst) => {
        setSelectedGst(gst);
        setGstForm({ name: gst.name, percentage: gst.percentage });
        setValidation({});
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedGst(null);
    };

    const validateForm = () => {
        const errors = {};
        if (!gstForm.name.trim()) errors.name = "GST Name is required";
        if (gstForm.percentage === '') errors.percentage = "Percentage is required";
        setValidation(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(createGst(gstForm));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(updateGst(selectedGst._id, gstForm));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteGst(id));
            }
        });
    };

    if (loading) return <div className="w-full h-screen flex justify-center items-center"><CircularProgress /></div>;

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="GST Manager | Shree Kishan Aayushi" />

            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-1 bg-green-600 rounded-full"></div>
                        <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-[0.3em]">Tax Setup</p>
                    </div>
                    <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                        GST <span style={{ color: '#16a34a' }}>Manager</span>
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddModal}
                    sx={{
                        borderRadius: '18px', textTransform: 'uppercase', fontWeight: 900,
                        letterSpacing: '0.1em', fontSize: '11px', px: 4, py: 2, background: '#16a34a',
                        boxShadow: '0 15px 30px rgba(22, 163, 74, 0.15)',
                        '&:hover': { background: '#14532d', transform: 'translateY(-2px)' },
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    Add GST
                </Button>
            </Box>

            <Card sx={{ borderRadius: '35px', boxShadow: '0 40px 100px rgba(22, 163, 74, 0.04)', border: '1px solid #f1f5f9', background: '#ffffff', overflow: 'hidden' }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: 950, color: 'rgba(2, 6, 23, 0.3)', fontSize: '10px', py: 4, bgcolor: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>S.No</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 950, color: 'rgba(2, 6, 23, 0.3)', fontSize: '10px', py: 4, bgcolor: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>GST Name</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 950, color: 'rgba(2, 6, 23, 0.3)', fontSize: '10px', py: 4, bgcolor: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Percentage (%)</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 950, color: 'rgba(2, 6, 23, 0.3)', fontSize: '10px', py: 4, bgcolor: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {gsts?.map((gst, index) => (
                                    <TableRow key={gst._id} sx={{ transition: 'all 0.4s ease', '&:hover': { background: '#f0fdf4' }, '& td': { borderBottom: '1px solid #f8fafc', py: 3 } }}>
                                        <TableCell align="center">
                                            <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.2)', fontWeight: 900 }}>{(index + 1).toString().padStart(2, '0')}</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography sx={{ fontSize: '13px', color: '#020617', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{gst.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{ fontSize: '13px', color: '#16a34a', fontWeight: 900, bgcolor: '#f0fdf4', px: 2, py: 0.8, borderRadius: '8px', display: 'inline-block' }}>{gst.percentage}%</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
                                                <IconButton onClick={() => handleOpenEditModal(gst)} sx={{ color: '#16a34a', background: '#f0fdf4', borderRadius: '12px', '&:hover': { background: '#16a34a', color: '#fff' } }}>
                                                    <EditIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(gst._id)} sx={{ color: '#ef4444', background: '#fef2f2', borderRadius: '12px', '&:hover': { background: '#ef4444', color: '#fff' } }}>
                                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Modals */}
            <Dialog open={openAddModal || openEditModal} onClose={openAddModal ? handleCloseAddModal : handleCloseEditModal} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '40px', boxShadow: '0 50px 100px rgba(22, 163, 74, 0.15)', border: '1px solid #f1f5f9' } }}>
                <DialogTitle sx={{ p: 6, pb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-1 bg-green-600 rounded-full"></div>
                                <p className="text-[9px] font-semibold text-green-900/40 uppercase tracking-[0.2em]">GST Form</p>
                            </div>
                            <Typography variant="h5" sx={{ fontWeight: 950, color: '#020617', textTransform: 'uppercase' }}>
                                {openAddModal ? 'Add' : 'Edit'} <span style={{ color: '#16a34a' }}>GST</span>
                            </Typography>
                        </Box>
                        <IconButton onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal}><CloseIcon /></IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ px: 6, py: 4 }}>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">GST Name (e.g. GST 18%)</label>
                            <TextField fullWidth variant="outlined" value={gstForm.name} onChange={(e) => setGstForm({ ...gstForm, name: e.target.value })} error={!!validation.name} helperText={validation.name} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Percentage (%)</label>
                            <TextField fullWidth type="number" variant="outlined" value={gstForm.percentage} onChange={(e) => setGstForm({ ...gstForm, percentage: e.target.value })} error={!!validation.percentage} helperText={validation.percentage} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }} />
                        </div>
                        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                            <Button fullWidth onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal} sx={{ borderRadius: '15px', color: '#94a3b8', fontWeight: 900, fontSize: '11px' }}>Cancel</Button>
                            <Button fullWidth variant="contained" onClick={openAddModal ? handleAddSubmit : handleEditSubmit} sx={{ borderRadius: '15px', bgcolor: '#16a34a', fontWeight: 900, fontSize: '11px', boxShadow: '0 10px 20px rgba(22,163,74,0.2)' }}>
                                {openAddModal ? 'Save' : 'Update'}
                            </Button>
                        </Box>
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default GstManager;
