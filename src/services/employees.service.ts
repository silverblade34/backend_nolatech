import { CreateEmployeeDto } from "../dtos/create-employee.dto";
import EmployeeModel, { IEmployee } from "../models/employee.model";

const insertEmployee = async (createEmployeeDto: CreateEmployeeDto) => {
  const findEmployee = await EmployeeModel.findOne({
    email: createEmployeeDto.email,
  });
  if (findEmployee) {
    throw new Error("El correo ya se encuentra registrado");
  }
  const responseInsert = await EmployeeModel.create(createEmployeeDto);
  return responseInsert;
};

const getEmployees = async () => {
  const responseItem = await EmployeeModel.find({});
  return responseItem;
};

const getEmployee = async (id: string) => {
  const responseItem = await EmployeeModel.findOne({ _id: id });
  return responseItem;
};

const updateEmployees = async (id: string, data: IEmployee) => {
  const responseItem = await EmployeeModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return responseItem;
};

const deleteEmployees = async (id: string) => {
  const responseItem = await EmployeeModel.deleteOne({ _id: id });
  return responseItem;
};

export {
  insertEmployee,
  getEmployees,
  getEmployee,
  updateEmployees,
  deleteEmployees,
};
