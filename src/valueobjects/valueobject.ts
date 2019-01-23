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
      id: parseInt(key, 10),
      [label]: val,
    }));
  }

  public validIds(): any[] {
    return _.map(_.keys(this.data), x => parseInt(x, 10));
  }

  public getMinId(): number {
    return _.min(this.validIds());
  }

  public getMaxId(): number {
    return _.max(this.validIds());
  }

  public fromInt(theInt: number): any {
    return _.get(this.data, theInt);
  }

  public fromString(
    theString: string,
    ignoreCase: boolean = false
  ): number | undefined {
    let id = 0;
    _.forEach(this.data, (val, key: string) => {
      if (ignoreCase) {
        // @ts-ignore
        if (val.toLowerCase() === theString.toLowerCase()) {
          id = parseInt(key, 10);
        }
        // @ts-ignore
      } else if (val === theString) {
        id = parseInt(key, 10);
      }
    });

    return id > 0 ? id : undefined;
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

  public listFromString(list: string): any[] {
    if (!list || !_.isString(list) || list === '') {
      return [];
    }

    const split = _.split(list, ',');

    return _.map(split, s => {
      const trimmed = _.trim(s);

      if (parseInt(trimmed, 10)) {
        const asInt = parseInt(trimmed, 10);
        return this.isValid(asInt) && asInt;
      }
      return this.isValid(trimmed) && this.fromString(trimmed);
    });
  }

  public listFromArray(array: any): any[] {
    if (!array || !_.isArray(array) || array.length === 0) {
      return [];
    }

    return _.map(array, s => this.isValid(s) && this.fromInt(s));
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
