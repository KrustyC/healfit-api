import _ from 'lodash';

export default class ValueObject {
  private data: object;

  constructor(data: object) {
    this.data = data;
  }

  public count(): number {
    return _.size(this.data);
  }

  public indexedList(label: string = 'name'): any[] {
    return _.map(this.data, (val: any, key: any) => ({
      id: key,
      [label]: val,
    }));
  }

  public validIds(): any[] {
    return _.map(_.keys(this.data), x => x);
  }

  public getMinId(): number {
    return _.min(this.validIds());
  }

  public getMaxId(): number {
    return _.max(this.validIds());
  }

  public fromString(
    theString: string,
    ignoreCase: boolean = false
  ): string | undefined {
    let id;
    _.forEach(this.data, (val, key: string) => {
      if (ignoreCase) {
        // @ts-ignore
        if (val.toLowerCase() === theString.toLowerCase()) {
          id = key;
        }
        // @ts-ignore
      } else if (val === theString) {
        id = key;
      }
    });

    return id;
  }

  public isValid(type: any, ignoreCase = false) {
    if (isNaN(type)) {
      if (ignoreCase) {
        const valuess = _.values(this.data).map((x: string) => x.toLowerCase());
        return _.indexOf(valuess, type.toLowerCase()) > -1;
      }
      const vals = _.values(this.data);
      return _.indexOf(vals, type) > -1;
    }

    const ids = this.validIds();
    return _.indexOf(ids, type) > -1;
  }

  public commaListFromArray(array: any[]): string {
    const list = _.filter(_.map(array, s => this.isValid(s) && s));

    if (
      list.length === 0 ||
      !_.isArray(array) ||
      !array ||
      array.length === 0
    ) {
      return '';
    }

    return _.join(list, ',');
  }
}
