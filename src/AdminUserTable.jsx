import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

import AdminUserTableRow from "./AdminUserTableRow";

const AdminUserTable = (props) => {
    const { users, userFns } = props
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            Id
                        </TableCell>
                        <TableCell align="left">
                            First name
                        </TableCell>
                        <TableCell align="left">
                            Last name
                        </TableCell>
                        <TableCell align="left">
                            Email
                        </TableCell>
                        <TableCell align="left">
                            Acct. State
                        </TableCell>
                        <TableCell align="center">
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((userData) => (
                        <AdminUserTableRow user={userData} fn={userFns} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminUserTable;

