import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Button, Card, CardContent, Typography, CircularProgress, Box,
    Dialog, DialogTitle, DialogContent, TextField, Grid, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';

import MetaData from "../Layouts/MetaData";
import { getAdminOffers, createOffer, updateOffer, deleteOffer, clearErrors } from "../../actions/offerAction";
import { NEW_OFFER_RESET, UPDATE_OFFER_RESET, DELETE_OFFER_RESET } from "../../constants/offerConstants";

const OfferManager = () => {
    const dispatch = useDispatch();

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);

    const initialFormState = {
        name: '',
        description: '',
        discountType: 'percentage',
        offerType: 'general',
        value: '',
        minPurchaseAmount: 0,
        startDate: '',
        endDate: '',
        isActive: true
    };

    const [offerForm, setOfferForm] = useState(initialFormState);
    const [validation, setValidation] = useState({});

    const { loading, offers, error } = useSelector((state) => state.offers);
    const { isDeleted, error: deleteError, isUpdated, error: updateError } = useSelector((state) => state.offer);
    const { success: createSuccess, error: createError } = useSelector((state) => state.newOffer);

    useEffect(() => {
        dispatch(getAdminOffers());
    }, [dispatch]);

    useEffect(() => {
        if (error) { Swal.fire({ title: "Failed!", text: error, icon: "error", timer: 2000 }); dispatch(clearErrors()); }
        if (deleteError) { Swal.fire({ title: "Failed!", text: deleteError, icon: "error", timer: 2000 }); dispatch(clearErrors()); }
        if (createError) { Swal.fire({ title: "Failed!", text: createError, icon: "error", timer: 2000 }); dispatch(clearErrors()); }
        if (updateError) { Swal.fire({ title: "Failed!", text: updateError, icon: "error", timer: 2000 }); dispatch(clearErrors()); }

        if (isDeleted) {
            Swal.fire({ title: "Success!", text: "Offer deleted successfully!", icon: "success", timer: 2000 });
            dispatch({ type: DELETE_OFFER_RESET });
            dispatch(getAdminOffers());
        }
        if (createSuccess) {
            Swal.fire({ title: "Success!", text: "Offer created successfully!", icon: "success", timer: 2000 });
            dispatch({ type: NEW_OFFER_RESET });
            dispatch(getAdminOffers());
            handleCloseAddModal();
        }
        if (isUpdated) {
            Swal.fire({ title: "Success!", text: "Offer updated successfully!", icon: "success", timer: 2000 });
            dispatch({ type: UPDATE_OFFER_RESET });
            dispatch(getAdminOffers());
            handleCloseEditModal();
        }
    }, [dispatch, error, deleteError, isDeleted, createSuccess, createError, isUpdated, updateError]);

    const handleOpenAddModal = () => {
        setOfferForm(initialFormState);
        setValidation({});
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => setOpenAddModal(false);

    const handleOpenEditModal = (offer) => {
        setSelectedOffer(offer);
        setOfferForm({
            name: offer.name,
            description: offer.description,
            discountType: offer.discountType,
            offerType: offer.offerType,
            value: offer.value,
            minPurchaseAmount: offer.minPurchaseAmount,
            startDate: offer.startDate ? new Date(offer.startDate).toISOString().split('T')[0] : '',
            endDate: offer.endDate ? new Date(offer.endDate).toISOString().split('T')[0] : '',
            isActive: offer.isActive
        });
        setValidation({});
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedOffer(null);
    };

    const validateForm = () => {
        const errors = {};
        if (!offerForm.name.trim()) errors.name = "Name is required";
        if (!offerForm.description.trim()) errors.description = "Description is required";
        if (offerForm.value === '' || offerForm.value <= 0) errors.value = "Valid value is required";
        if (!offerForm.startDate) errors.startDate = "Start Date is required";
        if (!offerForm.endDate) errors.endDate = "End Date is required";
        if (new Date(offerForm.startDate) > new Date(offerForm.endDate)) {
            errors.endDate = "End Date cannot be before Start Date";
        }

        setValidation(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(createOffer(offerForm));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(updateOffer(selectedOffer._id, offerForm));
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
                dispatch(deleteOffer(id));
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOfferForm({ ...offerForm, [name]: value });
    };

    if (loading) return <div className="w-full h-screen flex justify-center items-center"><CircularProgress /></div>;

    return (
        <Box sx={{ minHeight: '100vh', py: 4, px: { xs: 2, md: 4 } }}>
            <MetaData title="Offer Manager | Admin" />

            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-1 bg-purple-600 rounded-full"></div>
                        <p className="text-[10px] font-semibold text-purple-900/40 uppercase tracking-[0.3em]">Promotions</p>
                    </div>
                    <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                        Offer <span style={{ color: '#9333ea' }}>Manager</span>
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddModal}
                    sx={{
                        borderRadius: '18px', textTransform: 'uppercase', fontWeight: 900,
                        letterSpacing: '0.1em', fontSize: '11px', px: 4, py: 2, background: '#9333ea',
                        boxShadow: '0 15px 30px rgba(147, 51, 234, 0.15)',
                        '&:hover': { background: '#7e22ce', transform: 'translateY(-2px)' },
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    Add Offer
                </Button>
            </Box>

            <Card sx={{ borderRadius: '35px', boxShadow: '0 40px 100px rgba(147, 51, 234, 0.04)', border: '1px solid #f1f5f9', background: '#ffffff', overflow: 'hidden' }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: 950, color: 'rgba(2, 6, 23, 0.3)', fontSize: '10px', py: 4, bgcolor: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>S.No</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 950, color: 'rgba(2, 6, 23, 0.3)', fontSize: '10px', py: 4, bgcolor: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Offer Name</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 950, color: 'rgba(2, 6, 23, 0.3)', fontSize: '10px', py: 4, bgcolor: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Type</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 950, color: 'rgba(2, 6, 23, 0.3)', fontSize: '10px', py: 4, bgcolor: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Value</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 950, color: 'rgba(2, 6, 23, 0.3)', fontSize: '10px', py: 4, bgcolor: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Valid Till</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 950, color: 'rgba(2, 6, 23, 0.3)', fontSize: '10px', py: 4, bgcolor: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {offers && offers.length > 0 ? offers.map((offer, index) => (
                                    <TableRow key={offer._id} sx={{ transition: 'all 0.4s ease', '&:hover': { background: '#faf5ff' }, '& td': { borderBottom: '1px solid #f8fafc', py: 3 } }}>
                                        <TableCell align="center">
                                            <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.2)', fontWeight: 900 }}>{(index + 1).toString().padStart(2, '0')}</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography sx={{ fontSize: '13px', color: '#020617', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{offer.name}</Typography>
                                            <Typography sx={{ fontSize: '10px', color: '#64748b' }}>{offer.offerType.toUpperCase()}</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography sx={{ fontSize: '12px', color: '#64748b', fontWeight: 700, textTransform: 'capitalize' }}>{offer.discountType}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{ fontSize: '13px', color: '#9333ea', fontWeight: 900, bgcolor: '#faf5ff', px: 2, py: 0.8, borderRadius: '8px', display: 'inline-block' }}>
                                                {offer.discountType === 'percentage' ? `${offer.value}%` : `₹${offer.value}`}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>
                                                {new Date(offer.endDate).toLocaleDateString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
                                                <IconButton onClick={() => handleOpenEditModal(offer)} sx={{ color: '#9333ea', background: '#faf5ff', borderRadius: '12px', '&:hover': { background: '#9333ea', color: '#fff' } }}>
                                                    <EditIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(offer._id)} sx={{ color: '#ef4444', background: '#fef2f2', borderRadius: '12px', '&:hover': { background: '#ef4444', color: '#fff' } }}>
                                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                            <Typography sx={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>No offers found.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Modal */}
            <Dialog open={openAddModal || openEditModal} onClose={openAddModal ? handleCloseAddModal : handleCloseEditModal} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '40px', boxShadow: '0 50px 100px rgba(147, 51, 234, 0.15)', border: '1px solid #f1f5f9' } }}>
                <DialogTitle sx={{ p: 6, pb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-1 bg-purple-600 rounded-full"></div>
                                <p className="text-[9px] font-semibold text-purple-900/40 uppercase tracking-[0.2em]">Offer Form</p>
                            </div>
                            <Typography variant="h5" sx={{ fontWeight: 950, color: '#020617', textTransform: 'uppercase' }}>
                                {openAddModal ? 'Add' : 'Edit'} <span style={{ color: '#9333ea' }}>Offer</span>
                            </Typography>
                        </Box>
                        <IconButton onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal}><CloseIcon /></IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ px: 6, py: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-purple-900/40 uppercase tracking-widest ml-1">Offer Name</label>
                                <TextField fullWidth variant="outlined" name="name" value={offerForm.name} onChange={handleChange} error={!!validation.name} helperText={validation.name} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-purple-900/40 uppercase tracking-widest ml-1">Offer Type</label>
                                <FormControl fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }}>
                                    <Select name="offerType" value={offerForm.offerType} onChange={handleChange}>
                                        <MenuItem value="general">General</MenuItem>
                                        <MenuItem value="seasonal">Seasonal</MenuItem>
                                        <MenuItem value="combo">Combo</MenuItem>
                                        <MenuItem value="role_based">Role Based</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-purple-900/40 uppercase tracking-widest ml-1">Description</label>
                                <TextField fullWidth variant="outlined" multiline rows={2} name="description" value={offerForm.description} onChange={handleChange} error={!!validation.description} helperText={validation.description} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }} />
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-purple-900/40 uppercase tracking-widest ml-1">Discount Type</label>
                                <FormControl fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }}>
                                    <Select name="discountType" value={offerForm.discountType} onChange={handleChange}>
                                        <MenuItem value="percentage">Percentage (%)</MenuItem>
                                        <MenuItem value="fixed">Fixed Amount</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-purple-900/40 uppercase tracking-widest ml-1">Value</label>
                                <TextField fullWidth type="number" variant="outlined" name="value" value={offerForm.value} onChange={handleChange} error={!!validation.value} helperText={validation.value} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-purple-900/40 uppercase tracking-widest ml-1">Min Purchase Amt</label>
                                <TextField fullWidth type="number" variant="outlined" name="minPurchaseAmount" value={offerForm.minPurchaseAmount} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }} />
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-purple-900/40 uppercase tracking-widest ml-1">Start Date</label>
                                <TextField fullWidth type="date" variant="outlined" name="startDate" value={offerForm.startDate} onChange={handleChange} error={!!validation.startDate} helperText={validation.startDate} InputLabelProps={{ shrink: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-purple-900/40 uppercase tracking-widest ml-1">End Date</label>
                                <TextField fullWidth type="date" variant="outlined" name="endDate" value={offerForm.endDate} onChange={handleChange} error={!!validation.endDate} helperText={validation.endDate} InputLabelProps={{ shrink: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }} />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal} sx={{ borderRadius: '15px', color: '#94a3b8', fontWeight: 900, fontSize: '11px', px: 4 }}>Cancel</Button>
                                <Button variant="contained" onClick={openAddModal ? handleAddSubmit : handleEditSubmit} sx={{ borderRadius: '15px', bgcolor: '#9333ea', fontWeight: 900, fontSize: '11px', px: 6, boxShadow: '0 10px 20px rgba(147,51,234,0.2)' }}>
                                    {openAddModal ? 'Save Offer' : 'Update Offer'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default OfferManager;
