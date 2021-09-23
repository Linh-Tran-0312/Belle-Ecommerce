import { UpdateResult, Repository } from "typeorm";
import { BaseEntity, IBaseEntity } from "../models/base.model";

export interface IBaseRepository<T> {
    create(data: T | any): Promise<T>;
    update(data: T | any, id: number | string): Promise<T | UpdateResult>;
    delete(id: number | string): void;

    findAll(): Promise<T[]>;
    findWithRelations(relations: string[]): Promise<T[]>;
    findWithCondition(condition: any): Promise<T[]>;
    findOneById(id: number | string, relations?: string[]): Promise<T | null>;

}

export abstract class BaseRepository<Props extends IBaseEntity, Class extends BaseEntity & Props,CreateProps>
    implements IBaseRepository<Props>
{

    protected entity: Repository<Class>;

    protected constructor(entity: Repository<Class>) {
        this.entity = entity;
    }

    public async create(data: CreateProps | any): Promise<Props> {
        try {
            return this.entity.save(data);
        } catch (error) {
            throw error;
        }
    }
    public async update(id: number | string, data: Props | any): Promise<Props | UpdateResult> {
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
    public async findAll(): Promise<Props[]> {
        try {
            return this.entity.find();
        } catch (error) {
            throw error;
        }
    }
    public async findWithRelations(relations: string[]): Promise<Props[]> {
        try {
            return this.entity.find({ relations: relations });
        } catch (error) {
            throw error;
        }
    }
    public async findWithCondition(condition: any): Promise<Props[]> {
        try {
            return this.entity.find(condition);
        } catch (error) {
            throw error;
        }
    }
    public async findOneById(id: number | string, relations?: string[]): Promise<Props | null> {
        try {
            const item: Props | any = await this.entity.findOne(id, { relations });
            if (!item) return null
            return item;
        } catch (error) {
            throw error;
        }
    }

}