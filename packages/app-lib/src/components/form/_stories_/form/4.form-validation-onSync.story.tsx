import React, { ReactElement, useEffect, useState } from 'react';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { RxFormGroupRef, RxFormControlRef, RxSelectControlRef } from '../../classes';
import { IRxFormControlRef } from '../../interfaces';
import { ControlTypeEnum, ValidationTriggerEnum } from '../../enums';
import { IControlSelectOption } from '../../components';
import { RxFormControl } from '../../form-control';
import { RxForm } from '../../form';

import { useStyles } from '../_styles_/example.style';
import { StringValidator } from '../../validators';

export default {
  title: 'Components/RxForm',
  component: RxForm
};

export const SyncValidationForm = () => {
  const classes = useStyles();
  const [valueJSON, setValueJSON] = useState('');

  const formGroup = new RxFormGroupRef();
  formGroup.validationTrigger = ValidationTriggerEnum.onSync;

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
    inputControl.validators = [StringValidator(3)]
  
    formGroupRef.addControl(inputControl);
  }
  
  function buildSelectControl(key: string, formGroupRef: RxFormGroupRef, isMultiple: boolean = true): void {
    const selectControl = new RxSelectControlRef(key, ControlTypeEnum.select);
    selectControl.label = `some label ${key}`;
    selectControl.isMultiple = isMultiple;
    
    const minSelection = isMultiple ? 3 : 1;
    selectControl.validators = [selectValidator(minSelection)];
    selectControl.options = getOptions();
  
    formGroupRef.addControl(selectControl);
  }

  function selectValidator(minLength: number): Function {
    return (value: any[]): { key: string; msg: string } | null => {
      const hasError = (!!value && value.length < minLength) || !value;
      return hasError
        ? { key: 'minLength', msg: `At least ${minLength} characters` }
        : null;
    };
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

SyncValidationForm.story = {
  title: 'Components/RxForm',
  component: RxForm,
  name: 'Validation on Sync'
}