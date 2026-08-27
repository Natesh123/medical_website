import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { SnackbarProvider } from 'notistack';
import { UserProvider } from './context/UserContext';
import { replaceAlert } from './utils/sweetAlert';

// Custom Icons for Grand Toasts
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

// Replace all alert functions with SweetAlert
replaceAlert();

// Suppress harmless ResizeObserver errors from React Dev Overlay
window.addEventListener('error', e => {
    if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        e.stopImmediatePropagation();
        const overlay = document.getElementById('webpack-dev-server-client-overlay');
        if (overlay) overlay.style.display = 'none';
    }
});

const originalError = console.error;
console.error = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('ResizeObserver')) {
        return;
    }
    originalError.call(console, ...args);
};

// Grand Toast Configurations
const toastClasses = {
    variantSuccess: '!bg-white/95 !backdrop-blur-xl !text-slate-800 !border !border-slate-100 !border-l-[6px] !border-l-emerald-500 !shadow-[0_20px_50px_-10px_rgba(16,185,129,0.2)] !rounded-[1.25rem] !py-3 !px-4 !min-w-[340px] !font-bold !tracking-wide !items-center',
    variantError: '!bg-white/95 !backdrop-blur-xl !text-slate-800 !border !border-slate-100 !border-l-[6px] !border-l-red-500 !shadow-[0_20px_50px_-10px_rgba(239,68,68,0.2)] !rounded-[1.25rem] !py-3 !px-4 !min-w-[340px] !font-bold !tracking-wide !items-center',
    variantWarning: '!bg-white/95 !backdrop-blur-xl !text-slate-800 !border !border-slate-100 !border-l-[6px] !border-l-amber-500 !shadow-[0_20px_50px_-10px_rgba(245,158,11,0.2)] !rounded-[1.25rem] !py-3 !px-4 !min-w-[340px] !font-bold !tracking-wide !items-center',
    variantInfo: '!bg-white/95 !backdrop-blur-xl !text-slate-800 !border !border-slate-100 !border-l-[6px] !border-l-blue-500 !shadow-[0_20px_50px_-10px_rgba(59,130,246,0.2)] !rounded-[1.25rem] !py-3 !px-4 !min-w-[340px] !font-bold !tracking-wide !items-center',
};

const toastIcons = {
    success: (
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex flex-shrink-0 items-center justify-center text-emerald-600 mr-4 border border-emerald-100/50 shadow-inner group-hover:scale-110 transition-transform">
            <CheckCircleOutlineIcon fontSize="small" />
        </div>
    ),
    error: (
        <div className="w-10 h-10 rounded-xl bg-red-50 flex flex-shrink-0 items-center justify-center text-red-600 mr-4 border border-red-100/50 shadow-inner group-hover:scale-110 transition-transform">
            <ErrorOutlineIcon fontSize="small" />
        </div>
    ),
    warning: (
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex flex-shrink-0 items-center justify-center text-amber-600 mr-4 border border-amber-100/50 shadow-inner group-hover:scale-110 transition-transform">
            <WarningAmberOutlinedIcon fontSize="small" />
        </div>
    ),
    info: (
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex flex-shrink-0 items-center justify-center text-blue-600 mr-4 border border-blue-100/50 shadow-inner group-hover:scale-110 transition-transform">
            <InfoOutlinedIcon fontSize="small" />
        </div>
    )
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <SnackbarProvider
            maxSnack={3}           
            autoHideDuration={4000} 
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            classes={toastClasses}
            iconVariant={toastIcons}
        >
          <Router>
            <App />
          </Router>
        </SnackbarProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);