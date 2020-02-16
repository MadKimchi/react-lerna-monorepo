import React, { ReactElement, useEffect, useState } from 'react';
import { debounceTime, takeWhile, takeUntil } from 'rxjs/operators';

import {
  RxFormControl,
  RxButtonSubmit,
  RxButtonClear
} from '../../../components';
import { RxFormGroupRef, RxFormControlRef } from '../classes';
import { IRxFormControlRef } from '../interfaces';
import { ValidationTriggerEnum, ControlTypeEnum } from '../enums';
import { StringValidator } from '../validators';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonWrapper: {
    justifyContent: 'flex-end'
  },
  button: {
    marginLeft: '5px'
  },
  control: {
    paddingBottom: '10px'
  }
});

export default {
  title: 'Components/RxFormControl/Input',
  component: RxFormControl
};
export const validateOnBlur = () => {
  const controlRef = new RxFormControlRef('inputKey', ControlTypeEnum.input);
  controlRef.label = 'Input Label';
  controlRef.validators = [StringValidator(3)];

  const formGroupRef = new RxFormGroupRef();
  formGroupRef.addControl(controlRef);
  formGroupRef.validationTrigger = ValidationTriggerEnum.onBlur;

  return <RxFormControl controlRef={controlRef} />;
};

validateOnBlur.story = {
  parameters: {
    notes: 'A small component'
  }
};

export const withFormGroup = () => {
  const classes = useStyles();
  const formGroup = new RxFormGroupRef();
  formGroup.validationTrigger = ValidationTriggerEnum.onBlur;

  const form = buildForm(formGroup);

  function buildForm(formGroup: RxFormGroupRef): IRxFormControlRef[] {
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

  function renderControls(): ReactElement[] {
    return form.map((controlRef: IRxFormControlRef) => (
      <div
        className={`${classes.control} ${classes.column}`}
        key={controlRef.key}
      >
        <RxFormControl controlRef={controlRef} />
      </div>
    ));
  }

  return (
    <div className={classes.column}>
      <form className={classes.column}>
        {renderControls()}
        <div className={`${classes.row} ${classes.buttonWrapper}`}>
          <RxButtonClear formGroupRef={formGroup} />
          <RxButtonSubmit formGroupRef={formGroup} />
        </div>
      </form>
    </div>
  );
};

export const onDebounce5000MS = () => {
  const classes = useStyles();
  const [valueJSON, setValueJSON] = useState('');

  const formGroup = new RxFormGroupRef();
  formGroup.validationTrigger = ValidationTriggerEnum.onSync;
  formGroup.debounceTimer = 5000;

  const form = buildForm(formGroup);

  function buildForm(formGroup: RxFormGroupRef): IRxFormControlRef[] {
    buildInputControl('key1', formGroup);
    buildInputControl('key2', formGroup);
    buildInputControl('key3', formGroup);
    buildInputControl('key4', formGroup);
    buildInputControl('key5', formGroup);

    return Object.values(formGroup.controls).map(
      (control: IRxFormControlRef) => control
    );
  }

  function buildInputControl(key: string, formGroupRef: RxFormGroupRef): void {
    const inputControl = new RxFormControlRef(key, ControlTypeEnum.input);
    inputControl.label = `some label ${key}`;

    formGroupRef.addControl(inputControl);
  }

  function renderControls(): ReactElement[] {
    return form.map((controlRef: IRxFormControlRef) => (
      <div
        className={`${classes.control} ${classes.column}`}
        key={controlRef.key}
      >
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
        // do your request inside the pipe and chain into the subscription
        .subscribe(() => {
          const stringified = JSON.stringify(formGroup.values);
          setValueJSON(stringified);
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
      <form className={classes.column}>
        {renderControls()}
        <pre>{valueJSON}</pre>
      </form>
    </div>
  );
};
