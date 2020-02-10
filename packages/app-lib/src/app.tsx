import React, { ReactElement, useEffect, useState } from 'react';
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
  const [refresh, shouldRefresh] = useState(false);
  formGroup.validationTrigger = ValidationTriggerEnum.onAsync;
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
      <RxFormControl
        key={controlRef.key}
        controlRef={controlRef}
        refresh={refresh}
      />
    ));
  }

  useEffect(
    () => {
      const subscription = formGroup.onSubmit.subscribe(() => {
        console.log('....');
      });
      const cancelSubscription = formGroup.onClear.subscribe(() => {
        // console.log('....??', formGroup.controls);
        // shouldRefresh(true);
      });
      return () => {
        subscription.unsubscribe();
        cancelSubscription.unsubscribe();
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
