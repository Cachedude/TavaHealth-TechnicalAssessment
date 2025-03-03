import {
  Button,
  Card as Box,
  CardContent,
  FormControl,
  Grid2,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Employee from "./types";
import {
  getDepartments,
  getEmployee,
  updateEmployee,
} from "./server/EmployeeService";

const EmployeeEdit = () => {
  const location = useLocation();
  const id = location.state?.id;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<string[]>([]);
  const [currDepartment, setCurrDepartment] = useState<string>("");

  const fnRef = useRef<HTMLInputElement>(null);
  const lnRef = useRef<HTMLInputElement>(null);
  const sdRef = useRef<HTMLInputElement>(null);
  const quRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Employee ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const employeeData = await getEmployee(id);
        setEmployee(employeeData);
        setCurrDepartment(employeeData.department);

        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
      } catch (error) {
        setError("Error fetching employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setCurrDepartment(event.target.value);
  };

  const saveEmployeeDetails = async () => {
    if (!employee || !employee.id) {
      setError("Employee data or Employee ID is missing.");
      return;
    }

    try {
      const employeeInput = {
        firstName: fnRef.current?.value || employee.firstName,
        lastName: lnRef.current?.value || employee.lastName,
        dateStarted: sdRef.current?.value || employee.dateStarted,
        department: currDepartment || employee.department,
        quote: quRef.current?.value || employee.quote,
        status: employee.status || "active",
        avatarUrl:
          employee.avatarUrl || "https://www.thispersondoesnotexist.com/",
      };

      await updateEmployee(employee.id, employeeInput);
      console.log("Employee Updated:", employeeInput);
    } catch (error) {
      setError("Error updating employee details.");
    }
  };

  const inputProps = { style: { fontSize: 13 } };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <FormControl size="small" fullWidth>
      <Typography
        sx={{
          fontSize: "20px",
          color: "#374343",
          fontWeight: 800,
          mt: "20px",
          ml: "20px",
        }}
      >
        Edit Employee
      </Typography>
      <Box
        sx={{ border: 0, boxShadow: 3, minWidth: 100, maxWidth: 500 }}
        className="departmentCard"
      >
        <CardContent>
          <Grid2 container spacing={0.5}>
            {/* First Name */}
            <Grid2 size={12}>
              <Typography sx={{ fontSize: "13px", color: "#6C757D" }}>
                First Name
              </Typography>
            </Grid2>
            <Grid2 size={12}>
              <TextField
                id="firstName"
                variant="outlined"
                fullWidth
                size="small"
                inputProps={inputProps}
                defaultValue={employee ? employee.firstName : ""}
                inputRef={fnRef}
              />
            </Grid2>
            {/* Last Name */}
            <Grid2 size={12}>
              <Typography sx={{ fontSize: "13px", color: "#6C757D" }}>
                Last Name
              </Typography>
            </Grid2>
            <Grid2 size={12}>
              <TextField
                id="lastName"
                variant="outlined"
                fullWidth
                size="small"
                inputProps={inputProps}
                defaultValue={employee ? employee.lastName : ""}
                inputRef={lnRef}
              />
            </Grid2>
            {/* Start Date */}
            <Grid2 size={12}>
              <Typography sx={{ fontSize: "13px", color: "#6C757D" }}>
                Start Date
              </Typography>
            </Grid2>
            <Grid2 size={12}>
              <TextField
                id="startDate"
                variant="outlined"
                fullWidth
                size="small"
                inputProps={inputProps}
                defaultValue={employee ? employee.dateStarted : ""}
                inputRef={sdRef}
              />
            </Grid2>
            {/* Department */}
            <Grid2 size={12}>
              <Typography sx={{ fontSize: "13px", color: "#6C757D" }}>
                Department
              </Typography>
            </Grid2>
            <Grid2 size={12}>
              <Select
                id="department"
                variant="outlined"
                fullWidth
                value={currDepartment}
                onChange={handleDepartmentChange}
                sx={{ fontSize: 13 }}
              >
                {departments.map((department) => (
                  <MenuItem
                    key={department}
                    value={department}
                    sx={{ fontSize: 13 }}
                  >
                    {department}
                  </MenuItem>
                ))}
              </Select>
            </Grid2>
            {/* Quote */}
            <Grid2 size={12}>
              <Typography sx={{ fontSize: "13px", color: "#6C757D" }}>
                Quote
              </Typography>
            </Grid2>
            <Grid2 size={12}>
              <TextField
                id="quote"
                variant="outlined"
                multiline
                fullWidth
                size="small"
                rows={4}
                inputProps={inputProps}
                defaultValue={employee ? employee.quote : ""}
                inputRef={quRef}
              />
            </Grid2>
            {/* Save Button */}
            <Grid2 size={2}>
              <Button
                variant="contained"
                onClick={saveEmployeeDetails}
                sx={{
                  fontSize: "12px",
                  backgroundColor: "#C71318",
                  color: "#fff",
                }}
              >
                Save
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Box>
    </FormControl>
  );
};

export default EmployeeEdit;
