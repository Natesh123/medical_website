import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
    CircularProgress,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Grid,
    FormControl,
    Select
} from '@mui/material';

import MetaData from "../Layouts/MetaData";
import {
    getAdminProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    getProductDetails,
    clearErrors,
} from "../../actions/productAction";
import { getAdminSubCategories } from "../../actions/subCategoryAction";
import { getAdminGsts } from "../../actions/gstAction";
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET, DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Modal states
    // Modal states
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openImageModal, setOpenImageModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewImage, setViewImage] = useState('');

    // Form states
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        status: 'Active',
        subCategoryType: 'Non-Prescription',
        gst: 0
    });
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [validation, setValidation] = useState({});

    const { loading, products, error } = useSelector((state) => state.products);
    const { isDeleted, error: deleteError, isUpdated, error: updateError } = useSelector((state) => state.product);
    const { success: createSuccess, error: createError, loading: createLoading } = useSelector((state) => state.newProduct);
    const { product: productDetails } = useSelector((state) => state.productDetails);
    const { subCategories } = useSelector((state) => state.subCategories);
    const { gsts } = useSelector((state) => state.gsts);

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAdminSubCategories());
        dispatch(getAdminGsts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({ title: "Failed!", text: error, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }
        if (deleteError) {
            Swal.fire({ title: "Failed!", text: deleteError, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            Swal.fire({ title: "Success!", text: "Product deleted successfully!", icon: "success", timer: 2000 });
            dispatch({ type: DELETE_PRODUCT_RESET });
            dispatch(getAdminProducts());
        }
        if (createSuccess) {
            Swal.fire({ title: "Success!", text: "Product created successfully!", icon: "success", timer: 2000 });
            dispatch({ type: NEW_PRODUCT_RESET });
            dispatch(getAdminProducts());
            handleCloseAddModal();
        }
        if (createError) {
            Swal.fire({ title: "Failed!", text: createError, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            Swal.fire({ title: "Success!", text: "Product updated successfully!", icon: "success", timer: 2000 });
            dispatch({ type: UPDATE_PRODUCT_RESET });
            dispatch(getAdminProducts());
            handleCloseEditModal();
        }
        if (updateError) {
            Swal.fire({ title: "Failed!", text: updateError, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }

        if (productDetails && openEditModal && productDetails._id === selectedProduct?._id) {
            setProductForm({
                name: productDetails.name || '',
                description: productDetails.description || '',
                price: productDetails.price || '',
                stock: productDetails.stock || '',
                category: productDetails.category || '',
                status: productDetails.status || 'Active',
                subCategoryType: productDetails.subCategoryType || 'Non-Prescription',
                gst: productDetails.gst || 0
            });
            setImagesPreview(productDetails.images?.map(img => img.url?.startsWith('http') ? img.url : `/admin/product/${img.url}`) || []);
        }
    }, [dispatch, error, deleteError, isDeleted, createSuccess, createError, isUpdated, updateError, productDetails, openEditModal]);

    const handleOpenAddModal = () => {
        setProductForm({ name: '', description: '', price: '', stock: '', category: '', status: 'Active', subCategoryType: 'Non-Prescription', gst: 0 });
        setImages([]);
        setImagesPreview([]);
        setValidation({});
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setProductForm({ name: '', description: '', price: '', stock: '', category: '', status: 'Active', subCategoryType: 'Non-Prescription', gst: 0 });
        setImages([]);
        setImagesPreview([]);
        setValidation({});
    };

    const handleOpenEditModal = (product) => {
        setSelectedProduct(product);
        dispatch(getProductDetails(product._id));
        setValidation({});
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedProduct(null);
        setProductForm({ name: '', description: '', price: '', stock: '', category: '', status: 'Active', subCategoryType: 'Non-Prescription', gst: 0 });
        setImages([]);
        setImagesPreview([]);
        setValidation({});
    };

    const handleOpenImageModal = (imageUrl) => {
        setViewImage(imageUrl);
        setOpenImageModal(true);
    };

    const handleCloseImageModal = () => {
        setOpenImageModal(false);
        setViewImage('');
    };

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((prev) => [...prev, reader.result]);
                    setImages((prev) => [...prev, file]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!productForm.name.trim()) errors.name = "Product name is required";
        if (!productForm.description.trim()) errors.description = "Description is required";
        if (productForm.price === "") errors.price = "Price is required";
        if (productForm.stock === "") errors.stock = "Stock is required";
        if (!productForm.category) errors.category = "Category is required";
        if (openAddModal && images.length === 0) errors.images = "Product image is required";

        setValidation(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.set("name", productForm.name);
        formData.set("description", productForm.description);
        formData.set("price", productForm.price);
        formData.set("stock", productForm.stock);
        formData.set("category", productForm.category);
        formData.set("status", productForm.status);
        formData.set("subCategoryType", productForm.subCategoryType);
        formData.set("gst", productForm.gst);
        images.forEach((img) => formData.append("images", img));

        dispatch(createProduct(formData));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.set("name", productForm.name);
        formData.set("description", productForm.description);
        formData.set("price", productForm.price);
        formData.set("stock", productForm.stock);
        formData.set("category", productForm.category);
        formData.set("status", productForm.status);
        formData.set("subCategoryType", productForm.subCategoryType);
        formData.set("gst", productForm.gst);
        images.forEach((img) => formData.append("images", img));

        dispatch(updateProduct(selectedProduct._id, formData));
    };

    const handleEdit = (product) => {
        handleOpenEditModal(product);
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
                dispatch(deleteProduct(id));
            }
        });
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center mt-10 text-xl">
                {error}
            </div>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="Inventory | Shree Kishan Aayushi" />

            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-1 bg-green-600 rounded-full"></div>
                        <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-[0.3em]">Inventory</p>
                    </div>
                    <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                        All <span style={{ color: '#16a34a' }}>Products</span>
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddModal}
                    sx={{
                        borderRadius: '18px',
                        textTransform: 'uppercase',
                        fontWeight: 900,
                        letterSpacing: '0.1em',
                        fontSize: '11px',
                        px: 4,
                        py: 2,
                        background: '#16a34a',
                        boxShadow: '0 15px 30px rgba(22, 163, 74, 0.15)',
                        '&:hover': {
                            background: '#14532d',
                            transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    Add Product
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
                                        { label: 'S.No', width: '80px' },
                                        { label: 'Product Name', width: 'auto' },
                                        { label: 'Category', width: 'auto' },
                                        { label: 'Stock', width: '120px' },
                                        { label: 'Price', width: '140px' },
                                        { label: 'Status', width: '120px' },
                                        { label: 'Actions', width: '140px' }
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
                                {products?.length ? (
                                    products
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((product, index) => (
                                            <TableRow
                                                key={product._id}
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
                                                            fontSize: '14px',
                                                            fontWeight: 900,
                                                            color: '#16a34a',
                                                            border: '1px solid #e2e8f0'
                                                        }}>
                                                            {product.name.charAt(0).toUpperCase()}
                                                        </Box>
                                                        <Typography sx={{ fontSize: '13px', color: '#020617', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                                                            {product.name}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '10px', color: '#16a34a', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', bgcolor: '#f0fdf4', px: 2, py: 0.8, borderRadius: '8px', display: 'inline-block' }}>
                                                        {product.category?.name || product.category}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography sx={{
                                                        fontSize: '12px',
                                                        fontWeight: 900,
                                                        color: product.stock < 10 ? '#ef4444' : '#020617'
                                                    }}>
                                                        {product.stock}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography sx={{ fontSize: '13px', color: '#020617', fontWeight: 900, letterSpacing: '-0.02em' }}>
                                                        ₹{(product.price || 0).toLocaleString()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{
                                                        fontSize: '9px',
                                                        fontWeight: 950,
                                                        color: product.status === "Active" ? '#059669' : '#ef4444',
                                                        background: product.status === "Active" ? '#ecfdf5' : '#fef2f2',
                                                        px: 2,
                                                        py: 1,
                                                        borderRadius: '20px',
                                                        display: 'inline-block',
                                                        border: `1px solid ${product.status === "Active" ? '#d1fae5' : '#fee2e2'}`,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.1em'
                                                    }}>
                                                        {product.status || 'Active'}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
                                                        <IconButton
                                                            onClick={() => handleOpenImageModal(
                                                                product.images?.[0]?.url?.startsWith('http')
                                                                    ? product.images[0].url
                                                                    : `/admin/product/${product.images?.[0]?.url}`
                                                            )}
                                                            sx={{
                                                                color: '#64748b',
                                                                background: '#f1f5f9',
                                                                borderRadius: '12px',
                                                                '&:hover': { background: '#e2e8f0', color: '#020617' },
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <VisibilityIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => handleEdit(product)}
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
                                                            onClick={() => handleDelete(product._id)}
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
                                            <div className="flex flex-col items-center gap-4 opacity-20">
                                                <div className="w-16 h-16 rounded-full bg-slate-200"></div>
                                                <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '11px' }}>No Products Found</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={products?.length || 0}
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

            {/* Implementation Modals (Add/Edit) - Updated to Global Elite Theme */}
            <Dialog
                open={openAddModal || openEditModal}
                onClose={openAddModal ? handleCloseAddModal : handleCloseEditModal}
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
                                <p className="text-[9px] font-semibold text-green-900/40 uppercase tracking-[0.2em]">Product Form</p>
                            </div>
                            <Typography variant="h5" sx={{ fontWeight: 950, color: '#020617', textTransform: 'uppercase' }}>
                                {openAddModal ? 'Add' : 'Edit'} <span style={{ color: '#16a34a' }}>Product</span>
                            </Typography>
                        </Box>
                        <IconButton onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ px: 6, py: 4 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={7}>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Product Name</label>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={productForm.name}
                                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Price (₹)</label>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            value={productForm.price}
                                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Stock</label>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            value={productForm.stock}
                                            onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Category</label>
                                        <Select
                                            fullWidth
                                            value={productForm.category}
                                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                            sx={{ borderRadius: '15px', bgcolor: '#f8fafc' }}
                                        >
                                            {subCategories?.map(sub => <MenuItem key={sub._id} value={sub.name}>{sub.name}</MenuItem>)}
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Sub Category Type</label>
                                        <Select
                                            fullWidth
                                            value={productForm.subCategoryType}
                                            onChange={(e) => setProductForm({ ...productForm, subCategoryType: e.target.value })}
                                            sx={{ borderRadius: '15px', bgcolor: '#f8fafc' }}
                                        >
                                            <MenuItem value="Non-Prescription">Non-Prescription</MenuItem>
                                            <MenuItem value="Prescription">Prescription</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Status</label>
                                        <Select
                                            fullWidth
                                            value={productForm.status}
                                            onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                                            sx={{ borderRadius: '15px', bgcolor: '#f8fafc' }}
                                        >
                                            <MenuItem value="Active">Active</MenuItem>
                                            <MenuItem value="Inactive">Inactive</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">GST (%)</label>
                                        <Select
                                            fullWidth
                                            value={productForm.gst}
                                            onChange={(e) => setProductForm({ ...productForm, gst: e.target.value })}
                                            sx={{ borderRadius: '15px', bgcolor: '#f8fafc' }}
                                        >
                                            <MenuItem value={0}>0%</MenuItem>
                                            {gsts?.map(gst => <MenuItem key={gst._id} value={gst.percentage}>{gst.percentage}%</MenuItem>)}
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Description</label>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={productForm.description}
                                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '20px', bgcolor: '#f8fafc' } }}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <div className="h-full flex flex-col">
                                <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest mb-2 ml-1">Product Images</label>
                                <Box sx={{
                                    flex: 1,
                                    border: '2px dashed #e2e8f0',
                                    borderRadius: '30px',
                                    bgcolor: '#f8fafc',
                                    p: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 2,
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: '#f1f5f9', borderColor: '#16a34a' },
                                    transition: 'all 0.3s ease'
                                }} component="label">
                                    <input type="file" hidden multiple onChange={handleImages} />
                                    {imagesPreview.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            {imagesPreview.map((url, i) => (
                                                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white shadow-sm">
                                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <CloudUploadIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                                            <p className="text-[10px] font-semibold text-green-900/20 uppercase tracking-[0.2em] text-center">Upload Images Here</p>
                                        </div>
                                    )}
                                </Box>
                                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                                    <Button fullWidth onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal} sx={{ borderRadius: '15px', color: '#94a3b8', fontWeight: 900, fontSize: '11px' }}>Cancel</Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={openAddModal ? handleAddSubmit : handleEditSubmit}
                                        sx={{ borderRadius: '15px', bgcolor: '#16a34a', fontWeight: 900, fontSize: '11px', boxShadow: '0 10px 20px rgba(22,163,74,0.2)' }}
                                    >
                                        {openAddModal ? 'Add Product' : 'Update Product'}
                                    </Button>
                                </Box>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            {/* Image Preview Modal */}
            <Dialog
                open={openImageModal}
                onClose={handleCloseImageModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 50px 100px rgba(0,0,0,0.1)',
                        overflow: 'hidden'
                    }
                }}
            >
                <Box sx={{ position: 'relative', p: 1, bgcolor: '#fff' }}>
                    <IconButton
                        onClick={handleCloseImageModal}
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: 16,
                            color: '#020617',
                            background: 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(4px)',
                            '&:hover': { background: '#f1f5f9' },
                            zIndex: 10
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{
                        width: '100%',
                        height: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 4
                    }}>
                        <img
                            src={viewImage}
                            alt="Product Preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))'
                            }}
                        />
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
};


export default ProductTable;
