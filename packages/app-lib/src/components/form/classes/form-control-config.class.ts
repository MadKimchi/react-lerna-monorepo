import { ControlTypeEnum } from '../enums/control-type.enum';
import { Subject } from 'rxjs';
import { LibFormBuilder } from './form-builder.class';

export class LibFormControlConfig {
  public hasError: boolean = false;
  public isDirty: boolean = false;
  public label: string = '';
  public value: string = '';
  public subject: Subject<any> = new Subject<any>();
  public validators: Function[] = [];
  public formBuilder!: LibFormBuilder; // prettier-ignore

  constructor(public key: string, public type: ControlTypeEnum) {
    this.setError = this.setError.bind(this);
  }

  public get invalid(): boolean {
    if (!this.validators.length) {
      return this.hasError;
    }

    this.hasError = this.validators.reduce(this.setError, true);
    return this.hasError;
  }

  private setError(hasError: boolean, validator: Function): boolean {
    return hasError && validator(this.value);
  }
}
