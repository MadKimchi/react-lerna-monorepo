import { Subject } from 'rxjs';
import { RxFormControlRef } from './form-control.class';

export class RxFormGroupRef {
  public controls: { [key: string]: RxFormControlRef } = {};
  public onError: Subject<boolean> = new Subject<boolean>();
  public onDebounce: Subject<boolean> = new Subject<boolean>();
  public isFormValid: boolean = false;

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
