import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MetaData from '../Layouts/MetaData';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Card,
    CardContent,
    Typography,
    TablePagination,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField, 
    Select, 
    MenuItem, 
    FormControl
} from '@mui/material';

import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const UserTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Filter States
    const [filterRole, setFilterRole] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [filterMobile, setFilterMobile] = useState('');
    const [filterDate, setFilterDate] = useState('');

    const { users, error } = useSelector((state) => state.users);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.profile);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }

        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }

        if (isDeleted) {
            enqueueSnackbar("User deleted successfully!", { variant: "success" });
            dispatch({ type: DELETE_USER_RESET });
            dispatch(getAllUsers());
        }

        dispatch(getAllUsers());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

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
                dispatch(deleteUser(id));
            }
        });
    };

    const handleOpenDocs = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleCloseDocs = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const applyFilters = (data) => {
        if (!data || data.length === 0) return [];
        
        let filtered = [...data];

        if (filterRole !== 'All') {
            filtered = filtered.filter(r => String(r.role).toLowerCase() === filterRole.toLowerCase());
        }

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(row => {
                return (
                    String(row.name).toLowerCase().includes(term) ||
                    String(row.email).toLowerCase().includes(term) ||
                    String(row._id).toLowerCase().includes(term) ||
                    String(row.phone || '').toLowerCase().includes(term)
                );
            });
        }

        if (filterEmail.trim() !== '') {
            filtered = filtered.filter(r => String(r.email).toLowerCase().includes(filterEmail.toLowerCase()));
        }
        if (filterMobile.trim() !== '') {
            filtered = filtered.filter(r => String(r.phone || '').toLowerCase().includes(filterMobile.toLowerCase()));
        }
        if (filterDate !== '') {
            const targetDate = new Date(filterDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
            filtered = filtered.filter(r => {
                const rowDate = new Date(r.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
                return rowDate === targetDate;
            });
        }

        return filtered;
    };
    
    const filteredUsers = applyFilters(users);

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="Personnel Management | Shree Kishan Aayushi" />

            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-1 bg-green-600 rounded-full"></div>
                        <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-[0.3em]">Management</p>
                    </div>
                    <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                        All <span style={{ color: '#16a34a' }}>Users</span>
                    </Typography>
                </Box>
            </Box>

            <div className="flex flex-wrap gap-3 p-4 bg-white border border-slate-100 rounded-3xl mb-6 shadow-sm items-center">
                <FormControl size="small" sx={{ flex: 1, minWidth: '130px', bgcolor: 'white', '& fieldset': { borderRadius: '8px' } }}>
                    <Select
                        value={filterRole}
                        onChange={(e) => { setFilterRole(e.target.value); setPage(0); }}
                        displayEmpty
                        sx={{ color: '#475569', fontWeight: 600, fontSize: '13px' }}
                    >
                        <MenuItem value="All">All Roles</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="doctor">Doctor</MenuItem>
                        <MenuItem value="dealer">Dealer</MenuItem>
                    </Select>
                </FormControl>
                
                <TextField
                    placeholder="Search All..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                    sx={{ flex: 1, minWidth: '130px', bgcolor: 'white', '& fieldset': { borderRadius: '8px' } }}
                />

                <TextField
                    placeholder="Email"
                    variant="outlined"
                    size="small"
                    value={filterEmail}
                    onChange={(e) => { setFilterEmail(e.target.value); setPage(0); }}
                    sx={{ flex: 1.5, minWidth: '160px', bgcolor: 'white', '& fieldset': { borderRadius: '8px' } }}
                />
                
                <TextField
                    placeholder="Mobile"
                    variant="outlined"
                    size="small"
                    value={filterMobile}
                    onChange={(e) => { setFilterMobile(e.target.value); setPage(0); }}
                    sx={{ flex: 1, minWidth: '130px', bgcolor: 'white', '& fieldset': { borderRadius: '8px' } }}
                />
                
                <TextField
                    type="date"
                    variant="outlined"
                    size="small"
                    value={filterDate}
                    onChange={(e) => { setFilterDate(e.target.value); setPage(0); }}
                    sx={{ flex: 1, minWidth: '140px', bgcolor: 'white', '& fieldset': { borderRadius: '8px' } }}
                />
                
                <Button 
                    variant="contained" 
                    color="error" 
                    size="small"
                    disableElevation
                    onClick={() => {
                        setSearchTerm('');
                        setFilterRole('All');
                        setFilterEmail('');
                        setFilterMobile('');
                        setFilterDate('');
                        setPage(0);
                    }}
                    sx={{ fontWeight: 700, borderRadius: '8px', textTransform: 'none', height: '40px', px: 3 }}
                >
                    Clear
                </Button>
            </div>

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
                                        { label: 'User Details', width: 'auto' },
                                        { label: 'Email', width: 'auto' },
                                        { label: 'Mobile', width: '130px' },
                                        { label: 'Gender', width: '120px' },
                                        { label: 'Role', width: '140px' },
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
                                        <TableCell colSpan={7} align="center" sx={{ py: 12 }}>
                                            <CircularProgress size={24} sx={{ color: '#16a34a' }} />
                                            <Typography sx={{ mt: 2, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '10px', color: 'rgba(2, 6, 23, 0.3)' }}>Loading...</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredUsers?.length > 0 ? (
                                    filteredUsers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((user, index) => (
                                            <TableRow
                                                key={user._id}
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
                                                        <Typography sx={{ fontSize: '13px', color: '#020617', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                                                            {user.name}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.4)', fontWeight: 700 }}>
                                                        {user.email}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography sx={{ fontSize: '11px', color: '#020617', fontWeight: 800 }}>
                                                        {user.phone || 'N/A'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography sx={{ fontSize: '10px', color: '#020617', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                        {user.gender}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{
                                                        fontSize: '9px',
                                                        fontWeight: 950,
                                                        color: user.role === "admin" ? '#4f46e5' : user.role === "doctor" ? '#059669' : '#16a34a',
                                                        background: user.role === "admin" ? '#eef2ff' : user.role === "doctor" ? '#ecfdf5' : '#f0fdf4',
                                                        px: 2.5,
                                                        py: 1,
                                                        borderRadius: '20px',
                                                        display: 'inline-block',
                                                        border: `1px solid ${user.role === "admin" ? '#e0e7ff' : user.role === "doctor" ? '#d1fae5' : '#dbeafe'}`,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.1em'
                                                    }}>
                                                        {user.role}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box display="flex" justifyContent="center" gap={1}>
                                                        {user.role === 'doctor' && (
                                                            <IconButton
                                                                onClick={() => handleOpenDocs(user)}
                                                                sx={{
                                                                    color: '#16a34a',
                                                                    background: '#f0fdf4',
                                                                    borderRadius: '12px',
                                                                    '&:hover': { background: '#16a34a', color: '#fff' },
                                                                    transition: 'all 0.3s ease'
                                                                }}
                                                            >
                                                                <VisibilityIcon sx={{ fontSize: 18 }} />
                                                            </IconButton>
                                                        )}
                                                            <IconButton
                                                                onClick={() => handleDelete(user._id)}
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
                                        <TableCell colSpan={7} align="center" sx={{ py: 12 }}>
                                            <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '11px', opacity: 0.2 }}>No Users Found</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredUsers?.length || 0}
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

            {/* Documents Dialog */}
            <Dialog
                open={open}
                onClose={handleCloseDocs}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogTitle sx={{
                    fontWeight: 900,
                    color: '#020617',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    borderBottom: '1px solid #f1f5f9',
                    p: 4
                }}>
                    Doctor Verification: <span style={{ color: '#16a34a' }}>{selectedUser?.name}</span>
                </DialogTitle>
                <DialogContent sx={{ p: 4 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                        {/* Medical Certificate */}
                        <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-100">
                            <p className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest mb-4">Medical Certificate</p>
                            {selectedUser?.registrationCertificate?.url ? (
                                <div className="rounded-xl overflow-hidden border border-slate-200">
                                    <img
                                        src={selectedUser.registrationCertificate.url}
                                        alt="Registration Certificate"
                                        className="w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer"
                                        onClick={() => window.open(selectedUser.registrationCertificate.url, '_blank')}
                                    />
                                    <div className="p-3 bg-white text-center">
                                        <button
                                            onClick={() => window.open(selectedUser.registrationCertificate.url, '_blank')}
                                            className="text-[10px] font-semibold text-green-600 uppercase tracking-wider hover:underline"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-48 flex items-center justify-center bg-slate-100 rounded-xl border border-dashed border-slate-300">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">No Document</span>
                                </div>
                            )}
                        </div>

                        {/* ID Proof */}
                        <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-100">
                            <p className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest mb-4">ID Proof</p>
                            {selectedUser?.doctorIdProof?.url ? (
                                <div className="rounded-xl overflow-hidden border border-slate-200">
                                    <img
                                        src={selectedUser.doctorIdProof.url}
                                        alt="Doctors ID Proof"
                                        className="w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer"
                                        onClick={() => window.open(selectedUser.doctorIdProof.url, '_blank')}
                                    />
                                    <div className="p-3 bg-white text-center">
                                        <button
                                            onClick={() => window.open(selectedUser.doctorIdProof.url, '_blank')}
                                            className="text-[10px] font-semibold text-green-600 uppercase tracking-wider hover:underline"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-48 flex items-center justify-center bg-slate-100 rounded-xl border border-dashed border-slate-300">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">No Document</span>
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: '1px solid #f1f5f9' }}>
                    <Button
                        onClick={handleCloseDocs}
                        sx={{
                            fontWeight: 900,
                            color: '#64748b',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontSize: '11px',
                            px: 3
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserTable;
