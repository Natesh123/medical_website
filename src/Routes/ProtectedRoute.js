import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    const location = useLocation();
    
    // Construct the redirect URL query parameter
    const redirectPath = location.pathname + location.search;

    return (
        <>
            {loading === false && (
                isAuthenticated === false ? <Navigate to={`/login?redirect=${encodeURIComponent(redirectPath)}`} /> : isAdmin ? (user.permissions && user.permissions.length > 0 ? children : <Navigate to={`/login?redirect=${encodeURIComponent(redirectPath)}`} />) : children
            )}
        </>
    );
};

export default ProtectedRoute;
