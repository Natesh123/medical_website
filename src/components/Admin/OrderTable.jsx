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
    CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import MetaData from '../Layouts/MetaData';

import { getAllOrders, clearErrors, deleteOrder } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import UpdateOrder from './UpdateOrder';

const OrderTable = () => {
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const { error, orders, loading } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

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
            enqueueSnackbar("Order Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const handleEdit = (order) => {
        setSelectedOrderId(order._id);
        setOpenUpdateModal(true);
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
                dispatch(deleteOrder(id));
            }
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="Admin Panel | Shree Kishan Aayushi" />

            <Box sx={{ mb: 6 }}>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-1 bg-green-600 rounded-full"></div>
                    <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-[0.3em]">Orders</p>
                </div>
                <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                    All <span style={{ color: '#16a34a' }}>Orders</span>
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
                                        { label: 'Order ID', width: '140px' },
                                        { label: 'Items', width: 'auto' },
                                        { label: 'Qty', width: '80px' },
                                        { label: 'Amount', width: '140px' },
                                        { label: 'Docs', width: '80px' },
                                        { label: 'Status', width: '140px' },
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
                                        <TableCell colSpan={6} align="center" sx={{ py: 12 }}>
                                            <CircularProgress size={30} thickness={5} sx={{ color: '#16a34a' }} />
                                            <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '10px', mt: 3, color: '#16a34a' }}>Loading...</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : orders?.length > 0 ? (
                                    orders
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((order) => (
                                            <TableRow
                                                key={order._id}
                                                sx={{
                                                    transition: 'all 0.4s ease',
                                                    '&:hover': { background: '#f0fdf4' },
                                                    '& td': { borderBottom: '1px solid #f8fafc', py: 3 }
                                                }}
                                            >
                                                <TableCell align="center">
                                                    <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.2)', fontWeight: 900 }}>
                                                        {order._id.slice(-8).toUpperCase()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '13px', color: '#020617', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                                                        {order.orderItems.map(item => item.name).join(', ')}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.4)', fontWeight: 900 }}>
                                                        {order.orderItems.reduce((total, item) => total + item.quantity, 0)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography sx={{ fontSize: '14px', color: '#020617', fontWeight: 950 }}>
                                                        ₹{order.totalPrice.toLocaleString()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                                                        {order.orderItems.map((item, index) => (
                                                            item.prescriptionUrl ? (
                                                                <a
                                                                    key={index}
                                                                    href={`/admin/product/${item.prescriptionUrl}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[9px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg border border-blue-100 hover:bg-green-600 hover:text-white transition-all uppercase tracking-widest no-underline"
                                                                >
                                                                    View
                                                                </a>
                                                            ) : null
                                                        ))}
                                                        {!order.orderItems.some(item => item.prescriptionUrl) && (
                                                            <span className="text-[10px] text-slate-400 font-semibold">-</span>
                                                        )}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{
                                                        fontSize: '9px',
                                                        fontWeight: 950,
                                                        color: order.orderStatus === "Delivered" ? '#059669' :
                                                            order.orderStatus === "Shipped" ? '#d97706' : '#7c3aed',
                                                        background: order.orderStatus === "Delivered" ? '#ecfdf5' :
                                                            order.orderStatus === "Shipped" ? '#fffbeb' : '#f5f3ff',
                                                        px: 2,
                                                        py: 1,
                                                        borderRadius: '20px',
                                                        display: 'inline-block',
                                                        border: `1px solid ${order.orderStatus === "Delivered" ? '#d1fae5' :
                                                            order.orderStatus === "Shipped" ? '#fef3c7' : '#ede9fe'}`,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.1em'
                                                    }}>
                                                        {order.orderStatus}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
                                                        <IconButton
                                                                onClick={() => handleEdit(order)}
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
                                                                onClick={() => handleDelete(order._id)}
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
                                        <TableCell colSpan={6} align="center" sx={{ py: 12 }}>
                                            <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '11px', opacity: 0.2 }}>No Orders Found</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={orders?.length || 0}
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

            <UpdateOrder 
                open={openUpdateModal} 
                handleClose={() => setOpenUpdateModal(false)} 
                orderId={selectedOrderId} 
            />
        </Box>
    );
};

export default OrderTable;
