import { Box, Typography, IconButton } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import ImageOverview from '../Image/ImageOverview';


type Props = {
    file: File,
    onRemove: (file: File) => void
}

const AttachmentBox = ({ file, onRemove } : Props) => {

    const isFileImage = () => {
        return true;
    }
    return (
        <>
            <Box
                sx={{ 
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: "10px",
                    marginBottom: "5px"
                }}
                p={4}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {
                        isFileImage() && (
                            <ImageOverview src={URL.createObjectURL(file)} width={80} height={60} />
                        )
                        }
                        <AttachFileIcon color="primary" />
                        <Typography color="primary">{file.name}</Typography>
                        <Typography fontWeight={600} sx={{ marginLeft: '30px' }}>
                            {(file.size / 1024).toFixed(2)}&nbsp;KB
                        </Typography>
                    </Box>
                    <IconButton onClick={(e) => onRemove(file)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>
        </>
        
    )
}

export default AttachmentBox