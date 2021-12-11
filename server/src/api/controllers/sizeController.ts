import { Body, Delete, Get, Patch, Path, Post, Route, Tags, Security } from "tsoa";
import { ISize, ISizeCreateProps, UserRole } from "../models";
import { SizeService } from "../services";

export interface ISizeUpdateProps {
    name?: string;
}

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
    public async getSizes(): Promise<ISize[]> {
        return this._sizeService.getAll({});
    }
    /**
     * Create new Size
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Post("/")
    public async createSize(@Body() data: ISizeCreateProps): Promise<ISize> {
        return this._sizeService.create(data)
    }
    /**
    * Update Size info
    */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Patch("/:id")
    public async updateSizeById(@Path() id: number, @Body() data: ISizeUpdateProps): Promise<ISize> {
        return this._sizeService.update(id, data);
    }
    /**
     * Delete Size
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Delete("/:id")
    public async deleteSizeById(@Path() id: number): Promise<void> {
        return this._sizeService.delete(id);
    }
}