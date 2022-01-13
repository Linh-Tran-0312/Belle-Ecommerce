import { Body, Delete, Get, Patch, Path, Post, Route, Security, Tags } from "tsoa";
import { Size, UserRole } from "../models";
import { SizeService } from "../services";
import { ValidateSizeModel } from "../validations";

@Route("sizes")
@Tags('Product Size')
export class SizeController {
    private _sizeService: SizeService;

    constructor() {
        this._sizeService = new SizeService();
    }

    /**
     * Get all Sizes 
     */
    @Get("/")
    public async getSizes(): Promise<Size[]> {
        return this._sizeService.getAll({});
    }
    /**
     * Create new Size
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Post("/")
    public async createSize(@Body() data:  ValidateSizeModel): Promise<Size> {
        return this._sizeService.create(data)
    }
    /**
    * Update Size info
    * @param {number} id
    * @isInt id Size id must be an integer
    * @minimum id 0 Size id must be at least 0
    */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Patch("/:id")
    public async updateSizeById(@Path() id: number, @Body() data:  ValidateSizeModel): Promise<Size> {
        return this._sizeService.update(id, data);
    }
    /**
     * Delete Size
    * @param {number} id
    * @isInt id Size id must be an integer
    * @minimum id 0 Size id must be at least 0
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Delete("/:id")
    public async deleteSizeById(@Path() id: number): Promise<void> {
        return this._sizeService.delete(id);
    }
}