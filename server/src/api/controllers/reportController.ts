import { Body, Post, Route, Tags, Get, Controller, Request, Query } from "tsoa";
import { IUser, IUserCreateProps } from "../models";
import { AuthService, IUserAuth , ReportService} from "../services";

export interface IOverviewReport {
    sales: number,
    orders: number,
    registers: number
}
export interface ISalesReport {
    time: string,
    sales: number,
    orders: number
}
 
export interface IOrderReport {
    completedOrders: number,
    canceledOrders: number
}
export interface IProductReport {
    id: number,
    name: string,
    brand: string,
    quantity: number,
    sales: number
}
export interface IProductReports {
    total: string,
    products: IProductReport[]
}
@Route("/report")
@Tags("Report Controller")
export class ReportController {
    private _reportService: any;

    constructor() {
        this._reportService = new ReportService();
    }
    /**
     * Get overview of revenue, orders and new register of current month
     */
    @Get("/overview")
    public async getOverviewReport(): Promise<IOverviewReport> {
        return this._reportService.getOverviewReport();
    }

     @Get("/sales")
    public async getSalesReport(@Query() time: string): Promise<ISalesReport[]> {
        return this._reportService.getSalesReport(time);
    }
    @Get("/orders")
    public async getOrderReport(@Query() time: string): Promise<IOrderReport> {
        return this._reportService.getOrderReport(time);
    }
 
    @Get("/products")
    public async getTopProductsReport(@Query() time: string, @Query() page: number, @Query() limit: number): Promise<IProductReports> {
        const query = { page,limit }
        return this._reportService.getTopProductsReport(time,query);
    }
}