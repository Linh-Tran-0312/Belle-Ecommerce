import { DeleteResult, UpdateResult, Repository } from "typeorm";

export interface IBaseRepository<T> {
    create(data: T | any): Promise<T>;
    update(data: T | any, id: number | string): Promise<T|UpdateResult>;
    findAll(): Promise<T[]>;
    findWithRelations(relations: string[]): Promise<T[]>;
    findWithCondition(condition: any): Promise<T[]>;
    findOneById(id: number | string): Promise<T | undefined>;
    delete(id: number | string): Promise<DeleteResult>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {

    protected entity: Repository<T>

    constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public create(data: T | any): Promise<T> {
        return this.entity.save(data);
    }
    public update(data: T | any, id: number | string): Promise<T | UpdateResult> {
        return this.entity.update(id, data);
    }
    public findAll(): Promise<T[]> {
        return this.entity.find();
    }
    public findWithRelations(relations: string[]): Promise<T[]> {
        return this.entity.find({relations});
    }
    public findWithCondition(condition: any): Promise<T[]> {
        return this.entity.find({where: condition});
    }
    public findOneById(id: number | string): Promise<T | undefined> {
        return this.entity.findOne(id);
    }
    public delete(id: number | string): Promise<DeleteResult> {
        return this.entity.delete(id);
    }

}