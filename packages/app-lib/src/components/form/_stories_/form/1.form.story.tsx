import React, { useState } from 'react';

import { RxFormGroupRef, RxFormControlRef, RxSelectControlRef } from '../../classes';
import { ControlTypeEnum } from '../../enums';
import { RxForm } from '../../form';
import { IControlSelectOption } from '../../components';
import { RxFormControl } from '../../form-control';
import { useStyles } from '../_styles_/example.style';

export default {
  title: 'Components/RxForm',
  component: RxForm
};

export const DefaultForm = () => {
  const classes = useStyles();
  const [JSONValue, setJSONValue] = useState('');

  const inputControl = new RxFormControlRef('inputControlKey', ControlTypeEnum.input);
  inputControl.label = 'Input Label';

  const singleSelectControl = new RxSelectControlRef('singleSelectControlKey', ControlTypeEnum.select);
  singleSelectControl.label = 'Single Select Label';
  singleSelectControl.options = getOptions();

  const multiSelectControl = new RxSelectControlRef('multiSelectControlKey', ControlTypeEnum.select);
  multiSelectControl.label = 'Multi Select Label';
  multiSelectControl.isMultiple = true;
  multiSelectControl.options = getOptions();

  const formGroupRef = new RxFormGroupRef();
  formGroupRef.addControl(inputControl);
  formGroupRef.addControl(singleSelectControl);
  formGroupRef.addControl(multiSelectControl);

  function onSubmit(payload: { [key: string]: any }): void {
    setJSONValue(JSON.stringify(payload, undefined, 4))
  }

  function onClear(): void {
    setJSONValue('')
  }
  
  return (
    <div className={classes.column}>
      <RxForm
        formGroupRef={formGroupRef}
        onSubmit={onSubmit}
        onClear={onClear}>
        <div className={classes.control}>
          <RxFormControl controlRef={inputControl} />
        </div>
        <div className={classes.control}>
          <RxFormControl controlRef={singleSelectControl} />  
        </div>
        <div className={classes.control}>
          <RxFormControl controlRef={multiSelectControl} />
        </div>
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
