import { UpdateResult, Repository } from "typeorm";

export interface IBaseRepository<T> {
    create(data: T | any): Promise<T>;
    update(data: T | any, id: number | string): Promise<T | UpdateResult>;
    delete(id: number | string): void;

    findAll( relations?: string[]): Promise<T[]>;
    findWithCondition(condition: any): Promise<T[]>;
    findOneById(id: number | string, relations?: string[]): Promise<T | null>;
    
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {

    protected entity: Repository<T>

    constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public async create(data: T | any): Promise<T> {
        try {
            return this.entity.save(data);
        } catch (error) {
            throw error;
        }
    }
    public async update( id: number | string,data: T | any): Promise<T | UpdateResult> {
        try {
            return this.entity.update(id, data);
        } catch (error) {
            throw error;
        }   
    }
    public async delete(id: number | string): Promise<void> {
        try {
           await this.entity.delete(id);
        } catch (error) {
            throw error;
        }    
    }
    public async findAll(relations?: string[]): Promise<T[]> {
        try {
            return this.entity.find({relations});
        } catch (error) {
            throw error;
        }
    }
    public async findWithCondition(condition: any ): Promise<T[]> {
        try {
            return this.entity.find(condition);
        } catch (error) {
            throw error;
        }
    }
    public async  findOneById<T>(id: number | string, relations?: string[]): Promise<T | null> {
        try {
            const item: any = await this.entity.findOne(id, { relations });
            if(!item) return null
            return item;
        } catch (error) {
            throw error;
        }
    }
  
}