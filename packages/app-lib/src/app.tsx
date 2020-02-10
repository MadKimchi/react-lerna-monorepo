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
  ValidationTriggerEnum
} from './components';

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
    (control: RxFormControlRef) => control
  );

  function buildInputControl(key: string, formGroupRef: RxFormGroupRef): void {
    const inputControl = new RxFormControlRef(key, ControlTypeEnum.input);
    inputControl.label = `some label ${key}`;
    inputControl.validators = [StringValidator(3)];
    formGroupRef.addControl(inputControl);
  }

  function renderControls(): ReactElement[] {
    return form.map((controlRef: RxFormControlRef) => (
      <RxFormControl key={controlRef.key} controlRef={controlRef} />
    ));
  }

  useEffect(
    () => {
      formGroup.onSubmit
        .pipe(takeUntil(formGroup.unsubscribe))
        .subscribe(() => {
          Object.values(formGroup.controls).forEach(
            (control: RxFormControlRef) => {
              console.log(control);
            }
          );
        });

      return () => {
        formGroup.unsubscribe.next();
        formGroup.unsubscribe.complete();
      };
    },
    [formGroup.onSubmit]
  );

  return (
    <div className="App">
      {renderControls()}
      <RxButtonSubmit formGroupRef={formGroup} />
      <RxButtonClear formGroupRef={formGroup} />
    </div>
  );
};

export default App;
