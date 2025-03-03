import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GetDepartmentGrid from "./DepartmentGrid";
import Employee from "./types";
import { getEmployees } from "./server/EmployeeService";
import {
  Card,
  CardContent,
  Grid2,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
var advancedFormat = require("dayjs/plugin/advancedFormat");

dayjs.extend(advancedFormat);

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [departmentGrids, setDepartmentGrids] = useState<React.ReactNode[]>([]);

  const srRef = useRef<HTMLInputElement>(null);

  const searchFieldOnChange = () => {
    const searchText = srRef.current?.value.toLowerCase() || "";

    if (!searchText) {
      retrieveEmployeesByDepartment();
      return;
    }

    const filteredEmployees = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchText) ||
        employee.lastName.toLowerCase().includes(searchText) ||
        employee.department.toLowerCase().includes(searchText) ||
        employee.status.toLowerCase() === searchText ||
        employee.quote.toLowerCase().includes(searchText) ||
        dayjs(employee.dateStarted)
          .format("MMM Do, YYYY")
          .toLowerCase()
          .includes(searchText)
    );

    const filteredDepartments: string[] = Array.from(
      new Set(filteredEmployees.map((emp) => emp.department))
    );

    const grids = filteredDepartments.map((department) => (
      <GetDepartmentGrid
        key={department}
        employees={filteredEmployees.filter(
          (emp) => emp.department === department
        )}
        department={department}
        routeToEdit={routeToEdit}
      />
    ));

    setDepartmentGrids(grids);
  };

  const routeToEdit = (id: string) => {
    console.log("Employee ID passed to routeToEdit: " + id);
    navigate("/edit", { state: { id } });
  };

  useEffect(() => {
    const fetchEmployeesData = async () => {
      try {
        const data: Employee[] = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeesData();
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      retrieveEmployeesByDepartment();
    }
  }, [employees]);

  const retrieveEmployeesByDepartment = () => {
    const departments: string[] = Array.from(
      new Set(employees.map((employee) => employee.department))
    );

    const grids = departments.map((department) => (
      <GetDepartmentGrid
        key={department}
        employees={employees.filter((emp) => emp.department === department)}
        department={department}
        routeToEdit={routeToEdit}
      />
    ));

    setDepartmentGrids(grids);
  };

  if (loading) return <div>Loading...</div>;

  const inputProps = { style: { fontSize: 13 } };

  return (
    <div>
      <Grid2 container mt="20px">
        {/* First Name */}
        <Grid2 size={5} />
        <Grid2 size={2} alignContent="center">
          <Typography
            align="right"
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              pr: 2,
            }}
          >
            Search
          </Typography>
        </Grid2>
        <Grid2 size={4.7}>
          <Tooltip
            title="Search by: Name, Start Date, Quote, Status, Department"
            arrow
          >
            <TextField
              id="search"
              variant="outlined"
              type="search"
              onChange={searchFieldOnChange}
              fullWidth
              size="small"
              inputProps={inputProps}
              inputRef={srRef}
              sx={{
                bgcolor: "#fff",
              }}
            />
          </Tooltip>
        </Grid2>
      </Grid2>
      <div>{departmentGrids}</div>
    </div>
  );
};

export default EmployeeList;
