import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto'
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
import { getAdminProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
import { getAdminSubCategories } from '../../actions/subCategoryAction';
import MetaData from '../Layouts/MetaData';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const MainData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.users);
    const { subCategories } = useSelector((state) => state.subCategories);

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
        dispatch(getAdminSubCategories());
    }, [dispatch]);

    const outOfStock = products?.filter(item => item.stock === 0).length || 0;
    const totalAmount = orders?.reduce((total, order) => total + order.totalPrice, 0) || 0;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date();

    const lineState = {
        labels: months,
        datasets: [
            {
                label: `${date.getFullYear()}`,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 8,
                pointBackgroundColor: '#00d4ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                borderWidth: 4,
                data: months.map((m, i) => orders?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear()).reduce((total, od) => total + od.totalPrice, 0)),
            },
        ],
    };

    const barState = {
        labels: subCategories?.map(s => s.name).slice(0, 6) || [],
        datasets: [
            {
                label: "Inventory Level",
                backgroundColor: [
                    '#00f2fe', // Bright Cyan
                    '#4facfe', // Bright Blue
                    '#7367f0', // Bright Indigo
                    '#ce9ffc', // Bright Purple
                    '#f97794', // Bright Pink
                    '#facd68'  // Bright Yellow
                ],
                hoverBackgroundColor: '#fff',
                borderRadius: 12,
                barThickness: 25,
                data: subCategories?.slice(0, 6).map((cat) => products?.filter((item) => item.category === cat.name).length) || [],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0f172a',
                titleColor: '#94a3b8',
                bodyColor: '#f8fafc',
                padding: 12,
                cornerRadius: 12,
                displayColors: false
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(22,163,74,0.05)', drawBorder: false },
                ticks: { color: '#16a34a', font: { size: 10, weight: '800' } }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#16a34a', font: { size: 10, weight: '800' } }
            }
        }
    };

    const StatCard = ({ title, value, icon, colorKey, trend, onClick }) => {
        const themeMap = {
            blue: {
                bg: 'bg-white',
                iconBg: 'bg-green-600',
                accent: 'text-green-600',
                label: 'text-green-900/40'
            },
            emerald: {
                bg: 'bg-white',
                iconBg: 'bg-emerald-500',
                accent: 'text-emerald-500',
                label: 'text-emerald-900/40'
            }
        };

        const theme = themeMap[colorKey] || themeMap.blue;

        return (
            <div onClick={onClick} className={`relative group bg-white/80 backdrop-blur-3xl rounded-[3rem] p-10 border border-blue-50 shadow-2xl shadow-blue-900/5 transition-all duration-700 hover:-translate-y-2 hover:shadow-blue-900/10 ${onClick ? 'cursor-pointer' : ''}`}>
                <div className="flex justify-between items-start mb-10">
                    <div className={`w-16 h-16 rounded-2xl ${theme.iconBg} flex items-center justify-center text-white shadow-2xl transition-all duration-700 group-hover:rotate-12`}>
                        {icon}
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest leading-none mb-2">Metric</span>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-blue-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></div>
                            <span className="text-[8px] font-semibold text-blue-950 uppercase">Active</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-1 rounded-full ${theme.iconBg}`}></div>
                        <h3 className="text-[10px] font-semibold text-green-900/40 uppercase tracking-widest">{title}</h3>
                    </div>
                    <div className="flex items-baseline gap-4">
                        <span className="text-3xl font-semibold text-blue-950 tracking-tighter">{value}</span>
                        {trend && (
                            <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-tighter">{trend}</span>
                        )}
                    </div>
                </div>

                <div className="mt-8 h-1.5 w-full bg-green-50 rounded-full overflow-hidden">
                    <div className={`h-full ${theme.iconBg} w-3/4 rounded-full`}></div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-12">
            <MetaData title="Dashboard | Shree Kishan Aayushi" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Total Revenue"
                    value={`₹${totalAmount.toLocaleString()}`}
                    icon={<AttachMoneyIcon sx={{ fontSize: 28 }} />}
                    colorKey="blue"
                    trend="+12.5%"
                />
                <StatCard
                    title="Total Orders"
                    value={orders?.length || 0}
                    icon={<LocalMallIcon sx={{ fontSize: 28 }} />}
                    colorKey="blue"
                    trend="+8.2%"
                />
                <StatCard
                    title="Total Products"
                    value={products?.length || 0}
                    icon={<Inventory2Icon sx={{ fontSize: 28 }} />}
                    colorKey="blue"
                    onClick={() => navigate('/admin/products')}
                />
                <StatCard
                    title="Total Users"
                    value={users?.length || 0}
                    icon={<PeopleIcon sx={{ fontSize: 28 }} />}
                    colorKey="blue"
                    trend="+3.1%"
                    onClick={() => navigate('/admin/users')}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-white/80 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-14 border border-blue-50 shadow-2xl shadow-blue-900/5 items-start">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h3 className="text-2xl font-semibold text-blue-950 uppercase tracking-tighter">Revenue Overview</h3>
                            <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-widest mt-1">Monthly Sales Trends</p>
                        </div>
                        <div className="px-6 py-3 bg-green-50 rounded-2xl border border-blue-100 text-[10px] font-semibold text-green-600 uppercase tracking-widest cursor-pointer hover:bg-white transition-all">
                            Export Data
                        </div>
                    </div>
                    <div className="h-[400px]">
                        <Line data={lineState} options={options} />
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-14 border border-blue-50 shadow-2xl shadow-blue-900/5 flex flex-col">
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold text-blue-950 uppercase tracking-tighter">Inventory Distribution</h3>
                        <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-widest mt-1">Stock by category</p>
                    </div>
                    <div className="h-[400px] flex-1">
                        <Bar data={barState} options={options} />
                    </div>

                    <div className="mt-10 pt-10 border-t border-blue-50 space-y-6">
                        <div className="flex justify-between items-center p-6 bg-red-50 rounded-3xl border border-red-100 group transition-all hover:bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div>
                                <span className="text-[10px] font-semibold text-blue-950 uppercase tracking-widest">Out of Stock</span>
                            </div>
                            <span className="px-5 py-2 bg-red-500 text-white text-[11px] font-semibold rounded-xl shadow-xl shadow-red-500/20">{outOfStock}</span>
                        </div>
                        <div className="flex justify-between items-center p-6 bg-emerald-50 rounded-3xl border border-emerald-100 group transition-all hover:bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                                <span className="text-[10px] font-semibold text-blue-950 uppercase tracking-widest">Active Categories</span>
                            </div>
                            <span className="px-5 py-2 bg-emerald-500 text-white text-[11px] font-semibold rounded-xl shadow-xl shadow-emerald-500/20">{subCategories?.length || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainData;
