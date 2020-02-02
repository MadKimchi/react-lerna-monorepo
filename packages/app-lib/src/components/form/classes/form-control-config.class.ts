import { ControlTypeEnum } from '../enums/control-type.enum';
import { Subject } from 'rxjs';

export class LibFormControlConfig {
  public hasError: boolean = false;
  public isDirty: boolean = false;
  public label: string = '';
  public value: any;
  public subject: Subject<any> = new Subject<any>();
  public validators: Function[] = [(value: any) => value && value.length > 3];

  constructor(public key: string, public type: ControlTypeEnum) {
    this.setError = this.setError.bind(this);
  }

  public get invalid(): boolean {
    console.log(this.value);
    if (!this.validators.length) {
      return this.hasError;
    }

    const hasError = this.validators.reduce(this.setError, this.hasError);
    this.hasError = hasError;
    console.log(this.hasError);
    return this.hasError;
  }

  private setError(hasError: boolean, validator: Function): boolean {
    console.log(hasError);
    console.log(validator(this.value));
    return hasError && validator(this.value);
  }
}
