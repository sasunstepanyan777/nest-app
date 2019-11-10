// Packages
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export abstract class BaseService<E> {
  constructor(
    protected readonly repository: Repository<E>
  ) { }

  protected async findOne(params?: Partial<E>): Promise<E> {
    return this.repository.findOne(params);
  }

  protected async findAll(params?: Partial<E>): Promise<E[]> {
    return this.repository.find(params);
  }

  protected async findById(id: number): Promise<E> {
    return this.repository.findOne(id);
  }

  protected async add(data: E): Promise<E> {
    return this.repository.save(data);
  }

  protected async update(id: number, data: E): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  protected async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
