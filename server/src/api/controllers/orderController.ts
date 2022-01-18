import { Body, Delete, Get, Patch, Path, Post, Query, Route, Security, Tags } from "tsoa";
import { Service } from "typedi";
import { Period } from "../helpers/timeHandler";
import { Status, UserRole } from "../models";
import { Change, IOrderBasicProps, IOrderInfo, IOrderQuery, IOrders, IOrderService, OrderField, OrderService } from "../services";
import { ValidateOrderPlacementModel,ValidateOrderStatusModel, ValidateOrderCreateModel, ValidateOrderDetailModel, ValidateOrderUpdateModel, ValidateUpdateQuantityModel } from "../validations";

@Service()
@Route("orders")
@Tags('Order')
export class OrderController {
    private _orderService: IOrderService;

    constructor(
        orderService: OrderService
    ) {
        this._orderService = orderService;
    }

    /**
     * For Admin permission
     * Get all Orders, be able to sort by price, time, user and to filter by price, time, user...
     * @param {string} time
     * @param {number} limit
     * @param {number} page
     * @isInt category
     * @minimum category 0
     * @isInt limit Limit must be an integer
     * @minimum limit 1 Limit must be at least 1
     * @isInt page Page must be an integer
     * @minimum page 1 Page must be at least 1
     */
    @Security("jwt", [UserRole.ADMIN])
    @Get("/")
    public async getOrders(
        @Query() search?: string,
        @Query() limit?: number,
        @Query() page?: number,
        @Query() time?: Period,
        @Query() status?: Status,
        @Query() paymentCheck?: boolean,
        @Query() sort?: OrderField,
        @Query() change?: Change,
    ): Promise<IOrders> {
        const query: IOrderQuery = {
            search: search?.trim(),
            paymentCheck,
            status,
            limit: limit || 5,
            page: page || 1,
            time,
            sort: sort || OrderField.ORDERAT,
            change: change || Change.DESC
        }
        return this._orderService.getOrders(query);
    }
    /**
     * Create new order when user add items to order that is not already existed.
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Post("/")
    public async createOrder(@Body() data: ValidateOrderCreateModel): Promise<IOrderInfo> {
        return this._orderService.createOrder(data);
    }
    /**
    * Get all orders of user by userId
    * @param {number} userId
   * @isInt userId User id must be an integer
   * @minimum userId 0 User id value must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Get("/:userId/all")
    public async getOrdersOfUser(@Path() userId: number): Promise<IOrderBasicProps[]> {
        return this._orderService.getAllOrdersByUserId(userId);
    }
    /**
    * Current order is incomplete order (status: ORDERING)
    * Get current order of user
    * @param {number} userId
    * @isInt userId User id must be an integer
    * @minimum userId 0 User id value must be at least 0
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Get("/:userId/current")
    public async getCurrentOrderOfUser(@Path() userId: number): Promise<IOrderInfo | null> {
        return this._orderService.getCurrentOrderByUserId(userId);
    }
    /**
    * Get order details
     * @param {number} orderId
    * @isInt orderId Order id must be an integer
    * @minimum orderId 0 Order id value must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Get("/:orderId")
    public async getOrderById(@Path() orderId: number): Promise<IOrderInfo> {
        return this._orderService.getOrderById(orderId)
    }
    /**
    * Update order (add items to existing cart or create new cart when users login if there are items in their carts)
    * @param {number} userId
    * @isInt userId User id must be an integer
    * @minimum userId 0 User id value must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Patch("/:userId/afterLogin")
    public async updateOrderItems(@Path() userId: number, @Body() data: ValidateOrderUpdateModel): Promise<IOrderInfo> {
        return this._orderService.updateOrderItems(userId, data.details)
    }
    /**
    * Update order status
    * @param {number} orderId
    * @isInt orderId Order id must be an integer
    * @minimum orderId 0 Order id value must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Patch("/:orderId/updateStatus")
    public async updateOrderStatus(@Path() orderId: number, @Body() data: ValidateOrderStatusModel): Promise<IOrderInfo> {
        return this._orderService.updateOrderStatus(orderId, data)
    }
    /**
    * Submit current order  
    * @param {number} orderId
    * @isInt orderId Order id must be an integer
    * @minimum orderId 0 Order id value must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Patch("/:orderId/place")
    public async placeOrder(@Path() orderId: number, @Body() data: ValidateOrderPlacementModel): Promise<IOrderInfo> {
        return this._orderService.placeOrder(orderId, data)
    }
    /**
     * Delete order of user
    * @param {number} orderId
    * @isInt orderId Order id must be an integer
    * @minimum orderId 0 Order id value must be at least 0
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Delete("/:orderId")
    public async deleteOrderById(@Path() orderId: number): Promise<void> {
        return this._orderService.delete(orderId);
    }


    // Order details

    /**
     * Add (create) item to order
     * @param {number} orderId
    * @isInt orderId Order id must be an integer
    * @minimum orderId 0 Order id value must be at least 0
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Post("/:orderId/items")
    public async addItemToOrder(@Path() orderId: number, @Body() data: ValidateOrderDetailModel): Promise<IOrderInfo> {
        return this._orderService.addItemToOrder(orderId, data)
    }
    /**
    * Update order item (quantity)
     * @param {number} itemId
    * @isInt itemId Item id must be an integer
    * @minimum itemId 0 Item id value must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Patch("/:orderId/items/:itemId")
    public async updateItemQuantity(@Path() orderId: number, @Path() itemId: number, @Body() data: ValidateUpdateQuantityModel): Promise<IOrderInfo> {
        return this._orderService.updateItemQuantity(orderId, itemId, data.quantity)
    }
    /**
    * Delete order items
    * @param {number} itemId
    * @isInt itemId Item id must be an integer
    * @minimum itemId 0 Item id value must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EDITOR])
    @Delete("/:orderId/items/:itemId")
    public async deleteItem(@Path() orderId: number, @Path() itemId: number): Promise<IOrderInfo> {
        return this._orderService.deleteItem(orderId,itemId)
    }



}