import React, { ReactElement, useEffect, useState } from 'react';
import { debounceTime, takeUntil } from 'rxjs/operators';

import {
  RxFormControl
} from '../../..';
import { RxFormGroupRef, RxFormControlRef, RxSelectControlRef } from '../../classes';
import { IRxFormControlRef } from '../../interfaces';
import { ValidationTriggerEnum, ControlTypeEnum } from '../../enums';
import { StringValidator } from '../../validators';
import { IControlSelectOption } from '../../components';
import { RxForm } from '../../form';

import { useStyles } from '../_styles_/example.style';

// export default {
//   title: 'Components/RxForm',
//   component: RxForm
// };

export const onDebounce5000MS = () => {
  const classes = useStyles();
  const [valueJSON, setValueJSON] = useState('');

  const formGroup = new RxFormGroupRef();
  formGroup.validationTrigger = ValidationTriggerEnum.onSync;
  formGroup.debounceTimer = 5000;

  const form = buildForm(formGroup);

  function buildForm(formGroup: RxFormGroupRef): IRxFormControlRef[] {
    buildInputControl('1', formGroup);
    buildInputControl('2', formGroup);
    buildInputControl('3', formGroup);
    buildSelectControl('4', formGroup);
    buildSelectControl('5', formGroup);
    buildSelectControl('6', formGroup);
  
    return Object.values(formGroup.controls).map(
      (control: IRxFormControlRef) => control
    );
  }
  
  function buildInputControl(key: string, formGroupRef: RxFormGroupRef): void {
    const inputControl = new RxFormControlRef(key, ControlTypeEnum.input);
    inputControl.label = `some label ${key}`;
    inputControl.validators = [StringValidator(3)];
  
    formGroupRef.addControl(inputControl);
  }
  
  function buildSelectControl(key: string, formGroupRef: RxFormGroupRef): void {
    const selectControl = new RxSelectControlRef(key, ControlTypeEnum.select);
    selectControl.label = `some label ${key}`;
    selectControl.validators = [selectValidator(3)];
    selectControl.isMultiple = true;
    selectControl.options = getOptions();
  
    formGroupRef.addControl(selectControl);
  }
  
  function renderControls(): ReactElement[] {
    return form.map((controlRef: IRxFormControlRef) => (
      <div className={classes.control} key={controlRef.key}>
        <RxFormControl controlRef={controlRef} />
      </div>
    ));
  }

  useEffect(
    () => {
      formGroup.onDebounce
        .pipe(
          takeUntil(formGroup.unsubscribe),
          debounceTime(formGroup.debounceTimer)
        )
        .subscribe(() => {
          // do your request inside the pipe and chain into the subscription
          const stringified = JSON.stringify(formGroup.values);
          setValueJSON(stringified);
        });

      formGroup.onClear
        .pipe(takeUntil(formGroup.unsubscribe))
        .subscribe(() => {
          setValueJSON('');
        });

      return () => {
        formGroup.unsubscribe.next();
        formGroup.unsubscribe.complete();
      };
    },
    [formGroup]
  );

  return (
    <div className={classes.column}>
      <RxForm formGroupRef={formGroup}>
        { renderControls() }
      </RxForm>
  <pre>{ valueJSON }</pre>
    </div>
  );
};

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

onDebounce5000MS.story = {
  title: 'Components/RxForm',
  component: RxForm,
  name: 'Debounce in 5000ms'
}