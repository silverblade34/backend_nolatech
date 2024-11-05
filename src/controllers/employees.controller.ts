import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import Employee from "../models/employee.model";
import { insertEmployee } from "../services/employees.service";
import { CreateEmployeeDto } from "../dtos/create-employee.dto";
import { plainToInstance } from "class-transformer";

const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (e) {
    handleHttp(res, "ERROR_GET_EMPLOYEES");
  }
};

const getEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee)
      return res.status(404).json({ message: "Empleado no encontrado" });
    res.status(200).json(employee);
  } catch (e) {
    console.log("--------------------------------");
    console.log(e);
    handleHttp(res, "ERROR_GET_EMPLOYEE");
  }
};

const createEmployee = async (req: Request, res: Response) => {
  try {
    const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
    const response = await insertEmployee(employeeDto);
    res.status(201).json(response);
  } catch (e) {
    console.log("--------------------------------");
    console.log(e);
    handleHttp(res, "ERROR_CREATE_EMPLOYEE");
  }
};

const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEmployee)
      return res.status(404).json({ message: "Empleado no encontrado" });
    res.status(200).json(updatedEmployee);
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_EMPLOYEE");
  }
};

export { getEmployees, getEmployee, createEmployee, updateEmployee };
