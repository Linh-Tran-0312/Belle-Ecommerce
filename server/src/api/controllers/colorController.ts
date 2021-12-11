import { Body, Delete, Get, Patch, Path, Post, Route, Tags, Security} from "tsoa";
import { IColor, IColorCreateProps } from "../models";
import { ColorService } from "../services";
import { UserRole } from "../models";
export interface IColorUpdateProps {
    name?: string;
    code?: string;
}

@Route("colors")
@Tags('Product Color')
export class ColorController {
    private _colorService: ColorService;

    constructor() {
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
    public async createColor(@Body() data: IColorCreateProps): Promise<IColor> {
        return this._colorService.create(data)
    }
    /**
    * Update color info
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Patch("/:id")
    public async updateColorById(@Path() id: number, @Body() data: IColorUpdateProps): Promise<IColor> {
        return this._colorService.update(id, data);
    }
    /**
     * Delete color
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Delete("/:id")
    public async deleteColorById(@Path() id: number): Promise<void> {
        return this._colorService.delete(id);
    }
}