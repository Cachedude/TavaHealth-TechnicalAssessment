interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  dateStarted: string;
  quote: string;
  status: "active" | "inactive";
  avatarUrl: string;
}

export default Employee;
