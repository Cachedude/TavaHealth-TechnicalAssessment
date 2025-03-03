import axios, { AxiosResponse } from "axios";
import Employee from "../types";

const BASE_URL = "https://672bba501600dda5a9f62663.mockapi.io/api";

// Get all employees
export const getEmployees = async (): Promise<Employee[]> => {
  const response: AxiosResponse<Employee[]> = await axios.get(
    `${BASE_URL}/employees`
  );
  return response.data;
};

// Get a specific employee by ID
export const getEmployee = async (id: number): Promise<Employee> => {
  const response: AxiosResponse<Employee> = await axios.get(
    `${BASE_URL}/employees/${id}`
  );
  return response.data;
};

// Gets a Distinct list of all entered Departments
export const getDepartments = async (): Promise<string[]> => {
  try {
    const employees = await getEmployees();
    const departments = new Set(
      employees.map((employee) => employee.department)
    );
    return Array.from(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw new Error("Failed to fetch departments");
  }
};

export const createEmployee = async (
  employee: Omit<Employee, "id">
): Promise<Employee> => {
  const response: AxiosResponse<Employee> = await axios.post(
    `${BASE_URL}/employees`,
    employee
  );
  return response.data;
};

export const updateEmployee = async (
  id: number,
  employee: Partial<Employee>
): Promise<Employee> => {
  const response: AxiosResponse<Employee> = await axios.put(
    `${BASE_URL}/employees/${id}`,
    employee
  );
  return response.data;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/employees/${id}`);
};
