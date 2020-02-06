import { Subject } from 'rxjs';
import { RxFormControlRef } from './form-control.class';
import { ValidationTriggerEnum } from '../enums';

export class RxFormGroupRef {
  public controls: { [key: string]: RxFormControlRef } = {};
  public debounceTimer: number = 1000;
  public onDebounce: Subject<boolean> = new Subject<boolean>();
  public validationTrigger: ValidationTriggerEnum = ValidationTriggerEnum.onSync;

  public get invalid(): boolean {
    return Object.values(this.controls).reduce(
      (invalid: boolean, control: RxFormControlRef) => control.invalid,
      true
    );
  }

  public addControl(control: RxFormControlRef): void {
    control.formGroupRef = this;
    this.controls[control.key] = control;
  }

  public getControl(key: string): RxFormControlRef {
    return this.controls[key];
  }
}
