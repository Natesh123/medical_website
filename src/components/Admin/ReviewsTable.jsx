import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
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
    Box
} from '@mui/material';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearErrors, deleteReview, getAllReviews } from '../../actions/productAction';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import MetaData from '../Layouts/MetaData';
import Swal from 'sweetalert2';

const ReviewsTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const { reviews, error } = useSelector((state) => state.reviews);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.review);

    useEffect(() => {
        dispatch(getAllReviews());
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Review Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const handleDelete = (reviewId, productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            customClass: {
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteReview(reviewId, productId));
            }
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="Customer Reviews | Shree Kishan Aayushi" />

            <Box sx={{ mb: 6 }}>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-1 bg-green-600 rounded-full"></div>
                    <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-[0.3em]">Administration</p>
                </div>
                <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                    Customer <span style={{ color: '#16a34a' }}>Reviews</span>
                </Typography>
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
                                        { label: 'Date', width: '120px' },
                                        { label: 'Product', width: '250px' },
                                        { label: 'User', width: '200px' },
                                        { label: 'Rating', width: '150px' },
                                        { label: 'Comment', width: 'auto' },
                                        { label: 'Actions', width: '100px' }
                                    ].map((head, i) => (
                                        <TableCell
                                            key={i}
                                            align={i === 3 || i === 5 ? "center" : "left"}
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
                                        <TableCell colSpan={6} align="center" sx={{ py: 12 }}>
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                                                <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '10px', color: 'rgba(2, 6, 23, 0.3)' }}>Loading Reviews...</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : reviews?.length > 0 ? (
                                    reviews
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((review) => (
                                            <TableRow
                                                key={review._id}
                                                sx={{
                                                    transition: 'all 0.4s ease',
                                                    '&:hover': { background: '#f0fdf4' },
                                                    '& td': { borderBottom: '1px solid #f8fafc', py: 2.5 }
                                                }}
                                            >
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '12px', color: '#020617', fontWeight: 800 }}>
                                                        {new Date(review.createdAt || Date.now()).toLocaleDateString('en-GB')}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '10px', color: 'rgba(2, 6, 23, 0.4)', fontWeight: 700 }}>
                                                        {new Date(review.createdAt || Date.now()).toLocaleTimeString()}
                                                    </Typography>
                                                </TableCell>
                                                
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '13px', color: '#16a34a', fontWeight: 800 }}>
                                                        {review.productName}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '10px', color: '#64748b', fontWeight: 600, fontFamily: 'monospace' }}>
                                                        {review.productId}
                                                    </Typography>
                                                </TableCell>
                                                
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '13px', color: '#020617', fontWeight: 800 }}>
                                                        {review.name}
                                                    </Typography>
                                                </TableCell>
                                                
                                                <TableCell align="center">
                                                    <Rating 
                                                        readOnly 
                                                        value={review.rating} 
                                                        size="small" 
                                                        precision={0.5} 
                                                        sx={{ 
                                                            color: '#fbbf24',
                                                            '& .MuiRating-iconFilled': { color: '#fbbf24' },
                                                            '& .MuiRating-iconEmpty': { color: '#e2e8f0' }
                                                        }} 
                                                    />
                                                </TableCell>
                                                
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '13px', color: '#64748b', fontStyle: 'italic', fontWeight: 500 }}>
                                                        "{review.comment}"
                                                    </Typography>
                                                </TableCell>
                                                
                                                <TableCell align="center">
                                                    <IconButton
                                                        onClick={() => handleDelete(review._id, review.productId)}
                                                        sx={{
                                                            color: '#ef4444',
                                                            background: '#fef2f2',
                                                            borderRadius: '10px',
                                                            '&:hover': { background: '#ef4444', color: '#fff' },
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <DeleteIcon sx={{ fontSize: 18 }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 12 }}>
                                            <div className="flex flex-col items-center gap-4 opacity-30">
                                                <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '11px', color: '#020617' }}>
                                                    No Customer Reviews Found
                                                </Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={reviews?.length || 0}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[15, 30, 50]}
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
        </Box>
    );
};

export default ReviewsTable;