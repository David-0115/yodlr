import React, { useContext, useState } from "react";
import Alert from '@mui/material/Alert';
import AppContext from "./AppContext";
import { AlertTitle, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


/** 
 *  msg = {
 *    type: "success"  || "error" || "info" || "warning",
 *    text: "message text"
 *   }
*/

const UserAlert = () => {
    const { alertMsg, updateAlertMsg } = useContext(AppContext)
    const { type, text } = alertMsg

    if (open) {
        return (
            <Box sx={{ width: '100%' }}>
                <Alert
                    variant="filled"
                    severity={type}
                    action={<IconButton
                        color="inherit"
                        size="small"
                        onClick={() => { updateAlertMsg(null); }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                    }
                >
                    <AlertTitle>{type}</AlertTitle>
                    {text}
                </Alert>
            </Box >
        )
    }

}

export default UserAlert;

