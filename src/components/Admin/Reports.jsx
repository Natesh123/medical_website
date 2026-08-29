import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers, deleteUser } from '../../actions/userAction';
import { 
    Box, Typography, Card, CardContent, Button, CircularProgress, 
    Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    Chip, Avatar, IconButton, Dialog, DialogTitle, DialogContent, Divider,
    TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIconMaterial from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MetaData from '../Layouts/MetaData';
import Swal from 'sweetalert2';

const formatCurrency = (amount) => `₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const Reports = () => {
    const dispatch = useDispatch();

    const { products, loading: productsLoading } = useSelector((state) => state.products);
    const { orders, loading: ordersLoading } = useSelector((state) => state.allOrders);
    const { users, loading: usersLoading } = useSelector((state) => state.users);

    const [currentTab, setCurrentTab] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isExporting, setIsExporting] = useState(false);
    
    // Filter & Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    
    // Advanced Filter State for Users
    const [advFilterUserId, setAdvFilterUserId] = useState('');
    const [advFilterEmail, setAdvFilterEmail] = useState('');
    const [advFilterMobile, setAdvFilterMobile] = useState('');
    const [advFilterDate, setAdvFilterDate] = useState('');

    // State for Modals
    const [selectedUser, setSelectedUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
        setPage(0);
        setSearchTerm('');
        setFilterStatus('All');
        setAdvFilterUserId('');
        setAdvFilterEmail('');
        setAdvFilterMobile('');
        setAdvFilterDate('');
    };

    const downloadCSV = (data, filename) => {
        if (!data || !data.length) {
            Swal.fire('No Data', 'There is no data available to export.', 'info');
            return;
        }

        setIsExporting(true);
        try {
            const headers = Object.keys(data[0]);
            const csvRows = [];
            csvRows.push(headers.join(','));
            
            for (const row of data) {
                const values = headers.map(header => {
                    const escaped = ('' + (row[header] !== null && row[header] !== undefined ? row[header] : '')).replace(/"/g, '""');
                    return `"${escaped}"`;
                });
                csvRows.push(values.join(','));
            }
            
            const csvString = csvRows.join('\n');
            const blob = new Blob([csvString], { type: 'text/csv' });
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', `${filename}.csv`);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            Swal.fire({
                title: "Export Successful!",
                text: `${filename}.csv has been downloaded.`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                background: '#ffffff',
                color: '#059669'
            });
        } catch (error) {
            Swal.fire('Error', 'Failed to generate CSV file.', 'error');
        } finally {
            setIsExporting(false);
        }
    };

    const getProductsData = () => {
        return (products || []).map((p, index) => ({
            "S.No": index + 1,
            "Product ID": p._id,
            "Name": p.name,
            "Category": p.category?.name || p.category,
            "Price (Base)": p.price,
            "GST (%)": p.gst || 0,
            "Total Price": (parseFloat(p.price || 0) + ((parseFloat(p.price || 0) * parseFloat(p.gst || 0)) / 100)).toFixed(2),
            "Stock": p.stock,
            "Status": p.status
        }));
    };

    // Image Helper
    const BASE_URL = "/";
    const getImageUrl = (image) => {
        if (!image) return "/default.png";
        const imageUrl = image?.url || image;
        if (typeof imageUrl === 'string' && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
            return imageUrl;
        }
        return `${BASE_URL}admin/product/${imageUrl}`;
    };

    const handleDeleteUser = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(userId));
                Swal.fire({
                    title: 'Deleted!',
                    text: 'User has been deleted.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(() => {
                    dispatch(getAllUsers());
                }, 500);
            }
        });
    };

    const getOrdersData = () => {
        return (orders || []).map((o, index) => {
            let userName = 'N/A';
            if (o.user && o.user.name) {
                userName = o.user.name;
            } else if (users && users.length > 0) {
                const foundUser = users.find(u => u._id === (o.user?._id || o.user));
                if (foundUser) userName = foundUser.name;
            }

            return {
                "S.No": index + 1,
                "Order ID": o._id,
                "Date": new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                "User Name": userName,
                "Amount": o.totalPrice,
                "Payment": o.paymentInfo?.status || 'Pending',
                "Status": o.orderStatus
            };
        });
    };

    const getUsersData = () => {
        return (users || []).map((u, index) => ({
            "S.No": index + 1,
            "User ID": u._id,
            "Name": u.name,
            "Email": u.email,
            "Mobile": u.phone || 'N/A',
            "Role": u.role,
            "Joined At": new Date(u.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        }));
    };

    const exportCurrentTab = () => {
        if (currentTab === 0) downloadCSV(getProductsData(), 'Inventory_Report');
        else if (currentTab === 1) downloadCSV(getOrdersData(), 'Sales_Report');
        else if (currentTab === 2) downloadCSV(getUsersData(), 'Users_Report');
    };

    // Modal Handlers
    const openUserDetails = (userId) => {
        const foundUser = users.find(u => u._id === userId);
        if (foundUser) {
            setSelectedUser(foundUser);
            const userHistory = (orders || []).filter(o => {
                const orderUserId = o.user?._id || o.user;
                return String(orderUserId) === String(userId);
            });
            setUserOrders(userHistory);
        }
    };

    const closeUserDetails = () => {
        setSelectedUser(null);
        setUserOrders([]);
    };

    const openOrderDetails = (orderId) => {
        const foundOrder = orders.find(o => o._id === orderId);
        if (foundOrder) setSelectedOrder(foundOrder);
    };

    const closeOrderDetails = () => setSelectedOrder(null);

    const isLoading = productsLoading || ordersLoading || usersLoading;

    // Helper to render stylish status chips
    const renderStatusChip = (value) => {
        let color = "default";
        let bgColor = "#f1f5f9";
        let textColor = "#64748b";

        const valLower = String(value).toLowerCase();
        
        if (valLower === 'delivered' || valLower === 'succeeded' || valLower === 'active' || valLower.includes('instock') || valLower === 'admin') {
            bgColor = "#ecfdf5"; textColor = "#059669"; color = "success";
        } else if (valLower === 'shipped' || valLower === 'processing' || valLower === 'user') {
            bgColor = "#fffbeb"; textColor = "#d97706"; color = "warning";
        } else if (valLower === 'pending' || valLower.includes('outofstock')) {
            bgColor = "#fef2f2"; textColor = "#ef4444"; color = "error";
        } else {
            bgColor = "#f0fdf4"; textColor = "#16a34a"; color = "info"; // Fallback to green
        }

        return (
            <Chip 
                label={value} 
                size="small" 
                sx={{ 
                    bgcolor: bgColor, 
                    color: textColor, 
                    fontWeight: 800, 
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderRadius: '8px',
                    px: 1,
                    boxShadow: `0 2px 10px ${bgColor}80`
                }} 
            />
        );
    };

    const applyFilters = (data) => {
        if (!data || data.length === 0) return [];
        
        let filtered = [...data];

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(row => {
                return Object.values(row).some(val => 
                    String(val).toLowerCase().includes(term)
                );
            });
        }

        if (filterStatus !== 'All') {
            if (currentTab === 0) {
                if (filterStatus === 'InStock') filtered = filtered.filter(r => r.Stock > 0);
                if (filterStatus === 'OutOfStock') filtered = filtered.filter(r => r.Stock <= 0);
            } else if (currentTab === 1) {
                filtered = filtered.filter(r => String(r.Status).toLowerCase() === filterStatus.toLowerCase());
            } else if (currentTab === 2) {
                filtered = filtered.filter(r => String(r.Role).toLowerCase() === filterStatus.toLowerCase());
            }
        }
        
        if (currentTab === 2) {
            if (advFilterUserId.trim() !== '') {
                filtered = filtered.filter(r => String(r['User ID']).toLowerCase().includes(advFilterUserId.toLowerCase()));
            }
            if (advFilterEmail.trim() !== '') {
                filtered = filtered.filter(r => String(r['Email']).toLowerCase().includes(advFilterEmail.toLowerCase()));
            }
            if (advFilterMobile.trim() !== '') {
                filtered = filtered.filter(r => String(r['Mobile']).toLowerCase().includes(advFilterMobile.toLowerCase()));
            }
            if (advFilterDate !== '') {
                const targetDate = new Date(advFilterDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
                filtered = filtered.filter(r => r['Joined At'] === targetDate);
            }
        }

        return filtered;
    };

    const renderTable = (headers, dataRows, tabIndex) => {
        if (!dataRows || dataRows.length === 0) {
            return (
                <div className="w-full flex flex-col items-center justify-center py-24 bg-white/50 backdrop-blur-sm rounded-b-3xl">
                    <img src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png" alt="No data" className="w-24 h-24 mb-4 opacity-50 drop-shadow-md" />
                    <Typography sx={{ color: '#94a3b8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px' }}>
                        No Records Found
                    </Typography>
                </div>
            );
        }

        const paginatedData = dataRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        const hasActions = tabIndex === 1 || tabIndex === 2;

        return (
            <div className="bg-white/80 backdrop-blur-xl rounded-b-3xl shadow-inner relative z-10 overflow-hidden">
                <TableContainer sx={{ maxHeight: 'calc(100vh - 460px)', overflowY: 'auto', '&::-webkit-scrollbar': { width: '6px', height: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: '10px' } }}>
                    <Table stickyHeader size="medium" sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow>
                                {headers.map((header, index) => (
                                    <TableCell 
                                        key={index}
                                        sx={{ 
                                            fontWeight: 900, 
                                            color: '#64748b', 
                                            fontSize: '11px', 
                                            textTransform: 'uppercase',
                                            bgcolor: 'rgba(248, 250, 252, 0.95)',
                                            backdropFilter: 'blur(10px)',
                                            borderBottom: '2px solid #e2e8f0',
                                            letterSpacing: '0.05em',
                                            py: 2.5
                                        }}
                                    >
                                        {header}
                                    </TableCell>
                                ))}
                                {hasActions && (
                                    <TableCell 
                                        align="center"
                                        sx={{ 
                                            fontWeight: 900, 
                                            color: '#64748b', 
                                            fontSize: '11px', 
                                            textTransform: 'uppercase',
                                            bgcolor: 'rgba(248, 250, 252, 0.95)',
                                            backdropFilter: 'blur(10px)',
                                            borderBottom: '2px solid #e2e8f0',
                                            letterSpacing: '0.05em',
                                            py: 2.5
                                        }}
                                    >
                                        Actions
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row, rIndex) => (
                                <TableRow 
                                    key={rIndex} 
                                    hover 
                                    sx={{ 
                                        '& td': { borderBottom: '1px dashed #e2e8f0', transition: 'all 0.2s' },
                                        '&:hover td': { bgcolor: '#f8fafc', color: '#0f172a' }
                                    }}
                                >
                                    {headers.map((header, cIndex) => {
                                        const cellValue = row[header];
                                        const isStatus = ['Status', 'Payment', 'Role'].includes(header);
                                        const isCurrency = header.includes('Price') || header.includes('Amount');
                                        const isUserId = header === 'User ID';
                                        
                                        return (
                                            <TableCell key={cIndex} sx={{ fontSize: '13px', color: '#334155', fontWeight: 600, py: 2 }}>
                                                {isStatus ? (
                                                    renderStatusChip(cellValue)
                                                ) : isCurrency ? (
                                                    <span className="font-bold text-slate-800">{formatCurrency(cellValue)}</span>
                                                ) : isUserId ? (
                                                    typeof cellValue === 'string' ? cellValue.slice(-5) : cellValue
                                                ) : (
                                                    cellValue
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                    
                                    {tabIndex === 1 && (
                                        <TableCell align="center" sx={{ py: 2 }}>
                                            <IconButton 
                                                onClick={() => openOrderDetails(row["Order ID"])}
                                                sx={{ 
                                                    color: '#059669', 
                                                    bgcolor: '#ecfdf5', 
                                                    borderRadius: '10px',
                                                    '&:hover': { bgcolor: '#059669', color: '#fff' },
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    )}
                                    {tabIndex === 2 && (
                                        <TableCell align="center" sx={{ py: 2 }}>
                                            <IconButton 
                                                onClick={() => handleDeleteUser(row["User ID"])}
                                                sx={{ 
                                                    color: '#ef4444', 
                                                    bgcolor: '#fef2f2', 
                                                    borderRadius: '10px',
                                                    '&:hover': { bgcolor: '#ef4444', color: '#fff' },
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={dataRows.length}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    rowsPerPageOptions={[10, 25, 50]}
                    sx={{
                        borderTop: '1px solid #e2e8f0',
                        bgcolor: 'rgba(248, 250, 252, 0.5)',
                        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            fontSize: '11px',
                            color: '#64748b',
                            letterSpacing: '0.05em'
                        }
                    }}
                />
            </div>
        );
    };

    return (
        <Box sx={{ minHeight: '100vh', py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 }, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
            <MetaData title="Premium Reports | Admin Panel" />

            {/* Header Section */}
            <Box sx={{ mb: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 3 }}>
                <Box className="animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg shadow-emerald-500/30"></div>
                        <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.3em]">Business Intelligence</p>
                    </div>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: '-0.04em' }}>
                        Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Reports</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b', mt: 1, fontWeight: 500 }}>
                        Real-time analytics and beautiful data exports for your clinical operations.
                    </Typography>
                </Box>

                <Button 
                    variant="contained" 
                    startIcon={<DownloadIcon />}
                    onClick={exportCurrentTab}
                    disabled={isExporting || isLoading}
                    className="group"
                    sx={{ 
                        borderRadius: '16px', px: 4, py: 2, 
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', 
                        fontWeight: 800,
                        fontSize: '14px',
                        textTransform: 'none',
                        boxShadow: '0 10px 25px -5px rgba(5, 150, 105, 0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                            boxShadow: '0 15px 35px -5px rgba(5, 150, 105, 0.5)',
                            transform: 'translateY(-2px)'
                        }
                    }}
                >
                    Export Report to CSV
                </Button>
            </Box>

            {/* Summary Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <Card sx={{ borderRadius: '24px', border: 'none', background: 'linear-gradient(145deg, #ffffff, #f8fafc)', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-10 -mt-10 blur-2xl opacity-60"></div>
                    <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar sx={{ bgcolor: '#ecfdf5', color: '#059669', width: 64, height: 64, boxShadow: '0 8px 20px rgba(5,150,105,0.15)' }}>
                            <AssessmentOutlinedIcon fontSize="large" />
                        </Avatar>
                        <div>
                            <Typography sx={{ color: '#64748b', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5 }}>Total Products</Typography>
                            <Typography sx={{ color: '#0f172a', fontSize: '32px', fontWeight: 900, lineHeight: 1 }}>{products ? products.length : 0}</Typography>
                        </div>
                    </CardContent>
                </Card>
                <Card sx={{ borderRadius: '24px', border: 'none', background: 'linear-gradient(145deg, #ffffff, #f8fafc)', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-10 -mt-10 blur-2xl opacity-60"></div>
                    <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar sx={{ bgcolor: '#f0fdf4', color: '#0d9488', width: 64, height: 64, boxShadow: '0 8px 20px rgba(13,148,136,0.15)' }}>
                            <ShoppingCartOutlinedIcon fontSize="large" />
                        </Avatar>
                        <div>
                            <Typography sx={{ color: '#64748b', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5 }}>Total Orders</Typography>
                            <Typography sx={{ color: '#0f172a', fontSize: '32px', fontWeight: 900, lineHeight: 1 }}>{orders ? orders.length : 0}</Typography>
                        </div>
                    </CardContent>
                </Card>
                <Card sx={{ borderRadius: '24px', border: 'none', background: 'linear-gradient(145deg, #ffffff, #f8fafc)', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-10 -mt-10 blur-2xl opacity-60"></div>
                    <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar sx={{ bgcolor: '#f0fdf4', color: '#16a34a', width: 64, height: 64, boxShadow: '0 8px 20px rgba(22,163,74,0.15)' }}>
                            <PeopleAltOutlinedIcon fontSize="large" />
                        </Avatar>
                        <div>
                            <Typography sx={{ color: '#64748b', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5 }}>Registered Users</Typography>
                            <Typography sx={{ color: '#0f172a', fontSize: '32px', fontWeight: 900, lineHeight: 1 }}>{users ? users.length : 0}</Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Data Section */}
            {isLoading ? (
                <div className="w-full flex flex-col items-center justify-center py-32">
                    <CircularProgress size={60} thickness={4} sx={{ color: '#059669', mb: 3 }} />
                    <Typography sx={{ fontWeight: 800, color: '#94a3b8', letterSpacing: '0.1em', animation: 'pulse 2s infinite' }}>GATHERING INTEL...</Typography>
                </div>
            ) : (
                <Card sx={{ 
                    borderRadius: '24px', 
                    border: '1px solid rgba(255,255,255,0.4)', 
                    background: 'rgba(255, 255, 255, 0.7)', 
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)', 
                    overflow: 'hidden',
                    className: 'animate-fade-in-up',
                    style: { animationDelay: '0.2s' }
                }}>
                    <Box sx={{ 
                        borderBottom: 1, 
                        borderColor: 'rgba(0,0,0,0.05)', 
                        bgcolor: 'rgba(255,255,255,0.9)', 
                        px: 1, pt: 1,
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Tabs 
                            value={currentTab} 
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto" 
                            sx={{
                                '& .MuiTab-root': {
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontSize: '13px',
                                    color: '#94a3b8',
                                    minWidth: 160,
                                    py: 2.5,
                                    transition: 'all 0.3s'
                                },
                                '& .Mui-selected': { color: '#059669 !important' },
                                '& .MuiTabs-indicator': { 
                                    backgroundColor: '#059669', 
                                    height: 4, 
                                    borderTopLeftRadius: 4, 
                                    borderTopRightRadius: 4,
                                    boxShadow: '0 -2px 10px rgba(5,150,105,0.5)'
                                }
                            }}
                        >
                            <Tab icon={<AssessmentOutlinedIcon sx={{ mb: '4px !important' }} />} label="Products Inventory" />
                            <Tab icon={<ShoppingCartOutlinedIcon sx={{ mb: '4px !important' }} />} label="Sales Orders" />
                            <Tab icon={<PeopleAltOutlinedIcon sx={{ mb: '4px !important' }} />} label="Registered Users" />
                        </Tabs>
                    </Box>
                    <Box sx={{ p: 0, position: 'relative' }}>
                        
                        {/* Filter Bar for Products & Orders */}
                        {currentTab !== 2 && (
                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-slate-50 border-b border-slate-100">
                                <TextField
                                    placeholder="Search here..."
                                    variant="outlined"
                                    size="small"
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                                    sx={{ width: { xs: '100%', md: '350px' }, bgcolor: 'white', '& fieldset': { borderRadius: '12px' } }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>,
                                    }}
                                />
                                
                                <FormControl size="small" sx={{ width: { xs: '100%', md: '220px' }, bgcolor: 'white', '& fieldset': { borderRadius: '12px' } }}>
                                    <Select
                                        value={filterStatus}
                                        onChange={(e) => { setFilterStatus(e.target.value); setPage(0); }}
                                        displayEmpty
                                        IconComponent={FilterListIcon}
                                        sx={{ color: '#475569', fontWeight: 600, fontSize: '14px' }}
                                    >
                                        <MenuItem value="All">All / Any</MenuItem>
                                        {currentTab === 0 && [
                                            <MenuItem key="InStock" value="InStock">In Stock</MenuItem>,
                                            <MenuItem key="OutOfStock" value="OutOfStock">Out of Stock</MenuItem>
                                        ]}
                                        {currentTab === 1 && [
                                            <MenuItem key="Processing" value="Processing">Processing</MenuItem>,
                                            <MenuItem key="Shipped" value="Shipped">Shipped</MenuItem>,
                                            <MenuItem key="Delivered" value="Delivered">Delivered</MenuItem>
                                        ]}
                                    </Select>
                                </FormControl>
                            </div>
                        )}

                        {/* Combined Filter Bar for Registered Users */}
                        {currentTab === 2 && (
                            <div className="flex flex-wrap gap-3 p-4 bg-slate-50 border-b border-slate-100 items-center">
                                <FormControl size="small" sx={{ flex: 1, minWidth: '130px', bgcolor: 'white', '& fieldset': { borderRadius: '8px' } }}>
                                    <Select
                                        value={filterStatus}
                                        onChange={(e) => { setFilterStatus(e.target.value); setPage(0); }}
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
                                    placeholder="User ID"
                                    variant="outlined"
                                    size="small"
                                    value={advFilterUserId}
                                    onChange={(e) => { setAdvFilterUserId(e.target.value); setPage(0); }}
                                    sx={{ flex: 1, minWidth: '130px', bgcolor: 'white', '& fieldset': { borderRadius: '8px' } }}
                                />
                                
                                <TextField
                                    placeholder="Email"
                                    variant="outlined"
                                    size="small"
                                    value={advFilterEmail}
                                    onChange={(e) => { setAdvFilterEmail(e.target.value); setPage(0); }}
                                    sx={{ flex: 1.5, minWidth: '160px', bgcolor: 'white', '& fieldset': { borderRadius: '8px' } }}
                                />
                                
                                <TextField
                                    placeholder="Mobile"
                                    variant="outlined"
                                    size="small"
                                    value={advFilterMobile}
                                    onChange={(e) => { setAdvFilterMobile(e.target.value); setPage(0); }}
                                    sx={{ flex: 1, minWidth: '130px', bgcolor: 'white', '& fieldset': { borderRadius: '8px' } }}
                                />
                                
                                <TextField
                                    type="date"
                                    variant="outlined"
                                    size="small"
                                    value={advFilterDate}
                                    onChange={(e) => { setAdvFilterDate(e.target.value); setPage(0); }}
                                    sx={{ flex: 1, minWidth: '140px', bgcolor: 'white', '& fieldset': { borderRadius: '8px' } }}
                                />
                                
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    size="small"
                                    disableElevation
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilterStatus('All');
                                        setAdvFilterUserId('');
                                        setAdvFilterEmail('');
                                        setAdvFilterMobile('');
                                        setAdvFilterDate('');
                                        setPage(0);
                                    }}
                                    sx={{ fontWeight: 700, borderRadius: '8px', textTransform: 'none', height: '40px', px: 3 }}
                                >
                                    Clear
                                </Button>
                            </div>
                        )}

                        {currentTab === 0 && renderTable(Object.keys(getProductsData()[0] || {}), applyFilters(getProductsData()), 0)}
                        {currentTab === 1 && renderTable(Object.keys(getOrdersData()[0] || {}), applyFilters(getOrdersData()), 1)}
                        {currentTab === 2 && renderTable(Object.keys(getUsersData()[0] || {}), applyFilters(getUsersData()), 2)}
                    </Box>
                </Card>
            )}

            {/* User Details Modal */}
            <Dialog 
                open={Boolean(selectedUser)} 
                onClose={closeUserDetails}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }
                }}
            >
                {selectedUser && (
                    <>
                        <DialogTitle sx={{ p: 0 }}>
                            <Box sx={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', p: 4, position: 'relative' }}>
                                <IconButton 
                                    onClick={closeUserDetails}
                                    sx={{ position: 'absolute', top: 16, right: 16, color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}
                                >
                                    <CloseIconMaterial />
                                </IconButton>
                                <div className="flex items-center gap-4">
                                    <Avatar sx={{ width: 80, height: 80, bgcolor: '#ffffff', color: '#059669', fontSize: '32px', fontWeight: 900, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                                        {selectedUser.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <div>
                                        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 900, letterSpacing: '-0.02em', mb: 0.5 }}>
                                            {selectedUser.name}
                                        </Typography>
                                        <div className="flex items-center gap-3">
                                            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500 }}>
                                                {selectedUser.email}
                                            </Typography>
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                                            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                {selectedUser.role}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </DialogTitle>
                        <DialogContent sx={{ p: 4, bgcolor: '#f8fafc' }}>
                            <div className="mb-6">
                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Purchase History
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full text-[11px] font-black">{userOrders.length} Orders</span>
                                </Typography>
                            </div>
                            
                            {userOrders.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                                    <ShoppingCartOutlinedIcon sx={{ fontSize: 64, color: '#cbd5e1', mb: 2 }} />
                                    <Typography sx={{ color: '#64748b', fontWeight: 600 }}>This user has not placed any orders yet.</Typography>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {userOrders.map((order, idx) => (
                                        <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <Typography sx={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                        Order #{order._id.slice(-5)}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                                                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </Typography>
                                                </div>
                                                <div className="text-right">
                                                    <Typography sx={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>
                                                        {formatCurrency(order.totalPrice)}
                                                    </Typography>
                                                    <div className="mt-1 flex gap-2 justify-end">
                                                        {renderStatusChip(order.paymentInfo?.status || 'Pending')}
                                                        {renderStatusChip(order.orderStatus)}
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider sx={{ my: 2, borderColor: '#f1f5f9' }} />
                                            <div>
                                                <Typography sx={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', mb: 2, letterSpacing: '0.05em' }}>Items Purchased</Typography>
                                                <div className="space-y-2">
                                                    {order.orderItems.map((item, iIdx) => (
                                                        <div key={iIdx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center p-1 overflow-hidden">
                                                                    <img src={getImageUrl(item.image)} alt={item.name} className="max-w-full max-h-full object-contain" />
                                                                </div>
                                                                <div>
                                                                    <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{item.name}</Typography>
                                                                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Qty: {item.quantity}</Typography>
                                                                </div>
                                                            </div>
                                                            <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#059669' }}>
                                                                {formatCurrency(item.price * item.quantity)}
                                                            </Typography>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </DialogContent>
                    </>
                )}
            </Dialog>

            {/* Order Details Modal */}
            <Dialog 
                open={Boolean(selectedOrder)} 
                onClose={closeOrderDetails}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }
                }}
            >
                {selectedOrder && (
                    <>
                        <DialogTitle sx={{ p: 0 }}>
                            <Box sx={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', p: 3, position: 'relative', display: 'flex', alignItems: 'center', gap: 3 }}>
                                <IconButton 
                                    onClick={closeOrderDetails}
                                    sx={{ position: 'absolute', top: 12, right: 12, color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}
                                >
                                    <CloseIconMaterial />
                                </IconButton>
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                                    <ReceiptLongIcon fontSize="large" />
                                </div>
                                <div>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        Order Details
                                    </Typography>
                                    <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 900, letterSpacing: '-0.02em' }}>
                                        #{selectedOrder._id.slice(-5)}
                                    </Typography>
                                </div>
                            </Box>
                        </DialogTitle>
                        <DialogContent sx={{ p: 4, bgcolor: '#f8fafc' }}>
                            {/* Summary Cards */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                    <Typography sx={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', mb: 1 }}>Date Placed</Typography>
                                    <Typography sx={{ fontSize: '14px', color: '#334155', fontWeight: 700 }}>
                                        {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </Typography>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                    <Typography sx={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', mb: 1 }}>Total Amount</Typography>
                                    <Typography sx={{ fontSize: '16px', color: '#059669', fontWeight: 900 }}>
                                        {formatCurrency(selectedOrder.totalPrice)}
                                    </Typography>
                                </div>
                            </div>

                            {/* Customer & Shipping Info */}
                            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <LocalShippingIcon fontSize="small" />
                                    </div>
                                    <Typography sx={{ fontWeight: 800, color: '#0f172a' }}>Shipping Information</Typography>
                                </div>
                                <div className="pl-11">
                                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155', mb: 0.5 }}>
                                        {selectedOrder.user?.name || 'Customer Name Unavailable'}
                                    </Typography>
                                    <Typography sx={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                                        {selectedOrder.shippingInfo?.address}<br/>
                                        {selectedOrder.shippingInfo?.city}, {selectedOrder.shippingInfo?.state} - {selectedOrder.shippingInfo?.pincode}<br/>
                                        <span className="font-semibold mt-1 block">Phone: {selectedOrder.shippingInfo?.phoneNo}</span>
                                    </Typography>
                                </div>
                            </div>

                            {/* Items List */}
                            <Typography sx={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', mb: 2, letterSpacing: '0.05em' }}>
                                Ordered Items ({selectedOrder.orderItems.length})
                            </Typography>
                            <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                {selectedOrder.orderItems.map((item, iIdx) => (
                                    <div key={iIdx} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center p-1 overflow-hidden">
                                                <img src={getImageUrl(item.image)} alt={item.name} className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <div>
                                                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{item.name}</Typography>
                                                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Qty: {item.quantity} x {formatCurrency(item.price)}</Typography>
                                            </div>
                                        </div>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                                            {formatCurrency(item.price * item.quantity)}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default Reports;
