import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect,
  ChangeEvent,
  useRef
} from 'react';

import { of } from 'rxjs';
import { debounceTime, takeUntil, takeWhile } from 'rxjs/operators';

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
      const subscription = controlRef.formGroupRef.onSubmit
        .pipe(
          takeWhile(() => trigger === ValidationTriggerEnum.onAsync),
          takeUntil(controlRef.unsubscribe)
        )
        .subscribe(() => {
          setError(controlRef.invalid);
        });

      const cancelSubscription = controlRef.formGroupRef.onClear
        .pipe(takeUntil(controlRef.unsubscribe))
        .subscribe(() => {
          (ref.current as any).value = '';
          setError(false);
          setShrink(false);
        });

      return () => {
        controlRef.unsubscribe.next();
        controlRef.unsubscribe.complete();
      };
    },
    [
      controlRef.formGroupRef.validationTrigger,
      controlRef.invalid,
      controlRef.formGroupRef.onSubmit
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
