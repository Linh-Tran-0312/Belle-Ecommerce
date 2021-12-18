import { ProductRepository, UserRepository, OrderRepository } from "../repositories"
import { IOverviewReport, ISaleOrderReport, IReportDetail, IProductReport } from "../controllers/reportController";
import {periodCal, Period, getDay, daysInCurrentMonth, getMonth } from "../helpers/timeHandler";
import { Status, IOrder } from "../models";
import { MoreThan, In } from "typeorm";
import { getDefaultSettings } from "http2";


export class ReportService {
    private productRepo: ProductRepository;
    private userRepo: UserRepository;
    private orderRepo: OrderRepository;

    constructor() {
        this.userRepo = new UserRepository();
        this.orderRepo = new OrderRepository();
        this.productRepo = new ProductRepository();
    }

    public async getOverviewReport(): Promise<IOverviewReport> {
        const result: IOverviewReport = {
            sales: 0,
            orders: 0,
            registers: 0,
        };
        const time = periodCal(Period.QUARTER);
        const sales: IOrder[] = await this.orderRepo.find({
            select: ["total", "status"],
            where: {
                status: In([Status.COMPLETED, Status.ORDERED, Status.DELIVERY]),
                orderAt: MoreThan(time.start)
            }

        });

        result.sales = sales.reduce((preSum, order) => {
            if (order.status === Status.COMPLETED) {
                return preSum + order.total!
            }
            return preSum;
        }, 0);
        result.orders = sales.length;

        const [users, userCount] = await this.userRepo.findAndCount({
            select: ["id"],
            where: {
                createdAt: MoreThan(time.start)
            }
        });
        result.registers = userCount;

        return result;
    }
    public async getSaleAndOrderReport(time: Period): Promise<any> {

        const period = periodCal(time);
        let orders: any;
        let result: any;
        switch (time) {
            case Period.WEEK:   
            orders = await this.orderRepo.getOrderByDate("day", period.start);
             
            result = Array(7).fill({
                time: "",
                sales: 0,
                orders: 0
               }).map((item,index) => ({...item, time : getDay(index)}))
            orders.forEach(o => {
                result[o.date.getDay()].sales = o.sales;
                result[o.date.getDay()].orders = o.orders;
            });
            result.push(result[0]);
            result.shift();
                break;
            case Period.MONTH:
            orders = await this.orderRepo.getOrderByDate("day", period.start);
            result = Array(daysInCurrentMonth()).fill({
                time: "",
                sales: 0,
                orders: 0
               }).map((item,index) => ({...item, time : index + 1}));
            orders.forEach(o => {
                result[o.date.getDate() - 1].sales = o.sales;
                result[o.date.getDate() - 1].orders = o.orders;
            });
                break;
            case Period.QUARTER:
            orders = await this.orderRepo.getOrderByDate("day", period.start);
                break;
            case Period.YEAR:
            orders = await this.orderRepo.getOrderByDate("month", period.start);
            result = Array(12).fill({
                time: "",
                sales: 0,
                orders: 0
               }).map((item,index) => ({...item, time : getMonth(index)}));
            orders.forEach(o => {
                result[o.date.getMonth()].sales = o.sales;
                result[o.date.getMonth()].orders = o.orders;
            });
                break;
            default:
                break;
        }  
        console.log(result)
        return result
    }

}