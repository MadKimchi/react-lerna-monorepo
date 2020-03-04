import { Subject } from 'rxjs';

import { ValidationTriggerEnum } from '../enums';
import { IRxFormControlRef } from '../interfaces';

export class RxFormGroupRef {
  public controls: { [key: string]: IRxFormControlRef } = {};
  public validationTrigger: ValidationTriggerEnum = ValidationTriggerEnum.onSync;

  public debounceTimer: number = 1000;

  // TODO: merge this into one subject and check by message type?
  public onDebounce: Subject<void> = new Subject<void>();
  public onSubmit: Subject<void> = new Subject<void>();
  public onClear: Subject<void> = new Subject<void>();
  public unsubscribe: Subject<void> = new Subject<void>();

  public get invalid(): boolean {
    return Object.values(this.controls).some(
      (control: IRxFormControlRef) => control.invalid
    );
  }

  public get values(): { [key: string]: any } {
    return Object.values(this.controls).reduce(
      (values: { [key: string]: any }, control: IRxFormControlRef) => {
        console.log(control.value)
        values[control.key] = control.value;
        return values;
      },
      {}
    );
  }

  public addControl(control: IRxFormControlRef): void {
    control.formGroupRef = this;
    this.controls[control.key] = control;
  }

  public getControl(key: string): IRxFormControlRef {
    return this.controls[key];
  }

  public clear(): void {
    Object.values(this.controls).forEach((control: IRxFormControlRef) => {
      control.clear();
    });
  }

  public validate(): void {}
}
