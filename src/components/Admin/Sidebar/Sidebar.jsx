import { Link, useNavigate, useLocation } from 'react-router-dom';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LogoutIcon from '@mui/icons-material/Logout';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CategoryIcon from '@mui/icons-material/Category';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StoreIcon from '@mui/icons-material/Store';
import HistoryIcon from '@mui/icons-material/History';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import { logoutUser } from '../../../actions/userAction';
import Swal from 'sweetalert2';
import { useState } from 'react';
import logo from '../../../assets/logo.jpg';

const sections = [
    {
        title: "Platform",
        items: [
            {
                icon: <EqualizerIcon />,
                label: "Dashboard",
                ref: "/admin/dashboard",
                activeTab: 0,
                permission: "dashboard_manage"
            }
        ]
    },
    {
        title: "Management",
        items: [
            {
                icon: <CategoryIcon />,
                label: "Categories",
                activeTab: 1,
                isDropdown: true,
                permission: "categories_manage",
                subItems: [
                    { label: "Category List", ref: "/admin/categories" },
                    { label: "Sub Category List", ref: "/admin/subcategories" }
                ]
            },
            {
                icon: <InventoryIcon />,
                label: "Products",
                ref: "/admin/products",
                activeTab: 3,
                permission: "products_manage"
            },
            {
                icon: <ShoppingBagIcon />,
                label: "Orders",
                ref: "/admin/orders",
                activeTab: 2,
                permission: "orders_manage"
            },
            {
                icon: <AccountBalanceIcon />,
                label: "GST",
                ref: "/admin/gst",
                activeTab: 10,
                permission: "gst_manage"
            },
            {
                icon: <VideoLibraryIcon />,
                label: "Videos",
                ref: "/admin/videos",
                activeTab: 9,
                permission: "videos_manage"
            },
            /*
            {
                icon: <StoreIcon />,
                label: "Branches",
                ref: "/admin/branches",
                activeTab: 11,
                permission: "branches_manage"
            },
            */
            /*
            {
                icon: <LocalOfferIcon />,
                label: "Offers",
                ref: "/admin/offers",
                activeTab: 13
            },
            */
            {
                icon: <ViewCarouselIcon />,
                label: "Banners",
                ref: "/admin/banners",
                activeTab: 14
            }
        ]
    },
    {
        title: "Administration",
        items: [
            {
                icon: <GroupIcon />,
                label: "Users",
                ref: "/admin/users",
                activeTab: 5,
                permission: "users_manage"
            },
            {
                icon: <BadgeIcon />,
                label: "Roles",
                ref: "/admin/roles",
                activeTab: 6,
                permission: "roles_manage"
            },
            {
                icon: <ReviewsIcon />,
                label: "Reviews",
                ref: "/admin/reviews",
                activeTab: 7,
                permission: "reviews_manage"
            },
            {
                icon: <ReviewsIcon />,
                label: "Contacts",
                ref: "/admin/contacts",
                activeTab: 8,
                permission: "contacts_manage"
            },
            {
                icon: <HistoryIcon />,
                label: "Activity Logs",
                ref: "/admin/logs",
                activeTab: 12,
                permission: "logs_manage"
            }
        ]
    }
];



const Sidebar = ({ activeTab, setToggleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
    const { user } = useSelector((state) => state.user);

    const isActive = (ref, itemActiveTab) => {
        return location.pathname === ref || (activeTab !== undefined && activeTab === itemActiveTab);
    };

    const hasPermission = (requiredPermission) => {
        if (!user) return false;
        if (user.permissions && user.permissions.includes('all')) return true;
        if (!requiredPermission) return true;
        return user.permissions && user.permissions.includes(requiredPermission);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        Swal.fire({
            title: "Access Terminated",
            text: "De-synchronizing from clinical registry...",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            background: '#ffffff',
            color: '#16a34a'
        });
        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header" style={{ justifyContent: 'flex-start', gap: '16px', padding: '0 24px' }}>
                <div className="relative">
                    <img src={logo} alt="Logo" className="w-[50px] h-[50px] object-cover rounded-xl shadow-sm" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-[15px] font-[950] leading-none tracking-tight text-slate-900 uppercase whitespace-nowrap">
                        Shree Kishan <span className="text-[#16a34a]">Aayushi</span>
                    </h2>
                    <div className="h-0.5 w-12 bg-green-600 my-1 rounded-full"></div>
                    <p className="text-[9px] font-semibold text-slate-400 tracking-[0.15em] uppercase">
                        Clinical Procurement
                    </p>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto pt-4 pb-20 scrollbar-hide">
                {sections.map((section, sIndex) => (
                    <div key={sIndex} className="animate-fade-in-up">
                        <div className="section-header">
                            {section.title}
                        </div>
                        <div className="space-y-1">
                            {section.items.map((item, iIndex) => {
                                const { icon, label, ref, activeTab: itemActiveTab, isDropdown, subItems, permission } = item;
                                
                                if (!hasPermission(permission)) return null;

                                const active = isActive(ref, itemActiveTab);
                                const isCategoriesOpen = location.pathname.includes('/admin/categories') || location.pathname.includes('/admin/subcategories');

                                if (isDropdown) {
                                    return (
                                        <div key={iIndex} className="sidebar-item-container">
                                            <button
                                                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                                                className={`sidebar-link w-full ${isCategoriesOpen ? 'sidebar-link-active' : ''}`}
                                            >
                                                <span className="sidebar-icon">{icon}</span>
                                                <span className="sidebar-label flex-1 text-left uppercase">{label}</span>
                                                <span className={`dropdown-chevron ${categoriesDropdownOpen ? 'rotate-180' : ''}`}>
                                                    <ExpandMoreIcon fontSize="inherit" />
                                                </span>
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${categoriesDropdownOpen ? 'max-h-60 mt-2' : 'max-h-0'}`}
                                            >
                                                {subItems.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subIndex}
                                                        to={subItem.ref}
                                                        onClick={() => setToggleSidebar && setToggleSidebar(false)}
                                                        className={`sub-item-link ${location.pathname === subItem.ref ? 'sub-item-active' : ''}`}
                                                    >
                                                        <span className="sidebar-label uppercase italic">{subItem.label}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={iIndex} className="sidebar-item-container">
                                        <Link
                                            to={ref}
                                            onClick={() => setToggleSidebar && setToggleSidebar(false)}
                                            className={`sidebar-link ${active ? 'sidebar-link-active' : ''}`}
                                        >
                                            <span className="sidebar-icon">{icon}</span>
                                            <span className="sidebar-label uppercase tracking-tighter">{label}</span>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="mt-6 border-t border-blue-50 pt-6">
                    <div className="section-header">Protocol</div>
                    <div className="sidebar-item-container">
                        <button onClick={handleLogout} className="sidebar-link sidebar-button-logout w-full">
                            <span className="sidebar-icon"><LogoutIcon /></span>
                            <span className="sidebar-label uppercase">Log Out</span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="profile-card group">
                <div className="avatar-wrapper">
                    <Avatar
                        src={user?.avatar?.url}
                        sx={{ width: 44, height: 44, border: '3px solid #fff', boxShadow: '0 8px 16px rgba(22,163,74,0.1)' }}
                    >
                        {user?.name?.charAt(0)}
                    </Avatar>
                </div>
                <div className="profile-info">
                    <h4 className="profile-name line-clamp-1">{user?.name}</h4>
                    <p className="profile-role">{user?.role === 'admin' ? 'Chief Medical Admin' : 'Clinic Manager'}</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;