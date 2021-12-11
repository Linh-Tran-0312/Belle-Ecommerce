import { Body, Delete, Get, Patch, Path, Post, Route, Tags, Security } from "tsoa";
import { IBrand, IBrandCreateProps } from "../models";
import { BrandService } from "../services";
import { UserRole } from "../models";
export interface IBrandUpdateProps {
    name?: string;
    imgPath?: string;
}

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
    public async createBrand(@Body() data: IBrandCreateProps): Promise<IBrand> {
        return this._brandService.create(data)
    }
    /**
    * Update brand info
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Patch("/:id")
    public async updateBrandById(@Path() id: number, @Body() data: IBrandUpdateProps): Promise<IBrand> {
        return this._brandService.update(id, data);
    }
    /**
     * Delete brand
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Delete("/:id")
    public async deleteBrandById(@Path() id: number): Promise<void> {
        return this._brandService.delete(id);
    }
}