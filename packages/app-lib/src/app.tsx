import React, { ReactElement } from 'react';
import './app.css';

import {
  RxFormGroupRef,
  RxFormControlRef,
  RxFormControl,
  RxButtonSubmit,
  ControlTypeEnum,
  StringValidator,
  ValidationTriggerEnum
} from './components';

const App = () => {
  const formGroup = new RxFormGroupRef();
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

  return (
    <div className="App">
      {renderControls()}
      <RxButtonSubmit formGroupRef={formGroup} />
    </div>
  );
};

export default App;
