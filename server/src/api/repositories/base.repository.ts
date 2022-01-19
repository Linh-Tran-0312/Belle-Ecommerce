import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { PostgresError } from "../helpers/PostgresError";

export interface IBaseRepository<T> {
    create(data: T | any): Promise<T>;
    update(id: number | string, data: T | any): Promise<T | any>;
    delete(id: number | string): void;
    find(options: FindManyOptions): Promise<T[] | any[]>;
    findOne(options: FindOneOptions): Promise<T | null>;
    findAndCount(options: FindManyOptions): Promise<any>
}

export abstract class BaseRepository<T> implements IBaseRepository<T>
{
    protected entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public async create(data: T | any): Promise<T> {
        try {
            return await this.entity.save({ ...data });
        } catch (err: any) {
            
            throw new PostgresError(err.message, err);
        }
    }
    public async update(id: number | string, data: T | any): Promise<T> {
        try {
            const updatedItem: any = await this.entity
                .createQueryBuilder()
                .update()
                .set({ ...data })
                .where("id = :id", { id })
                .returning("*")
                .updateEntity(true)
                .execute();

            return updatedItem.raw[0];
        } catch (err: any) {
            throw new PostgresError(err.message, err);
        }
    }
    public async delete(id: number | string): Promise<void> {
        try {
            await this.entity.delete(id);
        } catch (err: any) {
             
            throw new PostgresError(err.message, err);
        }
    }
    public async find(options: FindManyOptions): Promise<T[] | any[]> {
        try {
            return await this.entity.find(options);
        } catch (err: any) {
            throw new PostgresError(err.message, err);
        }
    }
    public async findOne(options: FindOneOptions): Promise<T | null> {
        try {
            const item: T | any = await this.entity.findOne(options);
            if (!item) return null
            return item;
        } catch (err: any) {
            throw new PostgresError(err.message, err);
        }
    }

    public async findAndCount(options: FindManyOptions): Promise<any> {
        try {
            const result = await this.entity.findAndCount(options);
            return result;
        } catch (err: any) {
            throw new PostgresError(err.message, err);
        }
    }

}