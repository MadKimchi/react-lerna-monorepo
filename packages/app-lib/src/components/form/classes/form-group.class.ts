import { Subject } from 'rxjs';

import { ValidationTriggerEnum, ControlTypeEnum } from '../enums';
import { IRxFormControlRef } from '../interfaces';
import { IControlSelectOption } from '../components';

export class RxFormGroupRef {
  public controls: { [key: string]: IRxFormControlRef } = {};
  public validationTrigger: ValidationTriggerEnum = ValidationTriggerEnum.onSync;

  public debounceTimer: number = 200;

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
        if (control.type !== ControlTypeEnum.select) {
          values[control.key] = control.value;
          return values;
        }

        if (!control.value) {
          values[control.key] = control.value;
          return values;
        }

        if (control.value instanceof Array) {
          values[control.key] = control.value.map(
            (option: IControlSelectOption<any>) => option.value
          );

          return values;
        }

        values[control.key] = control.value.value;
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
