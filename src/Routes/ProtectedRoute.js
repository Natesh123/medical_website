import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    return (
        <>
            {loading === false && (
                isAuthenticated === false ? <Navigate to="/login" /> : isAdmin ? (user.permissions && user.permissions.length > 0 ? children : <Navigate to="/login" />) : children
            )}
        </>
    );
};

export default ProtectedRoute;
