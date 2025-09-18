'use client';

import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridToolbar,
} from '@mui/x-data-grid';

interface DataGridComponentProps<T extends { id: string }> {
  rows: T[];
  columns: GridColDef[];
  loading: boolean;
  /** Modelo de seleção de linhas (v6) */
  rowSelectionModel?: GridRowSelectionModel;
  /** Callback quando a seleção muda (v6) */
  onRowSelectionModelChange?: (selectionModel: GridRowSelectionModel) => void;
  /** Ativa checkboxes na primeira coluna */
  checkboxSelection?: boolean;
}

export default function DataGridComponent<T extends { id: string }>({
  rows,
  columns,
  loading,
  rowSelectionModel,
  onRowSelectionModelChange,
  checkboxSelection = false,
}: DataGridComponentProps<T>) {
  return (
    <Box sx={{ height: '70vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        checkboxSelection={checkboxSelection}
        /** ✅ Nova API de seleção do MUI v6 */
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={onRowSelectionModelChange}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
}
