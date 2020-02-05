import { LibFormControlConfig } from './form-control-config.class';
import { Subject } from 'rxjs';
import { ControlTypeEnum } from '../enums/control-type.enum';

export class LibFormBuilder {
  public controls: { [key: string]: LibFormControlConfig } = {};
  public onError: Subject<boolean> = new Subject<boolean>();
  public isFormValid: boolean = false;

  public get invalid(): boolean {
    console.log('??...');
    return Object.values(this.controls).reduce(
      (invalid: boolean, control: LibFormControlConfig) => control.invalid,
      true
    );
  }

  public addControl(config: LibFormControlConfig): void {
    this.controls[config.key] = config;
  }

  public getControl(key: string): LibFormControlConfig {
    return this.controls[key];
  }
}
