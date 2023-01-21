import { useState } from "react";

// MUI Components
import {
    Box,
    Typography,
    TextField,
    InputLabel,
    Select,
    Grid,
    MenuItem,
    Button,
    CircularProgress
} from "@mui/material";

// Components
import ImageSlider from './ImageSlider';
import Toast from "../ui/Toast";

// API
import { generateImages } from "../api/image";

// Constants
import { SEVERITY } from "../constants/constant";

// Helpers
import { formatImageList } from "../utils/helpers";

const GenerateImages = () => {
    const [formData, setFormData] = useState({
        imageDetail: "Water drops over sunset",
        imageCount: 1,
        imageSize: "small",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [loadingText, setLoadingText] = useState('');

    // Image options
    const imageCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const imageSizes = [
        {
            label: "Small",
            value: "small",
        },
        {
            label: "Medium",
            value: "medium",
        },
        {
            label: "Large",
            value: "large",
        },
    ];

    // Styles Object
    const styles = {
        textFieldStyle: { width: "100%", fontSize: "12px" },
        labelStyle: { marginBottom: 1, fontSize: 12 },
        selectStyle: { width: "100px", fontSize: 12 },
        selectMenuStyle: { fontSize: 12 },
        btnWrapperStyle: { marginTop: 20, textAlign: "end" },
        btnStyle: { textTransform: "capitalize" },
    };

    const fetchImages = () => {
        const data = {
            prompt: formData.imageDetail,
            n: formData.imageCount,
            size: formData.imageSize
        };

        setIsLoading(true);
        setImageList([]);
        setLoadingText('Loading images ...');

        generateImages(data)
            .then((response) => {
                const { data: { imageList, message } } = response;
                setMessage(message);
                setImageList(formatImageList(imageList, formData.imageSize));
                setSeverity(SEVERITY.SUCCESS);
                setLoadingText('');
            })
            .catch(() => {
                const errorMessage = 'Unable to generate desired image(s).';
                setImageList([]);
                setMessage(errorMessage);
                setSeverity(SEVERITY.ERROR);
                setLoadingText('No image found.');
            })
            .finally(() => {
                setIsLoading(false);
                openSnackbar();
            });
    };

    const openSnackbar = () => {
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{ width: { xs: "80%", lg: "50%" }, margin: "auto", marginTop: 2 }}
        >
            <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
                AI Image Generator
            </Typography>

            <div style={{ marginBottom: 20 }}>
                <TextField
                    autoFocus
                    sx={styles.textFieldStyle}
                    variant="standard"
                    label="Image detail"
                    value={formData.imageDetail}
                    onChange={(event) => setFormData({ ...formData, imageDetail: event.target.value })}
                />
            </div>

            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={12} md={6}>
                    <InputLabel sx={styles.labelStyle}>
                        Number of images to generate
                    </InputLabel>
                    <Select
                        sx={styles.selectStyle}
                        size="small"
                        value={formData.imageCount}
                        onChange={(event) =>
                            setFormData({ ...formData, imageCount: event.target.value })
                        }
                    >
                        {imageCounts.map((count) => (
                            <MenuItem sx={styles.selectMenuStyle} key={count} value={count}>
                                {count}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel sx={styles.labelStyle}>Image Size</InputLabel>
                    <Select
                        sx={styles.selectStyle}
                        size="small"
                        value={formData.imageSize}
                        onChange={(event) => setFormData({ ...formData, imageSize: event.target.value })}
                    >
                        {imageSizes.map((size) => (
                            <MenuItem
                                sx={styles.selectMenuStyle}
                                key={size.value}
                                value={size.value}
                            >
                                {size.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>

            <div style={styles.btnWrapperStyle}>
                <Button
                    variant="contained"
                    disableElevation
                    sx={styles.btnStyle}
                    onClick={fetchImages}
                    disabled={isLoading}
                >
                    {isLoading && <CircularProgress sx={{ color: 'grey.500', marginRight: 2 }} size={20} />}
                    {isLoading ? 'Generating' : 'Generate'} Images
                </Button>
            </div>

            <ImageSlider imageList={imageList} size={formData.imageSize} loadingText={loadingText} />

            <Toast open={open} message={message} severity={severity} closeSnackbar={closeSnackbar} />
        </Box>
    );
};

export default GenerateImages;
