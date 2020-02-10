import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect,
  ChangeEvent,
  useRef
} from 'react';

import { takeUntil, takeWhile } from 'rxjs/operators';

import FilledInput, { FilledInputProps } from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { IFormControlProps } from '../../interfaces';
import { ValidationTriggerEnum } from '../../enums';

export const ControlInput: FunctionComponent<IFormControlProps> = ({
  controlRef
}): ReactElement => {
  const [shrink, setShrink] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef();
  const trigger = controlRef.formGroupRef.validationTrigger;

  const props: FilledInputProps = {};
  props.id = controlRef.key;
  props.inputRef = ref;
  // callbacks
  props.onClick = () => {
    if (!controlRef.isTouched) {
      controlRef.isTouched = true;
    }
  };

  props.onChange = (event: ChangeEvent<HTMLInputElement>) => {
    controlRef.value = event.target.value;

    // possibly move this logic to class setter
    if (!controlRef.isDirty) {
      controlRef.isDirty = true;
    }

    if (
      error !== controlRef.invalid &&
      trigger !== ValidationTriggerEnum.onBlur
    ) {
      setError(controlRef.invalid);
    }

    controlRef.formGroupRef.onDebounce.next();
  };

  props.onFocus = (): void => {
    setShrink(true);
  };

  props.onBlur = (): void => {
    if (!controlRef.value) {
      setShrink(false);
    }
    setError(controlRef.invalid);
  };

  useEffect(
    () => {
      controlRef.formGroupRef.onSubmit
        .pipe(
          takeWhile(() => trigger === ValidationTriggerEnum.onAsync),
          takeUntil(controlRef.formGroupRef.unsubscribe)
        )
        .subscribe(() => {
          setError(controlRef.invalid);
        });

      controlRef.formGroupRef.onClear
        .pipe(takeUntil(controlRef.formGroupRef.unsubscribe))
        .subscribe(() => {
          (ref.current as any).value = '';
          setError(false);
          setShrink(false);
        });

      return () => {
        // controlRef.formGroupRef.unsubscribe.next();
        // controlRef.formGroupRef.unsubscribe.complete();
      };
    },
    [
      trigger,
      controlRef.invalid,
      controlRef.formGroupRef.onSubmit,
      controlRef.formGroupRef.onClear,
      controlRef.formGroupRef.unsubscribe
    ]
  );

  return (
    <FormControl variant="filled" error={error}>
      <InputLabel htmlFor="field-email" shrink={shrink}>
        {controlRef.label}
      </InputLabel>
      <FilledInput {...props} />
      {error && (
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      )}
    </FormControl>
  );
};
