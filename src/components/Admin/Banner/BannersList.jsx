import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    CircularProgress,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Switch,
    FormControlLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Swal from 'sweetalert2';
import MetaData from '../../Layouts/MetaData';
import { Link } from 'react-router-dom';
import { getAdminBanners, deleteBanner, clearErrors, createBanner } from '../../../actions/bannerAction';
import { useSnackbar } from 'notistack';
import { DELETE_BANNER_RESET, NEW_BANNER_RESET } from '../../../constants/bannerConstants';

const BannersList = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { banners, error, loading } = useSelector((state) => state.banners);
    const { error: deleteError, isDeleted } = useSelector((state) => state.banner);
    const { loading: addLoading, error: addError, success: addSuccess } = useSelector((state) => state.newBanner);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (addError) {
            enqueueSnackbar(addError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Banner Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_BANNER_RESET });
        }
        if (addSuccess) {
            enqueueSnackbar("Banner Created Successfully", { variant: "success" });
            dispatch({ type: NEW_BANNER_RESET });
            handleCloseAddModal();
        }
        dispatch(getAdminBanners());
    }, [dispatch, error, deleteError, isDeleted, addError, addSuccess, enqueueSnackbar]);

    const handleOpenAddModal = () => {
        setTitle('');
        setSubtitle('');
        setIsActive(true);
        setImage('');
        setImagePreview('');
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => setOpenAddModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            enqueueSnackbar("Please select an image", { variant: "error" });
            return;
        }
        const formData = new FormData();
        formData.set('title', title);
        formData.set('subtitle', subtitle);
        formData.set('isActive', isActive);
        formData.set('image', image);
        dispatch(createBanner(formData));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
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
                dispatch(deleteBanner(id));
            }
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="Admin Panel | Manage Banners" />

            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-1 bg-green-600 rounded-full"></div>
                        <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-[0.3em]">Banners</p>
                    </div>
                    <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                        Manage <span style={{ color: '#16a34a' }}>Banners</span>
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
                    Add Banner
                </Button>
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
                                        { label: 'Image', width: '150px' },
                                        { label: 'Title', width: 'auto' },
                                        { label: 'Status', width: '120px' },
                                        { label: 'Actions', width: '150px' }
                                    ].map((head, i) => (
                                        <TableCell
                                            key={i}
                                            align={i === 0 || i > 1 ? "center" : "left"}
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
                                        <TableCell colSpan={4} align="center" sx={{ py: 12 }}>
                                            <CircularProgress size={30} thickness={5} sx={{ color: '#16a34a' }} />
                                            <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '10px', mt: 3, color: '#16a34a' }}>Loading...</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : banners?.length > 0 ? (
                                    banners
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((banner) => (
                                            <TableRow
                                                key={banner._id}
                                                sx={{
                                                    transition: 'all 0.4s ease',
                                                    '&:hover': { background: '#f0fdf4' },
                                                    '& td': { borderBottom: '1px solid #f8fafc', py: 3 }
                                                }}
                                            >
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                        <img 
                                                            src={`/${banner.image.url}`} 
                                                            alt={banner.title} 
                                                            style={{ width: '120px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
                                                        />
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '13px', color: '#020617', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', mb: 0.5 }}>
                                                        {banner.title}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>
                                                        {banner.subtitle.substring(0, 60)}...
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip 
                                                        label={banner.isActive ? 'Active' : 'Inactive'} 
                                                        size="small"
                                                        sx={{ 
                                                            fontSize: '9px', 
                                                            fontWeight: 900, 
                                                            textTransform: 'uppercase', 
                                                            letterSpacing: '0.1em',
                                                            bgcolor: banner.isActive ? '#dcfce7' : '#fee2e2',
                                                            color: banner.isActive ? '#16a34a' : '#ef4444'
                                                        }} 
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
                                                            <Link to={`/admin/banner/${banner._id}`}>
                                                                <IconButton
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
                                                            </Link>
                                                            <IconButton
                                                                onClick={() => handleDelete(banner._id)}
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
                                        <TableCell colSpan={4} align="center" sx={{ py: 12 }}>
                                            <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '11px', opacity: 0.2 }}>No Banners Found</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={banners?.length || 0}
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

            <Dialog open={openAddModal} onClose={handleCloseAddModal} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '40px', boxShadow: '0 50px 100px rgba(22, 163, 74, 0.15)', border: '1px solid #f1f5f9' } }}>
                <DialogTitle sx={{ p: 6, pb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-1 bg-green-600 rounded-full"></div>
                                <p className="text-[9px] font-semibold text-green-900/40 uppercase tracking-[0.2em]">Banner Form</p>
                            </div>
                            <Typography variant="h5" sx={{ fontWeight: 950, color: '#020617', textTransform: 'uppercase' }}>
                                Add <span style={{ color: '#16a34a' }}>Banner</span>
                            </Typography>
                        </Box>
                        <IconButton onClick={handleCloseAddModal}><CloseIcon /></IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ px: 6, py: 4 }}>
                    <div className="space-y-6">
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            {imagePreview ? (
                                <Box sx={{ width: '100%', height: '200px', borderRadius: '25px', overflow: 'hidden', border: '2px dashed #16a34a', position: 'relative' }}>
                                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <Button 
                                        component="label" 
                                        variant="contained"
                                        sx={{ position: 'absolute', bottom: 16, right: 16, bgcolor: 'rgba(0,0,0,0.7)', borderRadius: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }}
                                    >
                                        Change Image
                                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{ width: '100%', height: '200px', borderRadius: '25px', border: '2px dashed rgba(22, 163, 74, 0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0fdf4', gap: 2, transition: 'all 0.3s ease', '&:hover': { borderColor: '#16a34a', bgcolor: '#dcfce7' } }}>
                                    <PhotoCamera sx={{ fontSize: 60, color: 'rgba(22, 163, 74, 0.4)' }} />
                                    <Typography sx={{ color: '#16a34a', fontWeight: 800, fontSize: '13px' }}>Upload Banner Image (1600x900)</Typography>
                                    <Button component="label" variant="contained" sx={{ bgcolor: '#16a34a', borderRadius: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px', px: 4, py: 1.5, boxShadow: '0 10px 20px rgba(22,163,74,0.2)', '&:hover': { bgcolor: '#15803d', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease' }}>
                                        Browse Files
                                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                    </Button>
                                </Box>
                            )}
                        </Box>

                        <div className="space-y-2">
                            <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Banner Title *</label>
                            <TextField
                                fullWidth
                                placeholder="Enter banner title"
                                variant="outlined"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Banner Subtitle *</label>
                            <TextField
                                fullWidth
                                placeholder="Enter banner subtitle"
                                variant="outlined"
                                multiline
                                rows={2}
                                required
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }}
                            />
                        </div>

                        <Box sx={{ bgcolor: '#f8fafc', p: 3, borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #f1f5f9' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 900, color: '#020617', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Active Status</Typography>
                                <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600, mt: 0.5 }}>Display on homepage</Typography>
                            </Box>
                            <Switch
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                color="success"
                                sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#16a34a' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#16a34a' } }}
                            />
                        </Box>

                        <Box sx={{ mt: 5, display: 'flex', gap: 2 }}>
                            <Button fullWidth onClick={handleCloseAddModal} sx={{ borderRadius: '15px', color: '#94a3b8', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cancel</Button>
                            <Button fullWidth variant="contained" disabled={addLoading} onClick={handleSubmit} sx={{ borderRadius: '15px', bgcolor: '#16a34a', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 10px 20px rgba(22,163,74,0.2)' }}>
                                {addLoading ? 'Processing...' : 'Save Banner'}
                            </Button>
                        </Box>
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default BannersList;
