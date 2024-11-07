import { Report } from '../interfaces/report.interface';
import { IReport } from '../models/report.model';
import ReportModel from '../models/report.model';

export class ReportRepository {
    async create(data: Report): Promise<IReport> {
        const report = new ReportModel(data);
        return await report.save();
    }

    async findById(reportId: string): Promise<IReport | null> {
        return await ReportModel.findById(reportId)
            .populate("evaluationId", "period")
            .populate("evaluatorId", "name role")
            .populate("employeeId", "name role");
    }

    async findByEvaluationId(evaluationId: string): Promise<IReport[]> {
        return await ReportModel.find({ evaluationId });
    }

    async findReportsByEvaluationEmployee(evaluationId: string, employeeId: string): Promise<IReport[]> {
        return await ReportModel.find({ evaluationId, employeeId });
    }

    async findReportsByEvaluationEmployeeAndEvaluator(evaluationId: string, employeeId: string, evaluatorId: string): Promise<IReport | null> {
        const report = await ReportModel.findOne({ evaluationId, employeeId, evaluatorId });
        return report;
    }

    async findReportsByEmployee(employeeId: string): Promise<IReport[]> {
        return await ReportModel.find({ employeeId }).populate("employeeId", "name role")
            .populate("evaluatorId", "name role");
    }

    async findReportsByDepartment(departmentId: string): Promise<IReport[]> {
        return await ReportModel.find({ departmentId }).populate("evaluationId", "name role")
            .populate("evaluatorId", "name role");
    }
}
