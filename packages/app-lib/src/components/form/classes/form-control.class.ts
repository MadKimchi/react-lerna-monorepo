import { ControlTypeEnum } from '../enums/control-type.enum';
import { Subject } from 'rxjs';
import { RxFormGroupRef } from './form-group.class';

export class RxFormControlRef {
  public hasError: boolean = false;
  public isDirty: boolean = false;
  public isTouched: boolean = false;

  public label: string = '';
  public value: string = '';
  public validators: Function[] = [];
  public formGroupRef!: RxFormGroupRef; // prettier-ignore

  public subject: Subject<any> = new Subject<any>();
  // public unsubscribe: Subject<any> = new Subject<void>();

  constructor(public key: string, public type: ControlTypeEnum) {
    this.setError = this.setError.bind(this);
  }

  public get valid(): boolean {
    return !this.invalid;
  }

  public get invalid(): boolean {
    if (!this.validators.length) {
      return this.hasError;
    }

    this.hasError = this.validators.reduce(this.setError, true);
    return this.hasError;
  }

  public clear(): void {
    this.hasError = false;
    this.isDirty = false;
    this.isTouched = false;
    this.value = '';
  }

  private setError(hasError: boolean, validator: Function): boolean {
    return hasError && validator(this.value);
  }
}
