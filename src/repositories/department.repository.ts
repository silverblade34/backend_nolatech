import { Department } from "../interfaces/department.interface";
import DepartmentModel, { IDepartment } from "../models/department.model";

export class DepartmentRepository {
  async create(data: Department): Promise<IDepartment> {
    const department = new DepartmentModel(data);
    return await department.save();
  }

  async findAll(): Promise<IDepartment[]> {
    return DepartmentModel.find();
  }

  async findById(id: string): Promise<IDepartment | null> {
    return DepartmentModel.findById(id);
  }

  async findByName(name: string): Promise<IDepartment | null> {
    return DepartmentModel.findOne({ name });
  }

  async update(id: string, data: Department): Promise<IDepartment | null> {
    return DepartmentModel.findByIdAndUpdate(id, data, { new: true });
  }
}
