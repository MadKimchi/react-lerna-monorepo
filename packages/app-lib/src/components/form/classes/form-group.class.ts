import { Subject } from 'rxjs';
import { RxFormControlRef } from './form-control.class';
import { ValidationTriggerEnum } from '../enums';

export class RxFormGroupRef {
  public controls: { [key: string]: RxFormControlRef } = {};
  public validationTrigger: ValidationTriggerEnum = ValidationTriggerEnum.onSync;

  public debounceTimer: number = 1000;
  public onDebounce: Subject<boolean> = new Subject<boolean>();
  public onSubmit: Subject<any> = new Subject<any>();
  public onClear: Subject<any> = new Subject<any>();
  public unsubscribe: Subject<any> = new Subject<void>();

  public get invalid(): boolean {
    return Object.values(this.controls).some(
      (control: RxFormControlRef) => control.invalid
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
