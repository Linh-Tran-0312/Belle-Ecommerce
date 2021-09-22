import { IBaseRepository } from "../repositories";
import { Repository } from "typeorm";
import { BaseRepository } from "../repositories/base.repository";

export interface IBaseService<T> {
    create(data: T): Promise<T>;
    delete(id: number | string): Promise<void>;
    update(id: number | string, data: T | any): Promise<T | any>

    getAll(relations?: string[]): Promise<T[]>;
    getOneById(id: number | string, relations?: string[] ): Promise<T | null>;

  
}

export abstract class BaseService<T, R extends BaseRepository<T>> implements IBaseService<T> {
    protected repository: R;
    constructor(repository: R) {
        this.repository = repository;
    }

    async getAll(relations?: string[]): Promise<T[]> {
       return this.repository.findAll(relations);
    };

    async getOneById(id: number | string, relations?: string[] ): Promise<T | null> {
        const item: any = await this.repository.findOneById(id, relations);
        if(!item) return null;
        return item
    };

    async create(data: T | any): Promise<T> {
        return this.repository.create(data)
    };
    async delete(id: number | string): Promise<void> {
         this.repository.delete(id);
    };
    async update(id: number | string, data: T | any): Promise<T | any> {
        return this.repository.update(id, data)
    }

}