// Packages
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export abstract class BaseService<E> {
  constructor(
    protected readonly repository: Repository<E>
  ) { }

  public async findOne(params?: Partial<E>): Promise<E> {
    return this.repository.findOne(params);
  }

  public async findAll(params?: Partial<E>): Promise<E[]> {
    return this.repository.find(params);
  }

  public async findById(id: number): Promise<E> {
    return this.repository.findOne(id);
  }

  public async add(data: E): Promise<E> {
    return this.repository.save(data);
  }

  public async update(id: number, data: E): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
