import { CircularProgress, Modal } from '@mui/material';
import { Box } from '@mui/system';
import { loadingSelector } from '../../../redux/app/slice';
import { useAppSelector } from '../../../redux/hooks';

export const Spinner = () => {
    const loading = useAppSelector(loadingSelector);

    return (
        <Modal open={loading} sx={{ outline: 0 }}>
        <Box
            sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            outline: 0,
            }}
        >
            <CircularProgress role="loadingSpinner" sx={{color: 'white'}}/>
        </Box>
        </Modal>
    );
}
