import _ from 'lodash';
import { Schema, Model } from 'mongoose';
import { ObjectId } from 'types/global';

type QueryOptions = {
  lean?: boolean;
  skip?: number;
  limit?: number;
  sort?: any;
};

export default class Repository {
  _schema: Model<any>;

  constructor(Schema: Model<any>) {
    this._schema = Schema;
  }

  async count(query: object): Promise<number> {
    return this._schema.find(query).count() || 0;
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
  async findBy(
    query: object = {},
    projection?: object,
    populate?: object[],
    options: QueryOptions = { lean: true }
  ): Promise<any> {
    const res = this._schema.find(query, projection);

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

  async findOneBy(
    query: object = {},
    projection?: object,
    populate?: object[],
    options: QueryOptions = { lean: true }
  ): Promise<any> {
    const res = await this.findBy(query, projection, populate, options);

    return _.first(res) || null;
  }

  async findById(
    id: ObjectId,
    projection?: object,
    populate?: object[],
    options: QueryOptions = { lean: true }
  ): Promise<any> {
    return this.findOneBy({ _id: id }, projection, populate, options);
  }

  async aggregate(options: object[]): Promise<any> {
    return this._schema.aggregate(options);
  }

  async distinct(fields: string, query: object = {}): Promise<any> {
    return this._schema.distinct(fields, query);
  }

  async update(
    query: object,
    set: object,
    options?: QueryOptions
  ): Promise<any> {
    return this._schema.update(query, set, options || {});
  }

  async findOneAndUpdate(
    query: object,
    set: object,
    lean: boolean = true,
    opts?: QueryOptions
  ): Promise<any> {
    const options = {
      returnOriginal: false,
      returnNewDocument: true,
      new: true,
    };
    const merged = opts ? { ...options, ...opts } : options;

    const updated = await this._schema.findOneAndUpdate(query, set, merged);

    return lean && updated ? updated.toObject() : updated;
  }

  async hardDelete(query: object): Promise<any> {
    return this._schema.remove(query);
  }
}
