import { Body, Delete, Get, Patch, Path, Post, Query, Route, Tags, Security } from "tsoa";
import { IOrder, IOrderCreateProps, IOrderDetail, IOrderDetailCreateProps, Status, PaymentMethod, OrderDetail, Order, UserRole } from "../models";
import { OrderService, OrderDetailService , IPlaceOrder, IOrderQuery, OrderField, Change} from "../services";
import { IOrders } from "../repositories";
export interface IOrderUpdateProps {
    status?: Status;
    paymentCheck?: boolean;
    paymentMethod?: PaymentMethod;
    address?: string,


}
export interface IOrderDetailQtyUpdate {
    quantity: number
}
export interface IOrderUpdateItems {
    details: IOrderDetailCreateProps[];
}
export interface IOrderDetailsUpdateProps {
    quantity: number;
}


@Route("orders")
@Tags('Order')
export class OrderController {
    private _orderService: OrderService;
    private _orderDetailService: OrderDetailService;

    constructor() {
        this._orderService = new OrderService();
        this._orderDetailService = new  OrderDetailService();
    }

    /**
     * For Admin permission
     * Get all Orders, be able to sort by price, time, user and to filter by price, time, user...
     * Not done
     */
    @Security("jwt", [UserRole.ADMIN])
    @Get("/")
    public async getOrders(
        @Query() search?: string,
        @Query() limit?: number,
        @Query() page?: number,
        @Query() time?: string,
        @Query() status?: string,
        @Query() paymentCheck?: string,
        @Query() sort?: OrderField,
        @Query() change?: Change,
    ): Promise<IOrders> {
        const query: IOrderQuery = {
            search,
            paymentCheck,
            status,
            limit,
            page,
            time,
            sort,
            change
        }
        return this._orderService.getOrders(query);
    }
    /**
     * Create new order when user add items to order that is not already existed.
     * Done
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Post("/")
    public async createOrder(@Body() data: IOrderCreateProps): Promise<IOrder|null> {
        return this._orderService.createOrder(data);
    }
     /**
     * Get all orders of user by userId
     * Done
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Get("/:userId/all")
    public async getOrdersOfUser(@Path() userId: number): Promise<IOrder[]> {
        return this._orderService.getAllOrdersByUserId(userId);
    }
    /**
     * Current order is incomplete order (status: ORDERING)
     * Get current order of user
     */
     @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Get("/:userId/current")
    public async getCurrentOrderOfUser(@Path() userId: number): Promise<IOrder | null> {
        return this._orderService.getCurrentOrderByUserId(userId);
    }
    /**
    * Get order details
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Get("/:orderId")
    public async getOrderById(@Path() orderId: number): Promise<IOrder | null> {
        return this._orderService.getOrderById(orderId)
    }
    /**
    * Update order (add items when use login if there are cart items saved in local storage)
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Patch("/:userId/afterLogin")
    public async updateOrderItems(@Path() userId: number, @Body() data: IOrderUpdateItems): Promise<IOrder|null> {
        return this._orderService.updateOrderItems(userId,data)
    }
    /**
    * Update order status
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Patch("/:orderId/updateStatus")
    public async updateOrderStatus(@Path() orderId: number, @Body() data: IOrderUpdateProps): Promise<IOrder> {
        return this._orderService.updateOrderStatus(orderId,data)
    }
    /**
    * Submit current order  
    */
     @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
     @Patch("/:orderId/place")
     public async placeOrder(@Path() orderId: number, @Body() data: IPlaceOrder): Promise<IOrder> {
         return this._orderService.placeOrder(orderId,data)
     }
    /**
     * Delete order of user
     */
     @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Delete("/:orderId")
    public async deleteOrderById(@Path() orderId: number): Promise<void> {
        return this._orderService.delete(orderId);
    }


    // Order details

    /**
     * Add (create) item to order
     */
     @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Post("/:orderId/items")
    public async addItemToOrder(@Path() orderId: number,@Body() data: IOrderDetailCreateProps): Promise<IOrder|null> {
       return this._orderService.addItemToOrder(orderId, data)
    } 
    /**
    * Update order item (quantity)
    */
     @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Patch("/items/:itemId")
    public async updateItemQuantity(@Path() itemId: number, @Body() data: IOrderDetailQtyUpdate): Promise<IOrderDetail> {
        return this._orderDetailService.updateItemQuantity(itemId,data.quantity)
    } 
    /**
     * Delete order items
     */
     @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Delete("/items/:itemId")
    public async deleteItem(@Path() itemId: number): Promise<void> {
    return this._orderDetailService.delete(itemId)
    } 
    
 
 
}