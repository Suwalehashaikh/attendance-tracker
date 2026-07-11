import {
  createEmployee,
  getEmployees,
} from "../services/employeeService.js";

export const addEmployee = async (req, res) => {
  try {
    const employee = await createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await getEmployees();

    res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};