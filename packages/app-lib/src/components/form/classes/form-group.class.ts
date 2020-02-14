import { Subject } from 'rxjs';
import { RxFormControlRef } from './form-control.class';
import { ValidationTriggerEnum } from '../enums';

export class RxFormGroupRef {
  public controls: { [key: string]: RxFormControlRef } = {};
  public validationTrigger: ValidationTriggerEnum = ValidationTriggerEnum.onSync;

  public debounceTimer: number = 1000;

  // TODO: merge this into one subject and check by message type?
  public onDebounce: Subject<void> = new Subject<void>();
  public onSubmit: Subject<void> = new Subject<void>();
  public onClear: Subject<void> = new Subject<void>();
  public unsubscribe: Subject<void> = new Subject<void>();

  public get invalid(): boolean {
    return Object.values(this.controls).some(
      (control: RxFormControlRef) => control.invalid
    );
  }

  public get values(): { [key: string]: any } {
    return Object.values(this.controls).reduce(
      (values: { [key: string]: any }, control: RxFormControlRef) => {
        values[control.key] = control.value;
        return values;
      },
      {}
    );
  }

  public addControl(control: RxFormControlRef): void {
    control.formGroupRef = this;
    this.controls[control.key] = control;
  }

  public getControl(key: string): RxFormControlRef {
    return this.controls[key];
  }

  public clear(): void {
    Object.values(this.controls).forEach((control: RxFormControlRef) => {
      control.clear();
    });
  }

  public validate(): void {}
}
