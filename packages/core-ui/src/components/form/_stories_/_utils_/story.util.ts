import { IControlSelectOption } from "../../components";
import { IRxFormControlRef } from "../../interfaces";
import { RxFormGroupRef } from "../../classes";

export function getSelectOptions(): IControlSelectOption<string>[] {
    const options = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder'
      ];
    
      return options.map((name: string, index: number) => ({
        id: `${index}`,
        label: name,
        value: name
      }));
}

export function buildFormOutput(formGroup: RxFormGroupRef): { [key: string]: any } {
    const output = {
        payload: formGroup.values,
        status: mapControlStatus(formGroup),
    };
    
    return output;
}

function mapControlStatus(formGroup: RxFormGroupRef): { [key: string]: any } {
    const controls = Object.values(formGroup.controls);
    return controls.reduce(getControlStatus(), {});
}

function getControlStatus(): (
    accumulator: {[key: string]: any},
    control: IRxFormControlRef
  ) => {[key: string]: any} {
    return (accumulator: {[key: string]: any}, control: IRxFormControlRef) => {
      const status = {
        isDirty: control.isDirty,
        isTouched: control.isTouched,
        invalid: control.invalid
      };
      accumulator[control.key] = status;
  
      return accumulator;
    };
  }