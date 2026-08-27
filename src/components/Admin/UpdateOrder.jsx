import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
    TextField,
    MenuItem,
    Button,
    Box,
    Grid,
    Typography,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getOrderDetails, clearErrors, updateOrder } from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';

const UpdateOrder = ({ open, handleClose, orderId }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const [status, setStatus] = useState("");

    const orderStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];

    useEffect(() => {
        if (open && orderId) {
            if (!order || order._id !== orderId) {
                dispatch(getOrderDetails(orderId));
            } else {
                setStatus(order.orderStatus);
            }
        }
    }, [dispatch, orderId, open, order]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Order Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_ORDER_RESET });
            handleClose();
        }
    }, [dispatch, error, isUpdated, updateError, enqueueSnackbar, handleClose]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = {
            status: status
        };

        dispatch(updateOrder(orderId, myForm));
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="md" 
            fullWidth 
            PaperProps={{ 
                sx: { 
                    borderRadius: '40px', 
                    boxShadow: '0 50px 100px rgba(22, 163, 74, 0.15)', 
                    border: '1px solid #f1f5f9' 
                } 
            }}
        >
            <DialogTitle sx={{ p: 6, pb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-1 bg-green-600 rounded-full"></div>
                            <p className="text-[9px] font-semibold text-green-900/40 uppercase tracking-[0.2em]">Order Status</p>
                        </div>
                        <Typography variant="h5" sx={{ fontWeight: 950, color: '#020617', textTransform: 'uppercase' }}>
                            Update <span style={{ color: '#16a34a' }}>Order</span>
                        </Typography>
                    </Box>
                    <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ px: 6, py: 4 }}>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <CircularProgress sx={{ color: '#16a34a' }} />
                    </div>
                ) : (
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {/* Order Details (Read-Only) */}
                        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                            <Typography variant="h6" sx={{ color: '#0f172a', mb: 2, fontWeight: 700 }}>Order Summary</Typography>
                            <Typography variant="body2" sx={{ color: '#475569', mb: 1 }}>
                                <strong>Items:</strong> {order && order.orderItems && order.orderItems.map(i => i.name).join(', ')}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#475569', mb: 1 }}>
                                <strong>Amount:</strong> ₹{order && order.totalPrice}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#475569' }}>
                                <strong>User:</strong> {order && order.user && order.user.name}
                            </Typography>
                        </Box>

                        {/* Prescription Verification Link */}
                        {order && order.orderItems && order.orderItems.some(item => item.prescriptionUrl) && (
                            <Box sx={{ p: 2, bgcolor: 'rgba(22, 163, 74, 0.1)', borderRadius: 2, border: '1px solid rgba(22, 163, 74, 0.2)' }}>
                                <Typography variant="body2" sx={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <span>Prescription Document Available:</span>
                                    {order.orderItems.map((item, index) => (
                                        item.prescriptionUrl && (
                                            <a
                                                key={index}
                                                href={`/admin/product/${item.prescriptionUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                                            >
                                                View Document {index + 1}
                                            </a>
                                        )
                                    ))}
                                </Typography>
                            </Box>
                        )}


                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#64748b', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Select Status</Typography>
                                <TextField
                                    fullWidth
                                    select
                                    variant="outlined"
                                    size="small"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a',
                                            '& fieldset': { borderColor: '#e2e8f0' },
                                            '&:hover fieldset': { borderColor: '#cbd5e1' },
                                            '&.Mui-focused fieldset': { borderColor: '#16a34a' }
                                        },
                                        '& .MuiSvgIcon-root': { color: '#64748b' }
                                    }}
                                >
                                    {order.orderStatus === "Delivered" ? (
                                        <MenuItem value="Delivered">Delivered</MenuItem>
                                    ) : orderStatuses
                                        .filter(s => order.orderStatus === "Shipped" ? (s !== "Processing" && s !== "Cancelled") : true)
                                        .map((s) => (
                                        <MenuItem key={s} value={s}>
                                            {s}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                            <Button
                                onClick={handleClose}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    borderRadius: '16px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    py: 1.8,
                                    color: '#64748b',
                                    borderColor: '#e2e8f0',
                                    '&:hover': {
                                        borderColor: '#cbd5e1',
                                        background: '#f8fafc'
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading || status === ""}
                                sx={{
                                    borderRadius: '16px',
                                    textTransform: 'none',
                                    fontWeight: 800,
                                    fontSize: '15px',
                                    py: 1.8,
                                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                                    boxShadow: '0 8px 25px -5px rgba(22, 163, 74, 0.5)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #15803d 0%, #1d4ed8 100%)',
                                        boxShadow: '0 12px 30px -5px rgba(22, 163, 74, 0.6)',
                                    }
                                }}
                            >
                                Update Status
                            </Button>
                        </Box>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UpdateOrder;
