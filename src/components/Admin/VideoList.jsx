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
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Select,
    MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import MetaData from '../Layouts/MetaData';
import { getVideos, deleteVideo, clearErrors, addVideo } from '../../actions/videoAction';
import { useSnackbar } from 'notistack';
import { DELETE_VIDEO_RESET, NEW_VIDEO_RESET } from '../../constants/videoConstants';

const VideoList = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { videos, error: listError, loading } = useSelector((state) => state.videoList);
    const { error: deleteError, isDeleted } = useSelector((state) => state.deleteVideo);
    const { loading: addLoading, error: addError, success: addSuccess } = useSelector((state) => state.newVideo);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("youtube");
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (listError) {
            enqueueSnackbar(listError, { variant: "error" });
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
            enqueueSnackbar("Video Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_VIDEO_RESET });
        }
        if (addSuccess) {
            enqueueSnackbar("Video Added Successfully", { variant: "success" });
            dispatch({ type: NEW_VIDEO_RESET });
            handleCloseAddModal();
        }
        dispatch(getVideos());
    }, [dispatch, listError, deleteError, isDeleted, addError, addSuccess, enqueueSnackbar]);

    const handleOpenAddModal = () => {
        setTitle("");
        setType("youtube");
        setUrl("");
        setFile(null);
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => setOpenAddModal(false);

    const submitHandler = (e) => {
        e.preventDefault();
        if (type === 'video') {
            const formData = new FormData();
            formData.set("title", title);
            formData.set("type", type);
            if (file) {
                formData.set("videoFile", file);
            }
            dispatch(addVideo(formData));
        } else {
            dispatch(addVideo({ title, type, url }));
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
                dispatch(deleteVideo(id));
            }
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="Admin Panel | Manage Videos" />

            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-1 bg-green-600 rounded-full"></div>
                        <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-[0.3em]">Videos</p>
                    </div>
                    <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                        Manage <span style={{ color: '#16a34a' }}>Videos</span>
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
                    Add Video
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
                                        { label: 'Video ID', width: '200px' },
                                        { label: 'Title', width: 'auto' },
                                        { label: 'Type', width: '150px' },
                                        { label: 'Actions', width: '120px' }
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
                                ) : videos?.length > 0 ? (
                                    videos
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((video) => (
                                            <TableRow
                                                key={video._id}
                                                sx={{
                                                    transition: 'all 0.4s ease',
                                                    '&:hover': { background: '#f0fdf4' },
                                                    '& td': { borderBottom: '1px solid #f8fafc', py: 3 }
                                                }}
                                            >
                                                <TableCell align="center">
                                                    <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.2)', fontWeight: 900 }}>
                                                        {video._id.slice(-8).toUpperCase()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '13px', color: '#020617', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                                                        {video.title}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.4)', fontWeight: 900, textTransform: 'uppercase' }}>
                                                        {video.type}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
                                                            <IconButton
                                                                onClick={() => handleDelete(video._id)}
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
                                            <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '11px', opacity: 0.2 }}>No Videos Found</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={videos?.length || 0}
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
                                <p className="text-[9px] font-semibold text-green-900/40 uppercase tracking-[0.2em]">Media Form</p>
                            </div>
                            <Typography variant="h5" sx={{ fontWeight: 950, color: '#020617', textTransform: 'uppercase' }}>
                                Add <span style={{ color: '#16a34a' }}>Media</span>
                            </Typography>
                        </Box>
                        <IconButton onClick={handleCloseAddModal}><CloseIcon /></IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ px: 6, py: 4 }}>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Video Title</label>
                            <TextField fullWidth placeholder="Enter display title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Media Type</label>
                            <Select fullWidth value={type} onChange={(e) => setType(e.target.value)} sx={{ borderRadius: '15px', bgcolor: '#f8fafc', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.23)' } }}>
                                <MenuItem value="youtube">Social Media Link (YouTube, Facebook, Insta)</MenuItem>
                                <MenuItem value="video">Upload Local Video (.mp4)</MenuItem>
                            </Select>
                        </div>

                        {type === 'youtube' ? (
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Source URL</label>
                                <TextField fullWidth placeholder="https://www.youtube.com/watch?v=..." variant="outlined" value={url} onChange={(e) => setUrl(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }} />
                                <div className="text-[10px] text-green-900/40 font-semibold tracking-wider uppercase bg-green-50 px-4 py-3 rounded-xl border border-green-100 mt-2">
                                    ℹ️ Paste any public YouTube, Facebook, or Instagram video URL
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Upload MP4 Video</label>
                                <input
                                    type="file"
                                    accept="video/mp4"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="w-full px-5 py-4 bg-[#f8fafc] border border-gray-200 rounded-[15px] focus:outline-none text-gray-700 font-medium transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:uppercase file:tracking-wider file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                                />
                                <div className="text-[10px] text-green-900/40 font-semibold tracking-wider uppercase bg-green-50 px-4 py-3 rounded-xl border border-green-100 mt-2">
                                    ℹ️ Max file size: 50MB. Only .mp4 files are supported.
                                </div>
                            </div>
                        )}

                        <Box sx={{ mt: 5, display: 'flex', gap: 2 }}>
                            <Button fullWidth onClick={handleCloseAddModal} sx={{ borderRadius: '15px', color: '#94a3b8', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cancel</Button>
                            <Button fullWidth variant="contained" disabled={addLoading} onClick={submitHandler} sx={{ borderRadius: '15px', bgcolor: '#16a34a', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 10px 20px rgba(22,163,74,0.2)' }}>
                                {addLoading ? 'Processing...' : 'Save Media'}
                            </Button>
                        </Box>
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default VideoList;
