import { Get, Query, Route, Security, Tags } from "tsoa";
import { UserRole } from "../models";
import { ReportService, IOrderReport, IOverviewReport, IProductReports, ISalesReport, IReportService  } from "../services";
import { Service } from "typedi";

@Service()
@Route("/report")
@Tags("Report Controller")
export class ReportController {
    private _reportService: IReportService;

    constructor(
        reportService: ReportService
    ) {
        this._reportService = reportService;
    }
    /**
     * Get overview of sales, orders and new register of current month
     */
    @Security("jwt", [UserRole.ADMIN])
    @Get("/overview")
    public async getOverviewReport(): Promise<IOverviewReport> {
        return this._reportService.getOverviewReport();
    }
      /**
     * Get sales and number of order reports for specific time
     * @param {string} time
     * @pattern time (^[\d]{4}$)|(^[\d]{4}-([0][1-9]|[1][0-2])|(^week$)|(^today$)) Time query is invalid
     */
    @Security("jwt", [UserRole.ADMIN])
     @Get("/sales")
    public async getSalesReport(@Query() time: string): Promise<ISalesReport[]> {
        return this._reportService.getSalesReport(time);
    }
      /**
     * Get the number of completed orders and canceled order
     * @param {string} time
     * @pattern time (^[\d]{4}$)|(^[\d]{4}-([0][1-9]|[1][0-2])|(^week$)) Time query is invalid
     */
    @Security("jwt", [UserRole.ADMIN])
    @Get("/orders")
    public async getOrderReport(@Query() time: string): Promise<IOrderReport> {
        return this._reportService.getOrderReport(time);
    }
      /**
     * Get list of products in descending  sales
     * @param {string} time
     * @pattern time (^[\d]{4}$)|(^[\d]{4}-([0][1-9]|[1][0-2])|(^week$)) Time query is invalid
     * @param {number} limit
     * @param {number} page
     * @isInt limit Limit must be an integer
     * @minimum limit 1 Limit must be at least 1
     * @isInt page Page must be an integer
     * @minimum page 1 Page must be at least 1
     */
    @Security("jwt", [UserRole.ADMIN])
    @Get("/products")
    public async getTopProductsReport(@Query() time: string, @Query() page: number, @Query() limit: number): Promise<IProductReports> {
        const query = { page: page || 1,limit: limit || 5}
        return this._reportService.getTopProductsReport(time,query);
    }
}