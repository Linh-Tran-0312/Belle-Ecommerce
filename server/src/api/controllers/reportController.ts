import { Body, Post, Route, Tags, Get, Controller, Request, Query } from "tsoa";
import { IUser, IUserCreateProps } from "../models";
import { AuthService, IUserAuth , ReportService} from "../services";

export interface IOverviewReport {
    sales: number,
    orders: number,
    registers: number
}
export interface IReportDetail {
    name: string,
    sales: number,
    orders: number
}
export interface ISaleOrderReport {
    data: Array<IReportDetail>
}
export interface IOrderStatus {
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

     @Get("/sales-orders")
    public async getSalesAndOrdersReport(@Query() time: string): Promise<any> {
        return this._reportService.getSaleAndOrderReport();
    }
/*
    @Get("/order-status")
    public async getOrderStatusReport(@Query() month: string): Promise<IOrderStatusReport> {

    }
    @Get("/top-products")
    public async getTopProductsReport(@Query() month: string): Promise<IProdutReport[]> {

    } */
}