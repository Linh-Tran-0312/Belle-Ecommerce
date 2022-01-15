import { HttpCode } from "../helpers/HttpCode";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { CustomBaseEntity } from "../models/base.model";
import { IBaseRepository } from "../repositories/base.repository";

export interface IBaseService<T extends CustomBaseEntity> {
    create(data: T|any): Promise<T>;
    delete(id: number | string): Promise<void>;
    update(id: number | string, data: T | any): Promise<T | any>

    getAll(options: any): Promise<T[]>;
    getOneById(id: number | string, relations?: string[] ): Promise<T>;
}

export abstract class BaseService<T extends  CustomBaseEntity, R extends IBaseRepository<T>> implements IBaseService<T> {
    protected repository: R;
    constructor(repository: R) {
        this.repository = repository;
    }

    async getAll(options: any): Promise<T[]> {
        return await this.repository.find(options); 
    };

    async getOneById(id: number | string, relations?: string[] ): Promise<T> {
        const item: any = await this.repository.findOne({
            where: {
                id
            },
            relations
        });
        if(!item) throw new OperationalError(OperationalErrorMessage.NOT_FOUND, HttpCode.NOT_FOUND)
        return item
    };

    async create(data: T | any): Promise<T> {
        return await this.repository.create(data)
    };
    async delete(id: number | string): Promise<void> {        
        return await this.repository.delete(id);
       
    };
    async update(id: number | string, data: T | any): Promise<T|any> {
        return await this.repository.update(id, data)
    }

}