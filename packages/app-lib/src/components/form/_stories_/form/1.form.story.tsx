import React, { useState} from 'react';

import { RxForm } from '../../form';
import { RxFormControl } from '../../form-control';
import { useStyles } from '../_styles_/example.style';
import { useInput, useSelect } from '../../hooks';
import { useFormGroup } from '../../hooks/useForm';
import { getSelectOptions, buildFormOutput } from '../_utills_/story.utill';

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
  const nameList = getSelectOptions();

  const formGroup = useFormGroup();
  const controlKey1 = useInput('key1'); // TODO: give more meaningful name if used in prod
  const controlKey2 = useSelect('key2', nameList);
  const controlKey3 = useSelect('key3', nameList, true);

  formGroup.addControl(controlKey1);
  formGroup.addControl(controlKey2);
  formGroup.addControl(controlKey3);

  function onFormAction(): void {
    const output = buildFormOutput(formGroup);
    const stringified = JSON.stringify(output, undefined, 4);
    setJSONValue(stringified);
  }

  return (
    <div className={classes.column}>
      <RxForm
        formGroupRef={formGroup}
        onSubmit={onFormAction}
        onClear={onFormAction}
      >
        <div className={classes.control}>
          <RxFormControl controlRef={controlKey1} />
        </div>
        <div className={classes.control}>
          <RxFormControl controlRef={controlKey2} />
        </div>
        <div className={classes.control}>
          <RxFormControl controlRef={controlKey3} />
        </div>
      </RxForm>
      <pre>{JSONValue}</pre>
    </div>
  );
};

DefaultForm.story = {
  title: 'Components/RxForm',
  component: RxForm,
  name: 'Default Form'
};
