import Repository from '../../lib/Repository';
import Schema from '../schema';

export default class MigrationRepo extends Repository {
  constructor() {
    super(Schema);
  }

  /**
   * Find all registered versions
   */
  public async findRegistered() {
    return this.findBy();
  }

  /**
   * Register a migration version as run
   *
   * @param  {Number} version
   */
  public async register(version: any) {
    return new Schema({ version, ran: new Date() }).save();
  }
}
