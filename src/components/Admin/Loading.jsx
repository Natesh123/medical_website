import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            bgcolor: '#020617'
        }}>
            <CircularProgress sx={{ color: '#16a34a' }} size={60} thickness={5} />
        </Box>
    );
};

export default Loading;
