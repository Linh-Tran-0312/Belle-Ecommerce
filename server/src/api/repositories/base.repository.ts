import { UpdateResult, Repository, FindManyOptions, FindOneOptions } from "typeorm";
import { CustomBaseEntity, IBaseEntity } from "../models/base.model";
import { PostgresError } from "../helpers/PostgresError";
export interface IBaseRepository<T> {
    create(data: T | any): Promise<T>;
     update( id: number | string,data: T | any): Promise<T | UpdateResult>;
    delete(id: number | string): void;

    find(options: any): Promise<T[]>;
    findOne(options: any): Promise<T | null>;

}

export abstract class BaseRepository<Props extends IBaseEntity, Class extends CustomBaseEntity & Props,CreateProps>
{
    protected entity: Repository<Class>;

    protected constructor(entity: Repository<Class>) {
        this.entity = entity;
    }

    public async create(data: CreateProps | any): Promise<Props> {
        try {
            return this.entity.save({...data});
        } catch (err: any) {
            throw new PostgresError(err.message, err);
        }
    }
    public async update(id: number | string, data: CreateProps | any): Promise<Props> {
        try {
           const updatedItem: any = await this.entity
                .createQueryBuilder()
                .update()
                .set({...data})
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
    public async find(options :FindManyOptions): Promise<Props[]> {
        try {
            return this.entity.find(options);
        } catch (err: any) {
            throw new PostgresError(err.message, err);
        }
    }
    public async findOne(options: FindOneOptions): Promise<Props | null> {
        try {
            const item: Props | any = await this.entity.findOne(options);
            if (!item) return null
            return item;
        } catch (err: any) {
            throw new PostgresError(err.message, err);
        }
    }

}