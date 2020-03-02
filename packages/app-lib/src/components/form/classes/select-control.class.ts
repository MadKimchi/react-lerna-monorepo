import { RxBaseControlRef } from './base-control.class';

export class RxSelectControlRef extends RxBaseControlRef {
  public value: any[] = []
  public isMultiple: boolean = false;
  public options!: any[]

  public clear(): void {
    super.clear()
    this.value = []
  }
}
