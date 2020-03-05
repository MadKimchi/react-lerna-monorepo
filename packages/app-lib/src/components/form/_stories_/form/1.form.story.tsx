import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { takeUntil } from 'rxjs/operators';

import {
  RxFormGroupRef,
  RxFormControlRef,
  RxSelectControlRef
} from '../../classes';
import { ControlTypeEnum } from '../../enums';
import { RxForm } from '../../form';
import { IControlSelectOption } from '../../components';
import { RxFormControl } from '../../form-control';
import { useStyles } from '../_styles_/example.style';
import { IRxFormControlRef } from '../../interfaces';

export default {
  title: 'Components/RxForm',
  component: RxForm
};

const tracker = new Set<any>(); // to track the reference object count

/**
 * This is an ongoing sample work done daily in my spare time
 * It is not a production work, thus it has a few bugs.
 */
export const DefaultForm = () => {
  const classes = useStyles();
  const [JSONValue, setJSONValue] = useState('');
  const formRef = useRef(new RxFormGroupRef());

  buildInputControl('key1', formRef.current);
  buildSelectControl('key2', formRef.current);
  buildSelectControl('key3', formRef.current, true);

  function renderControls(): ReactElement[] {
    const controls = Object.values(formRef.current.controls);
    return controls.map((controlRef: IRxFormControlRef) => (
      <div className={classes.control}>
        <RxFormControl key={controlRef.key} controlRef={controlRef} />
      </div>
    ));
  }

  function buildInputControl(key: string, formGroupRef: RxFormGroupRef): void {
    const inputControl = new RxFormControlRef(key, ControlTypeEnum.input);
    inputControl.label = `Input Label ${key}`;

    const inputRef = useRef(inputControl);
    tracker.add(inputRef);
    formGroupRef.addControl(inputRef.current);
  }

  function buildSelectControl(
    key: string,
    formGroupRef: RxFormGroupRef,
    isMultiple: boolean = false
  ): void {
    const selectControl = new RxSelectControlRef(key, ControlTypeEnum.select);
    selectControl.label = `Select Label ${key}`;
    selectControl.isMultiple = isMultiple;
    selectControl.options = getOptions();

    const selectRef = useRef(selectControl);
    tracker.add(selectRef);
    formGroupRef.addControl(selectRef.current);
  }

  function onFormAction(): void {
    const output = {
      payload: formRef.current.values,
      controlReferenceCount: tracker.size // Tracking the reference count on updating states
    };
    const stringified = JSON.stringify(output, undefined, 4);
    setJSONValue(stringified);
  }

  return (
    <div className={classes.column}>
      <RxForm
        formGroupRef={formRef.current}
        onSubmit={onFormAction}
        onClear={onFormAction}
      >
        {renderControls()}
      </RxForm>
      <pre>{JSONValue}</pre>
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

DefaultForm.story = {
  title: 'Components/RxForm',
  component: RxForm,
  name: 'Default Form'
};
