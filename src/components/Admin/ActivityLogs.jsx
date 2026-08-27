import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    Typography,
    TablePagination,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MetaData from '../Layouts/MetaData';
import { getAllLogs, clearErrors } from '../../actions/logAction';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';

const ActivityLogs = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [selectedLog, setSelectedLog] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const { loading, logs, error } = useSelector((state) => state.auditLogs);

    useEffect(() => {
        if (error) {
            Swal.fire({ title: 'Error', text: error, icon: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getAllLogs());
    }, [dispatch, error]);

    const handleViewDetails = (log) => {
        setSelectedLog(log);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedLog(null);
    };

    const getActionColor = (action) => {
        switch (action) {
            case 'CREATE': return { color: '#059669', bg: '#ecfdf5', border: '#d1fae5' };
            case 'UPDATE': return { color: '#0284c7', bg: '#f0f9ff', border: '#e0f2fe' };
            case 'DELETE': return { color: '#ef4444', bg: '#fef2f2', border: '#fee2e2' };
            default: return { color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' };
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="Activity Logs | Shree Kishan Aayushi" />

            <Box sx={{ mb: 6 }}>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-1 bg-green-600 rounded-full"></div>
                    <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-[0.3em]">Administration</p>
                </div>
                <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                    Activity <span style={{ color: '#16a34a' }}>Logs</span>
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
                                        { label: 'Date & Time', width: '200px' },
                                        { label: 'User', width: '250px' },
                                        { label: 'Action', width: '120px' },
                                        { label: 'Entity', width: '150px' },
                                        { label: 'URL', width: 'auto' },
                                        { label: 'Details', width: '100px' }
                                    ].map((head, i) => (
                                        <TableCell
                                            key={i}
                                            align={i === 2 || i === 5 ? "center" : "left"}
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
                                                <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '10px', color: 'rgba(2, 6, 23, 0.3)' }}>Loading Logs...</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : logs?.length > 0 ? (
                                    logs
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((log) => {
                                            const actionStyle = getActionColor(log.action);
                                            return (
                                                <TableRow
                                                    key={log._id}
                                                    sx={{
                                                        transition: 'all 0.4s ease',
                                                        '&:hover': { background: '#f0fdf4' },
                                                        '& td': { borderBottom: '1px solid #f8fafc', py: 2.5 }
                                                    }}
                                                >
                                                    <TableCell align="left">
                                                        <Typography sx={{ fontSize: '12px', color: '#020617', fontWeight: 800 }}>
                                                            {new Date(log.createdAt).toLocaleDateString('en-GB')}
                                                        </Typography>
                                                        <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.4)', fontWeight: 700 }}>
                                                            {new Date(log.createdAt).toLocaleTimeString()}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography sx={{ fontSize: '13px', color: '#16a34a', fontWeight: 800 }}>
                                                            {log.user ? log.user.name : 'Unknown User'}
                                                        </Typography>
                                                        <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.5)', fontWeight: 600 }}>
                                                            {log.user ? log.user.email : log.ipAddress}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Box sx={{
                                                            fontSize: '9px',
                                                            fontWeight: 950,
                                                            color: actionStyle.color,
                                                            background: actionStyle.bg,
                                                            px: 2,
                                                            py: 1,
                                                            borderRadius: '8px',
                                                            display: 'inline-block',
                                                            border: `1px solid ${actionStyle.border}`,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.1em'
                                                        }}>
                                                            {log.action}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography sx={{ fontSize: '12px', color: '#020617', fontWeight: 900, textTransform: 'uppercase' }}>
                                                            {log.entity}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600, fontFamily: 'monospace' }}>
                                                            {log.url}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={() => handleViewDetails(log)}
                                                            sx={{
                                                                color: '#16a34a',
                                                                background: '#f0fdf4',
                                                                borderRadius: '10px',
                                                                '&:hover': { background: '#16a34a', color: '#fff' },
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <VisibilityIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 12 }}>
                                            <div className="flex flex-col items-center gap-4 opacity-30">
                                                <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '11px' }}>No Activity Recorded</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={logs?.length || 0}
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

            {/* Log Details Modal */}
            <Dialog 
                open={openModal} 
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: '24px', padding: '16px' }
                }}
            >
                <DialogTitle sx={{ pb: 3, pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 900, color: '#020617', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                        Payload <span style={{ color: '#16a34a' }}>Details</span>
                    </Typography>
                    <IconButton onClick={handleCloseModal} sx={{ background: '#f1f5f9', '&:hover': { background: '#e2e8f0' } }}>
                        <CloseIcon sx={{ fontSize: 20, color: '#64748b' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        {selectedLog?.details && Object.keys(selectedLog.details).length > 0 ? (
                            <Box component="pre" sx={{ 
                                background: '#0f172a', 
                                color: '#38bdf8', 
                                p: 3, 
                                borderRadius: '16px',
                                fontSize: '13px',
                                overflowX: 'auto',
                                fontFamily: 'monospace'
                            }}>
                                {JSON.stringify(selectedLog.details, null, 2)}
                            </Box>
                        ) : (
                            <Typography sx={{ color: '#64748b', fontStyle: 'italic', textAlign: 'center', py: 4 }}>
                                No payload details available for this action.
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ActivityLogs;
