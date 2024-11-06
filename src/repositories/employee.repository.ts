import { Employee } from "../interfaces/employee.interface";
import EmployeeModel, { IEmployee } from "../models/employee.model";

export class EmployeeRepository {
  async findOneById(id: string): Promise<IEmployee | null> {
    return EmployeeModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<IEmployee | null> {
    return EmployeeModel.findOne({ email });
  }

  async findWithUser(id: string): Promise<IEmployee | null> {
    const employee = await EmployeeModel.findById(id)
      .populate("userId", "username")
      .populate("departmentId", "name")
      .exec();
  
    if (!employee) {
      throw new Error("Empleado no encontrado");
    }
  
    return employee;
  }
  

  async findAll(): Promise<IEmployee[]> {
    return EmployeeModel.find();
  }

  async create(data: Employee): Promise<IEmployee> {
    return EmployeeModel.create(data);
  }

  async update(id: string, data: Employee): Promise<IEmployee | null> {
    return EmployeeModel.findByIdAndUpdate(id, data, { new: true });
  }
}
