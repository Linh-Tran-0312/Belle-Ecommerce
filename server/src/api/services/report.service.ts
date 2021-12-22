import { ProductRepository, UserRepository, OrderRepository } from "../repositories"
import { IOverviewReport, ISalesReport, IOrderReport, IProductReports } from "../controllers/reportController";
import {periodCal, Period, getDay, daysInMonth, getMonth, regYearMonth,regYear, timeCal } from "../helpers/timeHandler";
import { Status, IOrder } from "../models";
import { MoreThan, In } from "typeorm";
import { getDefaultSettings } from "http2";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { HttpCode } from "../helpers/HttpCode";


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
    public async getSalesReport(time: string): Promise<ISalesReport> {

       
        let orders: any;
        let result: any;

        if(time === Period.WEEK) {
            const period = periodCal(time);
            orders = await this.orderRepo.getTotalSalesAndOrdersByTime("day", period.start);
             
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
        }
        else if(regYear.test(time)) {
            orders = await this.orderRepo.getTotalSalesAndOrdersByTime("month", new Date(time));
            result = Array(12).fill({
                time: "",
                sales: 0,
                orders: 0
               }).map((item,index) => ({...item, time : getMonth(index)}));
            orders.forEach(o => {
                result[o.date.getMonth()].sales = o.sales;
                result[o.date.getMonth()].orders = o.orders;
            });
        }
         else if(regYearMonth.test(time))
        {
            orders = await this.orderRepo.getTotalSalesAndOrdersByTime("day",  new Date(time));
            result = Array(daysInMonth(time)).fill({
                time: "",
                sales: 0,
                orders: 0
               }).map((item,index) => ({...item, time : index + 1}));
            orders.forEach(o => {
                result[o.date.getDate() - 1].sales = o.sales;
                result[o.date.getDate() - 1].orders = o.orders;
            });
        } else {
            throw new OperationalError(OperationalErrorMessage.INVALID_QUERY, HttpCode.BAD_REQUEST)
        }    

        return result
    }
    public async getOrderReport(timeStr: string): Promise<IOrderReport> {
        let orders: any;
        let result: IOrderReport = {
            completedOrders: 0,
            canceledOrders: 0
        };
        if(timeStr === Period.WEEK || regYear.test(timeStr) || regYearMonth.test(timeStr) ) {
            const time = timeCal(timeStr);
            orders = await this.orderRepo.getOrderProportionByTime(time)
            console.log(orders);
            orders.forEach(o => {
                if(o.status === Status.COMPLETED) {
                    result.completedOrders += 1 ;
                } else {
                    result.canceledOrders += 1 ;
                }
        })
        } else {
            throw new OperationalError(OperationalErrorMessage.INVALID_QUERY, HttpCode.BAD_REQUEST)
        }    

        return result
    }
    public async getTopProductsReport(timeStr: string, queryStr: {page: number, limit: number}): Promise<IProductReports> {
         const query = {
             page: 1,
             limit: 5
         }
         if(queryStr.page && !isNaN(queryStr.page)) query.page = queryStr.page;
         if(queryStr.limit && !isNaN(queryStr.limit)) query.limit = queryStr.limit;
         const time = timeCal(timeStr);
         return await this.orderRepo.getTopProductByTime(time, query);
    }
}