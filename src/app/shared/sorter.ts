import { Injectable } from '@angular/core';

@Injectable()
export class Sorter {

  public property: string = null;
  public direction = 1;

  sort(collection: any[], prop: any) {
    this.property = prop;
    this.direction = (this.property === prop) ? this.direction * -1 : 1;

    collection.sort((a: any, b: any) => {
      let aVal: any;
      let bVal: any;

      // Handle resolving complex properties such as 'state.name' for prop value
      if (prop && prop.indexOf('.') > -1) {
        aVal = this.resolve(prop, a);
        bVal = this.resolve(prop, b);
      } else {
        aVal = a[prop];
        bVal = b[prop];
      }

      // Fix issues that spaces before/after string value can cause such as ' Geneve '
      if (this.isString(aVal)) {
        aVal = aVal.trim().toUpperCase();
      }

      if (this.isString(bVal)) {
        bVal = bVal.trim().toUpperCase();
      }

      if (aVal === bVal) {
        return 0;
      } else if (aVal > bVal) {
        return this.direction * -1;
      } else {
        return this.direction;
      }
    });
  }

  isString(val: any): boolean {
    return (val && (typeof val === 'string' || val instanceof String));
  }

  resolve(path: string, obj: any) {
    return path.split('.').reduce((prev, curr) => {
      return (prev ? prev[curr] : undefined);
    }, obj || self);
  }

}
