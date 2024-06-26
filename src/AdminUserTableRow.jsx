import React, { useState } from "react";
import { TableCell, TableRow, Button, TextField, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const AdminUserTableRow = (props) => {
    const { user, fn } = props
    const [isEdit, setIsEdit] = useState(false);

    const INITIAL_STATE = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        fn.edit(user.id, formData)

    }

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }

    return (
        <TableRow>
            <TableCell>
                {user.id}
            </TableCell>
            <TableCell>
                {isEdit ?
                    <TextField sx={{ size: 'small' }}
                        id="underlined-firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    :
                    user.firstName
                }

            </TableCell>
            <TableCell>
                {isEdit ?
                    <TextField sx={{ size: 'small' }}
                        id="underlined-lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    :
                    user.lastName
                }
            </TableCell>
            <TableCell>
                {isEdit ?
                    <TextField sx={{ size: 'small' }}
                        id="underlined-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    :
                    user.email
                }
            </TableCell>
            <TableCell>
                {user.state}
            </TableCell>
            <TableCell
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly"
                }}
            >{isEdit ?
                <>
                    <Button onClick={handleSubmit} sx={{ color: "green", size: 'small' }}>
                        Save
                    </Button>
                    <Button onClick={toggleEdit} sx={{ color: "red", size: 'small' }}>
                        Cancel
                    </Button>
                </>
                :
                <>
                    <IconButton onClick={toggleEdit}><ModeEditIcon sx={{ color: 'green' }} /></IconButton>
                    {user.state === "pending" || user.state === "inactive" ?
                        <>
                            <Button onClick={() => fn.updateState(user.id)} sx={{ color: "green", size: "small" }}>Activate</Button>
                        </>
                        :
                        <>
                            <Button onClick={() => fn.updateState(user.id)} sx={{ color: "red", size: "small" }}>Deactivate</Button>
                        </>
                    }
                    <IconButton onClick={() => fn.delete(user.id)}><DeleteForeverIcon sx={{ color: 'red' }} /></IconButton>
                </>
                }

            </TableCell>
        </TableRow>
    )
}

export default AdminUserTableRow;