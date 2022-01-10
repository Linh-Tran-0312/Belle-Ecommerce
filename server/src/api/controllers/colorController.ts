import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Security, Tags } from "tsoa";
import { IColor, UserRole } from "../models";
import { ColorService } from "../services";
import { ValidateColorModel } from "../validations";

@Route("colors")
@Tags('Product Color')
export class ColorController  extends Controller {
    private _colorService: ColorService;

    constructor() {
        super()
        this._colorService = new ColorService();
    }

    /**
     * Get all colors 
     */
    @Get("/")
    public async getColors(): Promise<IColor[]> {
        return this._colorService.getAll({});
    }
    /**
     * Create new color
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Post("/")
    public async createColor(@Body() data:  ValidateColorModel): Promise<IColor> {
        return this._colorService.create(data)
    }
    /**
    * Update color info
    * @param {number} id
    * @isInt id Color id must be an integer
    * @minimum id 0 Color id must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Patch("/:id")
    public async updateColorById(@Path() id: number, @Body() data:  ValidateColorModel): Promise<IColor> {
        return this._colorService.update(id, data);
    }
    /**
     * Delete color
    * @param {number} id
    * @isInt id Color id must be an integer
    * @minimum id 0 Color id must be at least 0
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Delete("/:id")
    public async deleteColorById(@Path() id: number): Promise<void> {
        return this._colorService.delete(id);
    }
}