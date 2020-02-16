import React, { ReactElement, useEffect } from 'react';
import { takeUntil } from 'rxjs/operators';
import './app.css';

import {
  RxFormGroupRef,
  RxFormControlRef,
  RxFormControl,
  RxButtonSubmit,
  RxButtonClear,
  ControlTypeEnum,
  StringValidator,
  ValidationTriggerEnum,
  IRxFormControlRef,
  RxSelectControlRef,
  IRxFormControlRefExtras
} from './components';
import { IControlSelectOption } from './components/form/components/form-control/control-select/control-select.interface';

const App = () => {
  const formGroup = new RxFormGroupRef();
  formGroup.validationTrigger = ValidationTriggerEnum.onBlur;
  buildInputControl('1', formGroup);
  buildInputControl('2', formGroup);
  buildInputControl('3', formGroup);
  buildInputControl('4', formGroup);
  buildInputControl('5', formGroup);
  buildInputControl('6', formGroup);
  buildInputControl('7', formGroup);
  buildInputControl('8', formGroup);
  buildInputControl('9', formGroup);
  buildInputControl('10', formGroup);
  buildInputControl('11', formGroup);
  buildInputControl('12', formGroup);

  const form = Object.values(formGroup.controls).map(
    (control: IRxFormControlRef) => control
  );

  function buildInputControl(key: string, formGroupRef: RxFormGroupRef): void {
    const inputControl = new RxSelectControlRef(key, ControlTypeEnum.select);
    inputControl.label = `some label ${key}`;
    inputControl.validators = [selectValidator(3)];

    const extras: IRxFormControlRefExtras = {};
    extras.isMultiple = true;
    extras.options = getOptions();

    inputControl.extras = extras;
    formGroupRef.addControl(inputControl);
  }

  function renderControls(): ReactElement[] {
    return form.map((controlRef: IRxFormControlRef) => (
      <RxFormControl key={controlRef.key} controlRef={controlRef} />
    ));
  }

  function getOptions(): IControlSelectOption<string>[] {
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

  function selectValidator(minLength: number): Function {
    return (value: any[]): { key: string; msg: string } | null => {
      const hasError = (!!value && value.length < minLength) || !value;
      return hasError
        ? { key: 'minLength', msg: `At least ${minLength} characters` }
        : null;
    };
  }

  useEffect(() => {
    formGroup.onSubmit.pipe(takeUntil(formGroup.unsubscribe)).subscribe(() => {
      Object.values(formGroup.controls).forEach(
        (control: IRxFormControlRef) => {
          console.log(control);
        }
      );
    });

    return () => {
      formGroup.unsubscribe.next();
      formGroup.unsubscribe.complete();
    };
  }, []);

  return (
    <div className="App">
      {renderControls()}
      <RxButtonSubmit formGroupRef={formGroup} />
      <RxButtonClear formGroupRef={formGroup} />
    </div>
  );
};

export default App;
