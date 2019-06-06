import glob from 'glob';
import _ from 'lodash';
import path from 'path';

import MigrationRepo from './repo';

export default class MigrationRunner {
  public repo: MigrationRepo;

  constructor() {
    this.repo = new MigrationRepo();
  }

  /**
   * Execute all migrations
   */
  public async run(): Promise<boolean> {
    const registeredMigrations = await this._getMigratedVersions();
    const versions = this._getMigrations();

    if (versions.length === 0) {
      // tslint:disable-next-line:no-console
      console.log('[INFO] No migrations to execute');
      return true;
    }

    // filter migrations that have not been run yet
    const migrationsToRun = _.filter(
      versions,
      (ver: string) =>
        registeredMigrations.indexOf(this._getMigrationId(ver)) === -1
    );

    if (migrationsToRun.length === 0) {
      // tslint:disable-next-line:no-console
      console.log('[INFO] All migrations have already been executed');
      return true;
    }

    for (const fileName of migrationsToRun) {
      const version = this._getMigrationId(fileName);

      const migrationFile = require(`./versions/${version}.ts`).default;

      const executionSuccessfull = await migrationFile().execute();

      if (executionSuccessfull) {
        await this.repo.register(version);
        // tslint:disable-next-line:no-console
        console.log('Successfully ran version ', version);
      }
    }

    return true;
  }

  /**
   * Find the migrations that have been registered
   *
   * @return {array}
   */
  public async _getMigratedVersions(): Promise<number[]> {
    const versions = await this.repo.findRegistered();
    return _.map(versions, v => parseInt(v.version, 10));
  }

  /**
   * Find all migration files
   *
   * @return {array}
   */
  public _getMigrations(): string[] {
    let versions: string[] = [];

    glob.sync('src/migrations/versions/*.ts').forEach((file: any) => {
      versions = [...versions, path.resolve(file)];
    });

    return versions;
  }

  /**
   * Generate migration ID from filename
   *
   * @param  {String} file
   * @return {Number}
   */
  public _getMigrationId(file: string): number {
    if (!file) {
      return 0;
    }

    const ext = _.last(file.split('/'));
    if (!ext) {
      return 0;
    }
    return parseInt(ext.split('.')[0], 10);
  }
}
