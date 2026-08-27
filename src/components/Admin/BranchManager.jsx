import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Card,
    CardContent,
    Typography,
    TablePagination,
    TextField,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Switch,
    FormControlLabel
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MetaData from '../Layouts/MetaData';

import { useDispatch, useSelector } from "react-redux";
import {
    getAllBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    clearErrors
} from "../../actions/branchAction";
import { NEW_BRANCH_RESET, UPDATE_BRANCH_RESET, DELETE_BRANCH_RESET } from "../../constants/branchConstants";

const BranchManager = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);

    // Form states
    const [branchForm, setBranchForm] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        isActive: true
    });

    const [validation, setValidation] = useState({});

    const { loading, branches, error } = useSelector((state) => state.branches);
    const { success: createSuccess, error: createError } = useSelector((state) => state.newBranch);
    const { isUpdated, isDeleted, error: branchError } = useSelector((state) => state.branch);

    const filteredBranches = (branches || []).filter((branch) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;

        return (
            String(branch.name || '').toLowerCase().includes(term) ||
            String(branch.email || '').toLowerCase().includes(term) ||
            String(branch.phone || '').toLowerCase().includes(term)
        );
    });

    useEffect(() => {
        if (error) {
            Swal.fire({ title: "Failed!", text: error, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }

        if (branchError) {
            Swal.fire({ title: "Failed!", text: branchError, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }

        if (isDeleted) {
            Swal.fire({ title: "Success!", text: "Branch deleted successfully!", icon: "success", timer: 2000 });
            dispatch({ type: DELETE_BRANCH_RESET });
            dispatch(getAllBranches());
        }

        if (createSuccess) {
            Swal.fire({ title: "Success!", text: "Branch created successfully!", icon: "success", timer: 2000 });
            dispatch({ type: NEW_BRANCH_RESET });
            dispatch(getAllBranches());
            handleCloseAddModal();
        }

        if (createError) {
            Swal.fire({ title: "Failed!", text: createError, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            Swal.fire({ title: "Success!", text: "Branch updated successfully!", icon: "success", timer: 2000 });
            dispatch({ type: UPDATE_BRANCH_RESET });
            dispatch(getAllBranches());
            handleCloseEditModal();
        }

        dispatch(getAllBranches());
    }, [dispatch, error, branchError, isDeleted, createSuccess, createError, isUpdated]);

    const handleOpenAddModal = () => {
        setBranchForm({ name: '', address: '', phone: '', email: '', isActive: true });
        setValidation({});
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setBranchForm({ name: '', address: '', phone: '', email: '', isActive: true });
        setValidation({});
    };

    const handleOpenEditModal = (branch) => {
        setSelectedBranch(branch);
        setBranchForm({
            name: branch.name || '',
            address: branch.address || '',
            phone: branch.phone || '',
            email: branch.email || '',
            isActive: branch.isActive !== undefined ? branch.isActive : true
        });
        setValidation({});
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedBranch(null);
        setBranchForm({ name: '', address: '', phone: '', email: '', isActive: true });
        setValidation({});
    };

    const validateForm = () => {
        const errors = {};
        if (!branchForm.name.trim()) errors.name = "Branch name is required";
        if (!branchForm.address.trim()) errors.address = "Address is required";
        if (!branchForm.phone.trim()) errors.phone = "Phone is required";
        if (!branchForm.email.trim()) errors.email = "Email is required";
        
        setValidation(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(createBranch(branchForm));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(updateBranch(selectedBranch._id, branchForm));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteBranch(id));
            }
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="Branch Management | Shree Kishan Aayushi" />

            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-1 bg-green-600 rounded-full"></div>
                        <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-[0.3em]">Management</p>
                    </div>
                    <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                        All <span style={{ color: '#16a34a' }}>Branches</span>
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                    <div className="relative group">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 text-sm group-focus-within:text-green-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search Branch..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                            className="pl-11 pr-6 py-3.5 bg-white border border-slate-100 rounded-[20px] text-[11px] font-semibold uppercase tracking-widest text-slate-950 outline-none w-64 shadow-sm hover:border-blue-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                        />
                    </div>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddModal}
                        sx={{
                            borderRadius: '20px',
                            textTransform: 'uppercase',
                            fontWeight: 900,
                            letterSpacing: '0.1em',
                            fontSize: '11px',
                            px: 4,
                            py: 2,
                            background: '#16a34a',
                            boxShadow: '0 15px 30px rgba(22, 163, 74, 0.15)',
                            '&:hover': { background: '#14532d', transform: 'translateY(-2px)' },
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    >
                        Add Branch
                    </Button>
                </Box>
            </Box>

            <Card sx={{
                borderRadius: '35px',
                boxShadow: '0 40px 100px rgba(22, 163, 74, 0.04)',
                border: '1px solid #f1f5f9',
                background: '#ffffff',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {[
                                        { label: 'S.No', width: '80px' },
                                        { label: 'Branch Name', width: 'auto' },
                                        { label: 'Contact', width: 'auto' },
                                        { label: 'Status', width: '120px' },
                                        { label: 'Actions', width: '120px' }
                                    ].map((head, i) => (
                                        <TableCell
                                            key={i}
                                            align={i === 0 || i > 2 ? "center" : "left"}
                                            sx={{
                                                fontWeight: 950,
                                                color: 'rgba(2, 6, 23, 0.3)',
                                                fontSize: '10px',
                                                py: 4,
                                                bgcolor: '#f8fafc',
                                                borderBottom: '1px solid #f1f5f9',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.15em',
                                                width: head.width
                                            }}
                                        >
                                            {head.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 12 }}>
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                                                <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '10px', color: 'rgba(2, 6, 23, 0.3)' }}>Loading...</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredBranches?.length > 0 ? (
                                    filteredBranches
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((branch, index) => (
                                            <TableRow
                                                key={branch._id}
                                                sx={{
                                                    transition: 'all 0.4s ease',
                                                    '&:hover': { background: '#f0fdf4' },
                                                    '& td': { borderBottom: '1px solid #f8fafc', py: 3 }
                                                }}
                                            >
                                                <TableCell align="center">
                                                    <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.2)', fontWeight: 900 }}>
                                                        {((page * rowsPerPage) + index + 1).toString().padStart(2, '0')}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Box sx={{
                                                            width: 44, height: 44,
                                                            borderRadius: '12px',
                                                            bgcolor: '#f1f5f9',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: 900,
                                                            color: '#16a34a',
                                                            border: '1px solid #e2e8f0'
                                                        }}>
                                                            {branch.name?.[0]?.toUpperCase() || 'B'}
                                                        </Box>
                                                        <Box>
                                                            <Typography sx={{ fontSize: '13px', color: '#020617', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                                                                {branch.name}
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.4)', fontWeight: 700, mt: 0.5 }}>
                                                                {branch.address}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '12px', color: '#16a34a', fontWeight: 800 }}>
                                                        {branch.phone}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.5)', fontWeight: 600, mt: 0.5 }}>
                                                        {branch.email}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{
                                                        fontSize: '9px',
                                                        fontWeight: 950,
                                                        color: branch.isActive ? '#059669' : '#ef4444',
                                                        background: branch.isActive ? '#ecfdf5' : '#fef2f2',
                                                        px: 2,
                                                        py: 1,
                                                        borderRadius: '20px',
                                                        display: 'inline-block',
                                                        border: `1px solid ${branch.isActive ? '#d1fae5' : '#fee2e2'}`,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.1em'
                                                    }}>
                                                        {branch.isActive ? 'Active' : 'Inactive'}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
                                                        <IconButton
                                                            onClick={() => handleOpenEditModal(branch)}
                                                            sx={{
                                                                color: '#16a34a',
                                                                background: '#f0fdf4',
                                                                borderRadius: '12px',
                                                                '&:hover': { background: '#16a34a', color: '#fff' },
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <EditIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => handleDelete(branch._id)}
                                                            sx={{
                                                                color: '#ef4444',
                                                                background: '#fef2f2',
                                                                borderRadius: '12px',
                                                                '&:hover': { background: '#ef4444', color: '#fff' },
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <DeleteIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 12 }}>
                                            <div className="flex flex-col items-center gap-4 opacity-20">
                                                <div className="w-16 h-16 rounded-full bg-slate-200"></div>
                                                <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '11px' }}>No Branches Found</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredBranches?.length || 0}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[10, 25, 50]}
                        sx={{
                            borderTop: '1px solid #f1f5f9',
                            px: 4,
                            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                fontSize: '10px',
                                color: 'rgba(2, 6, 23, 0.3)',
                                letterSpacing: '0.1em'
                            }
                        }}
                    />
                </CardContent>
            </Card>

            {/* Add Modal */}
            <Dialog 
                open={openAddModal} 
                onClose={handleCloseAddModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        padding: '16px'
                    }
                }}
            >
                <DialogTitle sx={{ pb: 3, pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 900, color: '#020617', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                        Add New <span style={{ color: '#16a34a' }}>Branch</span>
                    </Typography>
                    <IconButton onClick={handleCloseAddModal} sx={{ background: '#f1f5f9', '&:hover': { background: '#e2e8f0' } }}>
                        <CloseIcon sx={{ fontSize: 20, color: '#64748b' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleAddSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Branch Name"
                                    value={branchForm.name}
                                    onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                                    error={!!validation.name}
                                    helperText={validation.name}
                                    InputProps={{
                                        sx: { borderRadius: '16px', background: '#f8fafc' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    multiline
                                    rows={3}
                                    value={branchForm.address}
                                    onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                                    error={!!validation.address}
                                    helperText={validation.address}
                                    InputProps={{
                                        sx: { borderRadius: '16px', background: '#f8fafc' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    value={branchForm.phone}
                                    onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                                    error={!!validation.phone}
                                    helperText={validation.phone}
                                    InputProps={{
                                        sx: { borderRadius: '16px', background: '#f8fafc' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    value={branchForm.email}
                                    onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })}
                                    error={!!validation.email}
                                    helperText={validation.email}
                                    InputProps={{
                                        sx: { borderRadius: '16px', background: '#f8fafc' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={branchForm.isActive}
                                            onChange={(e) => setBranchForm({ ...branchForm, isActive: e.target.checked })}
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography sx={{ fontWeight: 800, fontSize: '13px', color: branchForm.isActive ? '#16a34a' : '#64748b' }}>
                                            {branchForm.isActive ? 'Branch is Active' : 'Branch is Inactive'}
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
                    <Button onClick={handleCloseAddModal} sx={{ color: '#64748b', fontWeight: 800 }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddSubmit}
                        variant="contained"
                        sx={{
                            borderRadius: '12px',
                            px: 4,
                            py: 1.5,
                            background: '#16a34a',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            '&:hover': { background: '#14532d' }
                        }}
                    >
                        Save Branch
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Modal */}
            <Dialog 
                open={openEditModal} 
                onClose={handleCloseEditModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        padding: '16px'
                    }
                }}
            >
                <DialogTitle sx={{ pb: 3, pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 900, color: '#020617', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                        Edit <span style={{ color: '#16a34a' }}>Branch</span>
                    </Typography>
                    <IconButton onClick={handleCloseEditModal} sx={{ background: '#f1f5f9', '&:hover': { background: '#e2e8f0' } }}>
                        <CloseIcon sx={{ fontSize: 20, color: '#64748b' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleEditSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Branch Name"
                                    value={branchForm.name}
                                    onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                                    error={!!validation.name}
                                    helperText={validation.name}
                                    InputProps={{
                                        sx: { borderRadius: '16px', background: '#f8fafc' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    multiline
                                    rows={3}
                                    value={branchForm.address}
                                    onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                                    error={!!validation.address}
                                    helperText={validation.address}
                                    InputProps={{
                                        sx: { borderRadius: '16px', background: '#f8fafc' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    value={branchForm.phone}
                                    onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                                    error={!!validation.phone}
                                    helperText={validation.phone}
                                    InputProps={{
                                        sx: { borderRadius: '16px', background: '#f8fafc' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    value={branchForm.email}
                                    onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })}
                                    error={!!validation.email}
                                    helperText={validation.email}
                                    InputProps={{
                                        sx: { borderRadius: '16px', background: '#f8fafc' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={branchForm.isActive}
                                            onChange={(e) => setBranchForm({ ...branchForm, isActive: e.target.checked })}
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography sx={{ fontWeight: 800, fontSize: '13px', color: branchForm.isActive ? '#16a34a' : '#64748b' }}>
                                            {branchForm.isActive ? 'Branch is Active' : 'Branch is Inactive'}
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
                    <Button onClick={handleCloseEditModal} sx={{ color: '#64748b', fontWeight: 800 }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleEditSubmit}
                        variant="contained"
                        sx={{
                            borderRadius: '12px',
                            px: 4,
                            py: 1.5,
                            background: '#16a34a',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            '&:hover': { background: '#14532d' }
                        }}
                    >
                        Update Branch
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BranchManager;
