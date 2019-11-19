// Packages
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export abstract class BaseService<E> {
  constructor(
    protected readonly repository: Repository<E>
  ) { }

  public async findOne(params?: Partial<E>, relations?: string[]): Promise<E> {
    return this.repository.findOne({
      ...params,
      relations
    });
  }

  public async findAll(params?: Partial<E>, relations?: string[]): Promise<E[]> {
    return this.repository.find({
      ...params,
      relations
    });
  }

  public async findById(id: number, relations?: string[]): Promise<E> {
    return this.repository.findOne(id, {
      relations
    });
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
