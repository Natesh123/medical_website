import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productAction';
import { getCategories } from '../../actions/categoryAction';
import { getSubCategories } from '../../actions/subCategoryAction';
import Loader from '../Layouts/Loader';
import Product from './Product';
import Pagination from '@mui/material/Pagination';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();

    // Filters
    const [price, setPrice] = useState([0, 200000]);
    const [category, setCategory] = useState("");
    const [selectedMainCategory, setSelectedMainCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [priceToggle, setPriceToggle] = useState(true);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [onMobile, setOnMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const checkMobile = () => setOnMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { products, loading, error, resultPerPage, filteredProductsCount } = useSelector(state => state.products);
    const { categories: adminCategories } = useSelector(state => state.categories);
    const { subCategories } = useSelector(state => state.subCategories);
    const keyword = params.keyword;

    const priceHandler = (e, newPrice) => setPrice(newPrice);

    const clearFilters = () => {
        setPrice([0, 200000]);
        setCategory("");
        setSelectedMainCategory("");
        setRatings(0);
        setMobileFiltersOpen(false);
        setSearchTerm('');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products/${searchTerm}`);
        }
    };

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getSubCategories());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            if (error !== "Please Login to Access") {
                enqueueSnackbar(error, { variant: "error" });
            }
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, category, price, ratings, currentPage));
    }, [dispatch, keyword, category, price, ratings, currentPage, error, enqueueSnackbar]);

    // Real-time search filter
    useEffect(() => {
        if (!products || products.length === 0) {
            setFilteredProducts([]);
            return;
        }

        if (!searchTerm.trim()) {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const groupedSubCategories = subCategories?.reduce((acc, sub) => {
        const catId = sub.category?._id || sub.category;
        if (!acc[catId]) acc[catId] = [];
        acc[catId].push(sub);
        return acc;
    }, {});

    return (
        <>
            <MetaData title="Premium Medical Catalog | Shree Kishan Aayushi" />

            <main className="w-full mt-24 sm:mt-28 bg-slate-50 min-h-screen relative overflow-hidden">

                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>

                    {/* Clinical Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.05]"></div>
                </div>

                <div className="container-responsive relative z-10 py-8">

                    {/* Catalog Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                        <div className="animate-fade-in-left">
                            <h1 className="text-xl sm:text-3xl font-semibold text-blue-950 uppercase tracking-tighter mb-2 leading-none">Medical <span className="text-blue-600">Catalog</span></h1>
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-1 bg-blue-600 rounded-full"></span>
                                <p className="text-blue-800/60 font-semibold uppercase tracking-widest text-[9px]">Verified Healthcare Solutions</p>
                            </div>
                        </div>

                        {/* Search Bar - Premium Clinical */}
                        <form onSubmit={handleSearch} className="w-full max-w-xl animate-fade-in-right">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search molecules, brands or devices..."
                                    className="w-full bg-white border border-blue-100 rounded-xl px-6 py-4 pl-14 text-blue-950 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all duration-500 placeholder:text-blue-900/20 shadow-sm"
                                />
                                <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 text-blue-300 group-focus-within:text-blue-600 transition-colors" sx={{ fontSize: 20 }} />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg text-[9px] font-semibold uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Filter Action - Mobile */}
                    <div className="lg:hidden mb-8 animate-fade-in-up">
                        <button
                            className="w-full glass-card border-white/10 rounded-xl p-4 flex items-center justify-between group"
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        >
                            <span className="font-semibold text-[10px] uppercase tracking-widest text-white">Refine Search</span>
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-semibold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                                    {(category ? 1 : 0) + (price[0] > 0 || price[1] < 200000 ? 1 : 0)} Active
                                </span>
                                <ExpandMoreIcon className="text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 items-start">

                        {/* Sidebar (Desktop) */}
                        <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 animate-fade-in-left sticky top-32">
                            <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] p-7 space-y-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                <div className="flex justify-between items-center border-b-2 border-slate-50 pb-4">
                                    <h3 className="font-semibold text-base uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                        <span className="w-2 h-6 bg-[#d97706] rounded-full"></span> Filters
                                    </h3>
                                    <button
                                        className="text-[#d97706] hover:text-white bg-orange-50 hover:bg-[#d97706] text-[10px] font-semibold transition-all duration-300 uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-sm hover:shadow-md"
                                        onClick={clearFilters}
                                    >
                                        Clear All
                                    </button>
                                </div>

                                {/* Price Filter */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center group cursor-pointer" onClick={() => setPriceToggle(!priceToggle)}>
                                        <h4 className="font-semibold text-[11px] uppercase text-slate-700 tracking-[0.2em]">Price Range</h4>
                                        {priceToggle ? <ExpandLessIcon sx={{ fontSize: 20 }} className="text-[#d97706]" /> : <ExpandMoreIcon sx={{ fontSize: 20 }} className="text-slate-300 group-hover:text-slate-500" />}
                                    </div>
                                    {priceToggle && (
                                        <div className="animate-fade-in px-2 pt-2">
                                            <Slider
                                                value={price}
                                                onChange={priceHandler}
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={200000}
                                                sx={{
                                                    color: '#d97706',
                                                    '& .MuiSlider-thumb': {
                                                        width: 20,
                                                        height: 20,
                                                        backgroundColor: '#fff',
                                                        border: '3px solid #d97706',
                                                        boxShadow: '0 4px 10px rgba(217,119,6,0.3)',
                                                        '&:hover, &.Mui-focusVisible': {
                                                            boxShadow: '0 0 0 8px rgba(217,119,6,0.1)',
                                                        }
                                                    },
                                                    '& .MuiSlider-track': { height: 4, borderRadius: 2 },
                                                    '& .MuiSlider-rail': { height: 4, opacity: 0.3, backgroundColor: '#cbd5e1', borderRadius: 2 },
                                                }}
                                            />
                                            <div className="flex justify-between mt-4">
                                                <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2">
                                                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest block mb-0.5">Min</span>
                                                    <span className="text-sm font-semibold text-slate-900">₹{price[0].toLocaleString()}</span>
                                                </div>
                                                <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-right">
                                                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest block mb-0.5">Max</span>
                                                    <span className="text-sm font-semibold text-slate-900">₹{price[1].toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Categories Filter */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center group cursor-pointer" onClick={() => setCategoryToggle(!categoryToggle)}>
                                        <h4 className="font-semibold text-[11px] uppercase text-slate-700 tracking-[0.2em]">Categories</h4>
                                        {categoryToggle ? <ExpandLessIcon sx={{ fontSize: 20 }} className="text-[#d97706]" /> : <ExpandMoreIcon sx={{ fontSize: 20 }} className="text-slate-300 group-hover:text-slate-500" />}
                                    </div>
                                    {categoryToggle && (
                                        <div className="space-y-3 animate-fade-in pt-2">
                                            {adminCategories?.map((cat) => (
                                                <div key={cat._id} className="mb-2">
                                                    <div
                                                        className={`flex items-center justify-between group cursor-pointer px-5 py-3.5 rounded-2xl transition-all duration-300 ${selectedMainCategory === cat._id ? 'bg-gradient-to-r from-orange-50 to-white border-l-4 border-l-[#d97706] shadow-sm' : 'bg-transparent hover:bg-slate-50 border-l-4 border-l-transparent'}`}
                                                        onClick={() => setSelectedMainCategory(selectedMainCategory === cat._id ? "" : cat._id)}
                                                    >
                                                        <span className={`text-[11px] font-semibold uppercase tracking-widest transition-colors ${selectedMainCategory === cat._id ? 'text-[#d97706]' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                                            {cat.name}
                                                        </span>
                                                        {selectedMainCategory === cat._id ?
                                                            <ExpandLessIcon sx={{ fontSize: 20 }} className="text-[#d97706]" /> :
                                                            <ExpandMoreIcon sx={{ fontSize: 20 }} className="text-slate-300 group-hover:text-slate-500" />
                                                        }
                                                    </div>

                                                    {selectedMainCategory === cat._id && (
                                                        <div className="mt-4 mb-4 animate-fade-in">
                                                            <div className="flex flex-wrap gap-2 px-2">
                                                                {groupedSubCategories[cat._id]?.map((sub) => (
                                                                    <button
                                                                        key={sub._id}
                                                                        onClick={() => setCategory(category === sub.name ? "" : sub.name)}
                                                                        className={`px-4 py-2.5 rounded-xl text-[9px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 border shadow-sm ${
                                                                            category === sub.name
                                                                                ? 'bg-gradient-to-r from-[#d97706] to-[#f59e0b] text-white border-transparent shadow-[#d97706]/40 scale-[1.02]'
                                                                                : 'bg-white text-slate-500 border-slate-100 hover:border-[#d97706] hover:text-[#d97706] hover:shadow-md'
                                                                        }`}
                                                                    >
                                                                        {sub.name}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </aside>

                        {/* Products List Grid */}
                        <section className="flex-1 w-full animate-fade-in-up">
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="card-premium h-96 animate-pulse opacity-50 bg-white/50"></div>
                                    ))}
                                </div>
                            ) : products?.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 bg-white/50 backdrop-blur-3xl rounded-[2.5rem] border border-blue-100 shadow-2xl shadow-blue-900/5">
                                    <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center mb-8 border border-blue-100 animate-pulse">
                                        <SearchIcon sx={{ fontSize: 60, color: 'rgba(15,82,186,0.1)' }} />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-blue-950 uppercase tracking-tighter mb-4">No Diagnostics Matched</h2>
                                    <p className="text-blue-800/50 text-center max-w-sm font-semibold leading-relaxed px-6 uppercase tracking-widest text-[9px]">Your query yielded zero biological results. Please adjust parameters.</p>
                                    <button onClick={clearFilters} className="mt-10 px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold uppercase tracking-[0.2em] text-[9px] hover:bg-blue-800 transition-all shadow-2xl shadow-blue-600/30 active:scale-95">Re-Sync Filters</button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => <Product key={product._id} {...product} />)}
                                </div>
                            )}

                            {/* Pagination - Premium Clinical */}
                            {filteredProductsCount > 0 && (
                                <div className="flex justify-center mt-16 mb-12">
                                    <Pagination
                                        count={Math.ceil(filteredProductsCount / (resultPerPage || 12))}
                                        page={currentPage}
                                        onChange={(e, val) => setCurrentPage(val)}
                                        color="primary"
                                        shape="rounded"
                                        size={onMobile ? "small" : "medium"}
                                        sx={{
                                            '& .MuiPaginationItem-root': {
                                                color: '#d97706',
                                                fontFamily: 'inherit',
                                                fontWeight: 'bold',
                                                fontSize: '0.8rem',
                                                borderRadius: '0.5rem',
                                                margin: '0 4px',
                                                border: '1px solid #fde68a',
                                                background: '#fff',
                                                transition: 'all 0.3s ease',
                                                '&:hover': { background: '#fffbeb', color: '#b45309', transform: 'translateY(-1px)' },
                                                '&.Mui-selected': {
                                                    background: '#d97706',
                                                    color: 'white',
                                                    border: 'none',
                                                    boxShadow: '0 4px 12px rgba(217,119,6,0.25)',
                                                    '&:hover': { background: '#b45309' }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                {/* Mobile Filter Sheet Component */}
                {mobileFiltersOpen && (
                    <div className="fixed inset-0 z-[100] sm:hidden animate-fade-in">
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-[#0f172a] rounded-t-[2.5rem] border-t border-white/10 p-8 max-h-[85vh] overflow-y-auto animate-slide-up">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-semibold text-white uppercase tracking-tighter">Refinement</h3>
                                <button onClick={() => setMobileFiltersOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white text-xs">✕</button>
                            </div>

                            <div className="space-y-10 pb-10">
                                <div className="space-y-4">
                                    <h4 className="text-[9px] font-semibold uppercase text-slate-500 tracking-widest">Financial Range</h4>
                                    <Slider value={price} onChange={priceHandler} min={0} max={200000} sx={{ color: '#3b82f6' }} />
                                    <div className="flex justify-between text-[9px] font-semibold text-slate-400">
                                        <span>₹{price[0]}</span>
                                        <span>₹{price[1]}</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[9px] font-semibold uppercase text-slate-500 tracking-widest">Disciplines</h4>
                                    {adminCategories?.map(cat => (
                                        <div key={cat._id} className="space-y-4">
                                            <div onClick={() => setSelectedMainCategory(selectedMainCategory === cat._id ? "" : cat._id)} className={`p-3 rounded-xl border ${selectedMainCategory === cat._id ? 'border-blue-500 bg-blue-500/10' : 'border-white/5'} flex justify-between items-center`}>
                                                <span className="text-[10px] font-semibold text-white uppercase tracking-widest">{cat.name}</span>
                                                <ExpandMoreIcon sx={{ fontSize: 18 }} className={`text-slate-500 transition-transform ${selectedMainCategory === cat._id ? 'rotate-180' : ''}`} />
                                            </div>
                                            {selectedMainCategory === cat._id && (
                                                <div className="grid grid-cols-1 gap-2 pl-3 animate-fade-in">
                                                    {groupedSubCategories[cat._id]?.map(sub => (
                                                        <div key={sub._id} onClick={() => setCategory(sub.name)} className={`p-2.5 rounded-lg text-[9px] font-semibold uppercase tracking-widest border ${category === sub.name ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' : 'border-white/5 text-slate-500'}`}>
                                                            {sub.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button onClick={() => setMobileFiltersOpen(false)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold uppercase tracking-widest text-[10px] shadow-xl shadow-blue-600/20 active:scale-95">Verify Application</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Products;
