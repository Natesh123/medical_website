import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../actions/orderAction';
import Loader from '../Layouts/Loader';
import { useSnackbar } from 'notistack';
import OrderItem from './OrderItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import MetaData from '../Layouts/MetaData';

const orderStatus = ["Processing", "Shipped", "Delivered"];
const dt = new Date();
const ordertime = [dt.getMonth(), dt.getFullYear() - 1, dt.getFullYear() - 2];

const MyOrders = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, error, orders } = useSelector((state) => state.myOrders);

    const [status, setStatus] = useState("");
    const [orderTime, setOrderTime] = useState(0);
    const [search, setSearch] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        if (orders) {
            setFilteredOrders(orders);
        }
    }, [orders]);


    useEffect(() => {
        setSearch("");
        // console.log(status);
        // console.log(typeof orderTime);
        // console.log(orderTime);

        if (!status && +orderTime === 0) {
            setFilteredOrders(orders);
            return;
        }

        if (status && orderTime) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) => order.orderStatus === status &&
                    new Date(order.createdAt).getMonth() === +orderTime
                );
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) => order.orderStatus === status &&
                    new Date(order.createdAt).getFullYear() === +orderTime
                );
                setFilteredOrders(filteredArr);
            }
        } else if (!status) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getMonth() === +orderTime
                );
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getFullYear() === +orderTime
                );
                setFilteredOrders(filteredArr);
            }
        } else {
            const filteredArr = orders.filter((order) => order.orderStatus === status);
            setFilteredOrders(filteredArr);
        }
        // eslint-disable-next-line
    }, [status, orderTime]);

    // Real-time search filter - filters as user types
    useEffect(() => {
        if (!orders || orders.length === 0) {
            return;
        }

        if (!search.trim()) {
            // If search is empty, apply status/time filters
            if (!status && +orderTime === 0) {
                setFilteredOrders(orders);
            } else {
                // Reapply the status/time filters
                if (status && orderTime) {
                    if (+orderTime === dt.getMonth()) {
                        const filteredArr = orders.filter((order) => order.orderStatus === status &&
                            new Date(order.createdAt).getMonth() === +orderTime
                        );
                        setFilteredOrders(filteredArr);
                    } else {
                        const filteredArr = orders.filter((order) => order.orderStatus === status &&
                            new Date(order.createdAt).getFullYear() === +orderTime
                        );
                        setFilteredOrders(filteredArr);
                    }
                } else if (!status) {
                    if (+orderTime === dt.getMonth()) {
                        const filteredArr = orders.filter((order) =>
                            new Date(order.createdAt).getMonth() === +orderTime
                        );
                        setFilteredOrders(filteredArr);
                    } else {
                        const filteredArr = orders.filter((order) =>
                            new Date(order.createdAt).getFullYear() === +orderTime
                        );
                        setFilteredOrders(filteredArr);
                    }
                } else {
                    const filteredArr = orders.filter((order) => order.orderStatus === status);
                    setFilteredOrders(filteredArr);
                }
            }
            return;
        }

        // Filter orders based on search term
        const arr = orders.map((el) => ({
            ...el,
            orderItems: el.orderItems.filter((order) =>
                order.name.toLowerCase().includes(search.toLowerCase()))
        })).filter(order => order.orderItems.length > 0);
        setFilteredOrders(arr);
        // eslint-disable-next-line
    }, [search, orders]);

    const searchOrders = (e) => {
        e.preventDefault();
        if (!search.trim()) {
            enqueueSnackbar("Empty Input", { variant: "warning" });
            return;
        }
        const arr = orders.map((el) => ({
            ...el,
            orderItems: el.orderItems.filter((order) =>
                order.name.toLowerCase().includes(search.toLowerCase()))
        })).filter(order => order.orderItems.length > 0); // Filter out orders with no matching items
        setFilteredOrders(arr);
    }

    const clearFilters = () => {
        setStatus("");
        setOrderTime(0);
    }

    return (
        <>
            <MetaData title="Deployment Archive | Shree Kishan Aayushi" />

            <main className="min-h-screen bg-slate-50 pt-36 lg:pt-40 pb-20 relative overflow-hidden">
                {/* Premium Medical Mesh Background */}
                <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
                    {loading ? <Loader /> : (
                        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
                            {/* Filter sidebar content follows... */}

                            {/* Professional Filter Sidebar */}
                            <aside className="w-full lg:w-[300px] animate-fade-in-left mt-6 lg:mt-0 shrink-0">
                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden sticky top-32">
                                    <div className="p-8 bg-gradient-to-r from-[#064e3b] to-[#043326] flex justify-between items-center">
                                        <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-3">
                                            My Orders
                                        </h2>
                                        <button onClick={clearFilters} className="text-[9px] font-semibold text-emerald-100/70 uppercase tracking-widest hover:text-[#f97316] transition-colors">
                                            Reset Filters
                                        </button>
                                    </div>

                                    <div className="p-8 space-y-10">
                                        <div className="space-y-6">
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Order Status</p>
                                            <RadioGroup value={status} onChange={(e) => setStatus(e.target.value)} className="space-y-3">
                                                {orderStatus.map((el, i) => (
                                                    <div key={i} className={`flex items-center px-4 py-3 rounded-2xl border transition-all duration-300 ${status === el ? 'bg-emerald-50/50 border-emerald-200' : 'bg-transparent border-transparent hover:bg-gray-50'}`}>
                                                        <FormControlLabel
                                                            value={el}
                                                            control={<Radio size="small" sx={{ color: 'rgba(6,78,59,0.3)', '&.Mui-checked': { color: '#064e3b' } }} />}
                                                            label={<span className="text-xs font-semibold text-gray-700 uppercase tracking-wide ml-2">{el}</span>}
                                                            sx={{ margin: 0, width: '100%' }}
                                                        />
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* Orders Feed */}
                            <div className="flex-1 w-full space-y-8 animate-fade-in-right min-w-0">
                                {/* Medical Search Bar */}
                                <form onSubmit={searchOrders} className="relative group">
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="search"
                                        placeholder="Search your orders..."
                                        className="w-full bg-white rounded-full px-8 py-5 text-sm font-semibold text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 border border-gray-200 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.05)] focus:border-[#064e3b] focus:shadow-[0_8px_30px_-15px_rgba(6,78,59,0.15)]"
                                    />
                                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#f97316] text-white p-3 rounded-full shadow-lg hover:bg-[#ea580c] transition-all active:scale-95">
                                        <SearchIcon />
                                    </button>
                                </form>

                                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-6">
                                    {filteredOrders.length === 0 ? (
                                        <div className="col-span-full bg-white/40 backdrop-blur-3xl rounded-[3rem] py-28 px-8 flex flex-col items-center text-center border border-white/60 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
                                            
                                            {/* Advanced Glowing Backdrops */}
                                            <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none"></div>
                                            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-[100px] pointer-events-none"></div>

                                            {/* Stacked Glassmorphic Icon Composition */}
                                            <div className="relative mb-14 mt-4 flex justify-center items-center group">
                                                
                                                {/* Ambient Center Glow */}
                                                <div className="absolute inset-0 bg-emerald-500 blur-[60px] opacity-20 rounded-full w-40 h-40 mx-auto transition-opacity duration-700 group-hover:opacity-40"></div>
                                                
                                                {/* Stacked Cards (Receipts/Orders Motif) */}
                                                <div className="absolute -rotate-12 w-28 h-36 bg-white border border-gray-100 rounded-2xl shadow-sm opacity-60 translate-x-6 translate-y-2 transition-transform duration-700 group-hover:-rotate-[15deg] group-hover:translate-x-8"></div>
                                                <div className="absolute rotate-12 w-28 h-36 bg-white border border-gray-100 rounded-2xl shadow-sm opacity-60 -translate-x-6 translate-y-2 transition-transform duration-700 group-hover:rotate-[15deg] group-hover:-translate-x-8"></div>
                                                
                                                {/* Main Glass Icon Container */}
                                                <div className="relative w-36 h-36 bg-white/80 backdrop-blur-2xl border border-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(6,78,59,0.15)] flex items-center justify-center z-10 overflow-hidden transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2">
                                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/80 to-transparent"></div>
                                                    <SearchOffIcon sx={{ fontSize: 64, color: '#064e3b' }} />
                                                    
                                                    {/* Inner floating spark */}
                                                    <div className="absolute top-6 right-6 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-75"></div>
                                                    <div className="absolute top-6 right-6 w-2 h-2 bg-orange-500 rounded-full"></div>
                                                </div>

                                            </div>
                                            
                                            {/* Gradient Typography */}
                                            <h3 className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#064e3b] via-[#043326] to-[#f97316] uppercase tracking-[0.2em] mb-5 relative z-10">
                                                No Orders Found
                                            </h3>
                                            
                                            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest max-w-lg leading-loose mb-12 relative z-10 px-4">
                                                Your order history is completely empty for the selected filters. Adjust your search parameters or clear all filters to view your comprehensive clinical procurement history.
                                            </p>

                                            {/* Advanced Animated Button */}
                                            <button 
                                                onClick={clearFilters} 
                                                className="group/btn relative z-10 px-10 py-4 bg-white border border-gray-200 text-gray-900 text-[11px] font-semibold uppercase tracking-[0.2em] rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#064e3b] hover:shadow-[0_20px_40px_-15px_rgba(6,78,59,0.3)] hover:-translate-y-1"
                                            >
                                                <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#064e3b] to-[#043326] transition-all duration-500 ease-out group-hover/btn:w-full"></div>
                                                <span className="relative z-10 flex items-center gap-4 group-hover/btn:text-white transition-colors duration-500">
                                                    <span>Clear All Filters</span>
                                                    <span className="w-2 h-2 rounded-full bg-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
                                                </span>
                                            </button>
                                        </div>
                                    ) : (
                                        filteredOrders.map((order) => {
                                            const { _id, orderStatus, orderItems, createdAt, deliveredAt } = order;
                                            return (
                                                orderItems.map((item, index) => (
                                                    <OrderItem {...item} key={index} orderId={_id} orderStatus={orderStatus} createdAt={createdAt} deliveredAt={deliveredAt} />
                                                ))
                                            )
                                        }).reverse()
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default MyOrders;
