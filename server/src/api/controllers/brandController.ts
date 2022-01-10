import { Body, Delete, Get, Patch, Path, Post, Route, Security, Tags } from "tsoa";
import { IBrand, UserRole } from "../models";
import { BrandService } from "../services";
import { ValidateBrandModel } from "../validations";


@Route("brands")
@Tags('Product Brand')
export class BrandController {
    private _brandService: BrandService;
 
    constructor() {
        this._brandService = new BrandService();
    }

    /**
     * Get all brands 
     */
    @Get("/")
    public async getBrands(): Promise<IBrand[]> {
        return this._brandService.getAll({});
    }
    /**
     * Create new brand
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Post("/")
    public async createBrand(@Body() data: ValidateBrandModel): Promise<IBrand> {
        return this._brandService.create(data)
    }
    /**
    * Update brand info
    * @param {number} id
    * @isInt id Brand id must be an integer
    * @minimum id 0 Brand id must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Patch("/:id")
    public async updateBrandById(@Path() id: number, @Body() data: ValidateBrandModel): Promise<IBrand> {
        return this._brandService.update(id, data);
    }
    /**
    * Delete brand
    * @param {number} id
    * @isInt id Brand id must be an integer
    * @minimum id 0 Brand id must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Delete("/:id")
    public async deleteBrandById(@Path() id: number): Promise<void> {
        return this._brandService.delete(id);
    }
}