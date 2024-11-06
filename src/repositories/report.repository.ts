import { Report } from '../interfaces/report.interface';
import { IReport } from '../models/report.model';
import ReportModel from '../models/report.model';

export class ReportRepository {
    async create(data: Report): Promise<IReport> {
        const report = new ReportModel(data);
        return await report.save();
    }

    async findById(reportId: string): Promise<IReport | null> {
        return await ReportModel.findById(reportId);
    }

    async findByEvaluationId(evaluationId: string): Promise<IReport[]> {
        return await ReportModel.find({ evaluationId });
    }

    async findReportsByEvaluationEmployeeAndEvaluator(evaluationId: string, employeeId: string, evaluatorId: string): Promise<IReport[]> {
        return await ReportModel.find({ evaluationId, employeeId, evaluatorId });
    }

    async findReportsByEmployee(employeeId: string): Promise<IReport[]> {
        return await ReportModel.find({ employeeId });
    }

    async findReportsByDepartment(departmentId: string): Promise<IReport[]> {
        return await ReportModel.find({ departmentId });
    }
}
