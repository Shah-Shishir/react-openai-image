import React from 'react';

// MUI Components
import { Snackbar, Slide } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const Toast = ({ open, message, severity, closeSnackbar }) => {
    const anchorOrigin = { vertical: 'top', horizontal: 'right' };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const transition = props => <Slide {...props} direction="down" />;

    return (
        <Snackbar
            open={open}
            anchorOrigin={anchorOrigin}
            autoHideDuration={2000}
            onClose={closeSnackbar}
            TransitionComponent={transition}>
            <Alert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;