import { ProductRepository, UserRepository, OrderRepository } from "../repositories"
import { IOverviewReport, ISaleOrderReport, IReportDetail, IProductReport  } from "../controllers/reportController";
import periodCalculator, { Period }from "../helpers/periodCalculator";
import { Status, IOrder } from "../models";
import { MoreThan, In } from "typeorm";
 

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
        const time = periodCalculator(Period.QUARTER);
        const sales: IOrder[] = await this.orderRepo.find({
            select: ["total", "status"],
            where: {
                status: In([Status.COMPLETED, Status.ORDERED, Status.DELIVERY]),
                orderAt: MoreThan(time.start)
            }

        });

        result.sales = sales.reduce((preSum,order) => {
            if(order.status === Status.COMPLETED) {
                return preSum + order.total!
            }
            return preSum ;
        },0); 
        result.orders = sales.length;

        const [ users, userCount ] = await this.userRepo.findAndCount({
            select: ["id"],
            where: {
                createdAt: MoreThan(time.start)
            }
        });
        result.registers = userCount;

        return result;
    }
    public async getSaleAndOrderReport(time: Period): Promise<any> {

        const period = periodCalculator(time);
        //if week, data will be grouped by day (mon,tuesday,wednesday)
        // if month, data will be grouped by date (1st,2rd,... )
        //if quarter, data will be grouped by date
        //if year, data will be grouped by month
        //group sales and orders by date, then retrieve from DB 

        const orders = await this.orderRepo.getOrderByDate();
        return orders
    }

}