import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Avatar,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
var advancedFormat = require("dayjs/plugin/advancedFormat");
import Employee from "./types";

dayjs.extend(advancedFormat);

const columns: GridColDef[] = [
  { field: "id" },
  {
    field: "iconFullName",
    headerName: "Name",
    flex: 1.2,
    minWidth: 250,
    renderCell: (params) => {
      return (
        <CardHeader
          avatar={
            <Avatar
              src={params.value.avatarURL}
              sx={{ width: 30, height: 30 }}
            />
          }
          title={
            <Typography variant="body1" sx={{ fontSize: 13, color: "#263A92" }}>
              {params.value.fullName}
            </Typography>
          }
        />
      );
    },
  },
  {
    field: "startDate",
    headerName: "Start Date",
    flex: 0.7,
    minWidth: 150,
    cellClassName: "cell-font-size",
    valueFormatter: (value) => dayjs(value).format("MMM Do, YYYY"),
  },
  {
    field: "quote",
    flex: 3,
    headerName: "Quote",
    cellClassName: "cell-font-size",
  },
  {
    field: "employeeStatus",
    headerName: "Status",
    flex: 1.4,
    minWidth: 150,
    headerClassName: "dataGridViewColumnHead",
    cellClassName: "cell-font-size",
    renderCell: (params) => {
      return (
        <Chip
          label={params.value}
          size="small"
          color={params.value == "active" ? "primary" : "secondary"}
          sx={{ borderRadius: 1, color: "#fff" }}
        />
      );
    },
  },
];

interface DepartmentGridProps {
  employees: Employee[];
  department: string;
  routeToEdit: (id: string) => void;
}

function GetDepartmentGrid({
  employees,
  department,
  routeToEdit,
}: DepartmentGridProps) {
  const employeeList = employees
    ?.filter((employee) => employee.department === department)
    .map((employee) => ({
      id: employee.id,
      iconFullName: {
        avatarURL: employee.avatarUrl,
        fullName: `${employee.firstName} ${employee.lastName}`,
      },
      startDate: employee.dateStarted,
      quote: employee.quote,
      employeeStatus: employee.status,
    }));

  const handleRowClick = (params: GridRowParams) => {
    routeToEdit(params.id.toString());
  };

  return (
    <Card key={department} variant="outlined" className="departmentCard">
      <CardContent>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", fontSize: 18, color: "#374343" }}
        >
          {department}
        </Typography>
        <DataGrid
          className="dataGrid"
          rows={employeeList}
          onRowClick={handleRowClick}
          columns={columns}
          columnVisibilityModel={{
            id: false,
          }}
          disableRowSelectionOnClick
          hideFooter
          disableColumnSelector
          rowHeight={60}
          autosizeOptions={{
            columns: ["quote"],
            includeOutliers: true,
            includeHeaders: false,
            expand: true,
          }}
          sx={{
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "&.MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#FEFF9E",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              color: "#6C757D",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default GetDepartmentGrid;
