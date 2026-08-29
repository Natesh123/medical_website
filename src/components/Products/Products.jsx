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

    const displayProducts = searchTerm ? filteredProducts : products;

    const groupedProducts = displayProducts?.reduce((acc, product) => {
        const cat = product.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(product);
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



                    {/* Horizontal Filter Bar - Amazon Style */}
                    <div className="relative w-full bg-white shadow-sm border-y border-slate-200 mb-6 sticky top-20 z-40 animate-fade-in-down">
                        <div className="flex flex-wrap items-center gap-6 py-3 px-4">
                            <button 
                                onClick={clearFilters}
                                className="whitespace-nowrap font-bold text-[12px] text-slate-800 hover:text-[#d97706] tracking-wider uppercase flex-shrink-0 flex items-center gap-1 ml-2"
                            >
                                <span className="w-1.5 h-4 bg-[#d97706] inline-block rounded-sm"></span> All
                            </button>
                            
                            {adminCategories?.map((cat) => (
                                <div key={cat._id} className="relative">
                                    <button
                                        onClick={() => setSelectedMainCategory(selectedMainCategory === cat._id ? "" : cat._id)}
                                        className={`whitespace-nowrap font-bold text-[11px] uppercase tracking-wider transition-colors flex-shrink-0 flex items-center gap-1 ${
                                            selectedMainCategory === cat._id ? 'text-[#16a34a] border-b-2 border-[#16a34a] pb-1' : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        {cat.name}
                                        <ExpandMoreIcon sx={{ fontSize: 16 }} className={`transition-transform duration-300 ${selectedMainCategory === cat._id ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Standard Column Dropdown for Subcategories */}
                                    {selectedMainCategory === cat._id && (
                                        <div className="absolute top-full left-0 mt-3 w-48 bg-white shadow-2xl border border-slate-100 py-2 z-50 animate-fade-in rounded-xl">
                                            <div className="flex flex-col">
                                                {groupedSubCategories[cat._id]?.map((sub) => (
                                                    <button
                                                        key={sub._id}
                                                        onClick={() => {
                                                            setCategory(category === sub.name ? "" : sub.name);
                                                            setSelectedMainCategory(""); // Auto close on select
                                                        }}
                                                        className={`text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                                                            category === sub.name
                                                                ? 'bg-[#16a34a]/10 text-[#16a34a] border-l-2 border-[#16a34a]'
                                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-2 border-transparent'
                                                        }`}
                                                    >
                                                        {sub.name}
                                                    </button>
                                                ))}
                                                {(!groupedSubCategories[cat._id] || groupedSubCategories[cat._id].length === 0) && (
                                                    <span className="px-4 py-3 text-[9px] text-slate-400 font-bold uppercase tracking-widest">No Options</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="ml-auto flex items-center gap-3 pr-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:inline">Price:</span>
                                <select 
                                    className="text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 outline-none focus:border-[#16a34a]"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if(val === "all") setPrice([0, 200000]);
                                        else if(val === "under500") setPrice([0, 500]);
                                        else if(val === "500-1000") setPrice([500, 1000]);
                                        else if(val === "over1000") setPrice([1000, 200000]);
                                    }}
                                >
                                    <option value="all">Any Price</option>
                                    <option value="under500">Under ₹500</option>
                                    <option value="500-1000">₹500 - ₹1000</option>
                                    <option value="over1000">Over ₹1000</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* Products List Grid */}
                        <section className="w-full animate-fade-in-up">
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="card-premium h-96 animate-pulse opacity-50 bg-white/50"></div>
                                    ))}
                                </div>
                            ) : (filteredProducts.length > 0 ? filteredProducts : products)?.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 bg-white/50 backdrop-blur-3xl rounded-[2.5rem] border border-blue-100 shadow-2xl shadow-blue-900/5">
                                    <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center mb-8 border border-blue-100 animate-pulse">
                                        <SearchIcon sx={{ fontSize: 60, color: 'rgba(15,82,186,0.1)' }} />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-blue-950 uppercase tracking-tighter mb-4">No Diagnostics Matched</h2>
                                    <p className="text-blue-800/50 text-center max-w-sm font-semibold leading-relaxed px-6 uppercase tracking-widest text-[9px]">Your query yielded zero biological results. Please adjust parameters.</p>
                                    <button onClick={clearFilters} className="mt-10 px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold uppercase tracking-[0.2em] text-[9px] hover:bg-blue-800 transition-all shadow-2xl shadow-blue-600/30 active:scale-95">Re-Sync Filters</button>
                                </div>
                            ) : (
                                <div className="space-y-16 pb-16">
                                    {groupedProducts && Object.entries(groupedProducts).map(([catName, prods]) => (
                                        <div key={catName} className="flex flex-col gap-6 animate-fade-in-up">
                                            <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-3">
                                                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{catName}</h2>
                                                <span className="bg-[#d97706]/10 text-[#d97706] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{prods.length} Products</span>
                                            </div>
                                            <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory">
                                                {prods.map((product) => (
                                                    <div key={product._id} className="w-[280px] sm:w-[300px] flex-shrink-0 snap-start">
                                                        <Product {...product} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}


                        </section>
                    </div>
                </div>

            </main>
        </>
    );
};

export default Products;
