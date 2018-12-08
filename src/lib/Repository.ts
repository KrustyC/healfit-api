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

  /**
   * Count documents
   *
   * @param  {Object} query
   * @return {Number}
   */
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

  /**
   * Find one entry
   *
   * @param  {Object}      query
   * @param  {Object|null} projection
   * @param  {Object|null} populate
   * @param  {Object|null} options
   * @return {Object|null}
   */
  async findOneBy(
    query: object = {},
    projection?: object,
    populate?: object[],
    options: QueryOptions = { lean: true }
  ): Promise<any> {
    const res = await this.findBy(query, projection, populate, options);

    return _.first(res) || null;
  }

  /**
   * Find one entry by ID
   *
   * @param  {String}      id
   * @param  {Object|null} projection
   * @param  {Object|null} populate
   * @param  {Object|null} options
   * @return {Object|null}
   */
  async findById(
    id: ObjectId,
    projection?: object,
    populate?: object[],
    options: QueryOptions = { lean: true }
  ): Promise<any> {
    return this.findOneBy({ _id: id }, projection, populate, options);
  }

  /**
   * Aggregate special methods across a model
   *
   * @param  {Object}      options
   * @return {Object|null}
   */
  async aggregate(options: object[]): Promise<any> {
    return this._schema.aggregate(options);
  }

  /**
   * Return distinct values
   *
   * @param  {String} fields
   * @param  {Object} query
   * @param  {Object} options
   * @return {array}
   */
  async distinct(fields: string, query: object = {}): Promise<any> {
    return this._schema.distinct(fields, query);
  }

  // async save() {

  // }

  /**
   * Update an entry without returning the new one
   *
   * @param  {Object} query
   * @param  {Object} set      i.e. { $set: { ... } }
   * @return {Object}
   */
  async update(
    query: object,
    set: object,
    options?: QueryOptions
  ): Promise<any> {
    return this._schema.update(query, set, options || {});
  }

  /**
   * Update an entry and return the modified one
   *
   * @param  {Object} query
   * @param  {Object} set      i.e. { $set: { ... } }
   * @return {Object}
   */
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

  /**
   * Delete all the item that meet the query
   *
   * @param  {Object} query
   * @return {Object}
   */
  async hardDelete(query: object): Promise<any> {
    return this._schema.remove(query);
  }
}
