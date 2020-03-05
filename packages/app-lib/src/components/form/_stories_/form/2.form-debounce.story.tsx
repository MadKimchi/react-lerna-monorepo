import React, { ReactElement, useEffect, useState } from 'react';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { RxFormGroupRef, RxFormControlRef, RxSelectControlRef } from '../../classes';
import { IRxFormControlRef } from '../../interfaces';
import { ControlTypeEnum } from '../../enums';
import { IControlSelectOption } from '../../components';
import { RxFormControl } from '../../form-control';
import { RxForm } from '../../form';

import { useStyles } from '../_styles_/example.style';

export default {
  title: 'Components/RxForm',
  component: RxForm
};
// TODO: Refactor this wiht useRef to fix a bug
export const DebounceForm = () => {
  const classes = useStyles();
  const [valueJSON, setValueJSON] = useState('');

  const formGroup = new RxFormGroupRef();
  formGroup.debounceTimer = 2000;

  const form = buildForm(formGroup);

  function buildForm(formGroup: RxFormGroupRef): IRxFormControlRef[] {
    buildInputControl('key1', formGroup);
    buildInputControl('key2', formGroup);
    buildSelectControl('key3', formGroup);
    buildSelectControl('key4', formGroup, false);
    
    return Object.values(formGroup.controls).map(
      (control: IRxFormControlRef) => control
    );
  }
  
  function buildInputControl(key: string, formGroupRef: RxFormGroupRef): void {
    const inputControl = new RxFormControlRef(key, ControlTypeEnum.input);
    inputControl.label = `some label ${key}`;
  
    formGroupRef.addControl(inputControl);
  }
  
  function buildSelectControl(key: string, formGroupRef: RxFormGroupRef, isMultiple: boolean = true): void {
    const selectControl = new RxSelectControlRef(key, ControlTypeEnum.select);
    selectControl.label = `some label ${key}`;
    selectControl.isMultiple = isMultiple;
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
          const stringified = JSON.stringify(formGroup.values, undefined, 4);
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
      <RxForm
        formGroupRef={formGroup}
        showDefaultActions={false}>
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

DebounceForm.story = {
  title: 'Components/RxForm',
  component: RxForm,
  name: 'Debounce in 2000ms'
}