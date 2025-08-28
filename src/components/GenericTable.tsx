// src/components/GenericTable.tsx
"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


export interface ColumnDef<T> {
    header: string; 
    accessor: (item: T) => React.ReactNode;
}

interface GenericTableProps<T extends { id: string }> {
    data: T[];
    columns: ColumnDef<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (id: string) => void;
}

const GenericTable = <T extends { id: string }>({
    data,
    columns,
    onEdit,
    onDelete,
}: GenericTableProps<T>) => {
    return (
        <TableContainer component={Paper} sx={{ boxShadow: 1, borderRadius: 2 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        {columns.map((column) => (
                            <TableCell key={column.header}>{column.header}</TableCell>
                        ))}
                        {(onEdit || onDelete) && <TableCell align="right">Ações</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            {columns.map((column) => (
                                <TableCell key={column.header}>
                                    {column.accessor(item)}
                                </TableCell>
                            ))}
                            {(onEdit || onDelete) && (
                                <TableCell align="right">
                                    <Box>
                                        {onEdit && (
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() => onEdit(item)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                        {onDelete && (
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => onDelete(item.id)}
                                                sx={{ ml: 1 }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                    </Box>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GenericTable;
