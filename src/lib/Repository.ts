import _ from 'lodash';
import { Model } from 'mongoose';
import { IObjectId } from 'types/global';

interface IQueryOptions {
  lean?: boolean;
  skip?: number;
  limit?: number;
  sort?: any;
}

export default class Repository {
  public schema: Model<any>;

  constructor(Schema: Model<any>) {
    this.schema = Schema;
  }

  public async count(query: object): Promise<number> {
    return this.schema.find(query).count() || 0;
  }

  /**
   * Find multiple entries
   *
   * @param  {Object}      query
   * @param  {Object|null} projection
   * @param  {Object|null} populate
   * @param  {Object|null} options
   * @return {Object|null}
   */
  public async findBy(
    query: object = {},
    projection?: object,
    populate?: object[],
    options: IQueryOptions = { lean: true }
  ): Promise<any> {
    const res = this.schema.find(query, projection);

    if (populate) {
      if (_.isArray(populate)) {
        populate.forEach(x => {
          res.populate(x);
        });
      } else {
        res.populate(populate);
      }
    }

    if (options) {
      if (options.lean) {
        res.lean();
      }

      if (options.skip) {
        res.skip(options.skip);
      }

      if (options.limit) {
        res.limit(options.limit);
      }

      if (options.sort) {
        res.sort(options.sort);
      }
    }

    return res;
  }

  public async findOneBy(
    query: object = {},
    projection?: object,
    populate?: object[],
    options: IQueryOptions = { lean: true }
  ): Promise<any> {
    const res = await this.findBy(query, projection, populate, options);

    return _.first(res) || null;
  }

  public async findById(
    id: IObjectId,
    projection?: object,
    populate?: object[],
    options: IQueryOptions = { lean: true }
  ): Promise<any> {
    return this.findOneBy({ _id: id }, projection, populate, options);
  }

  public async aggregate(options: object[]): Promise<any> {
    return this.schema.aggregate(options);
  }

  public async distinct(fields: string, query: object = {}): Promise<any> {
    return this.schema.distinct(fields, query);
  }

  public async update(
    query: object,
    set: object,
    options?: IQueryOptions
  ): Promise<any> {
    return this.schema.update(query, set, options || {});
  }

  public async findOneAndUpdate(
    query: object,
    set: object,
    lean: boolean = true,
    opts?: IQueryOptions
  ): Promise<any> {
    const options = {
      new: true,
      returnNewDocument: true,
      returnOriginal: false,
    };
    const merged = opts ? { ...options, ...opts } : options;

    const updated = await this.schema.findOneAndUpdate(query, set, merged);

    return lean && updated ? updated.toObject() : updated;
  }

  public async hardDelete(query: object): Promise<any> {
    return this.schema.remove(query);
  }
}
