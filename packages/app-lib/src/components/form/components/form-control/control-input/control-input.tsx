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

import { IFormControlProps } from '../../../interfaces';
import { ValidationTriggerEnum } from '../../../enums';

export const ControlInput: FunctionComponent<IFormControlProps> = ({
  controlRef
}): ReactElement => {
  const [shrink, setShrink] = useState(false);
  const [error, setError] = useState(false);
  const trigger = controlRef.formGroupRef.validationTrigger;

  const ref = useRef();
  const props = useRef<FilledInputProps>({});
  props.current.id = controlRef.key;
  props.current.inputRef = ref;

  // callbacks
  props.current.onClick = () => {
    if (!controlRef.isTouched) {
      controlRef.isTouched = true;
    }
  };

  props.current.onChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  props.current.onFocus = (): void => {
    setShrink(true);
  };

  props.current.onBlur = (): void => {
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
          takeUntil(controlRef.unsubscribe)
        )
        .subscribe(() => {
          setError(controlRef.invalid);
        });

      controlRef.formGroupRef.onClear
        .pipe(takeUntil(controlRef.unsubscribe))
        .subscribe(() => {
          controlRef.clear();
          (ref.current as any).value = controlRef.value;
          setError(false);
          setShrink(false);
        });

      return () => {
        controlRef.unsubscribe.next();
        controlRef.unsubscribe.complete();
      };
    },
    [controlRef, trigger]
  );

  return (
    <FormControl variant="filled" error={error}>
      <InputLabel htmlFor="field-email" shrink={shrink}>
        {controlRef.label}
      </InputLabel>
      <FilledInput {...props.current} />
      {error &&
        controlRef.errors.map((error: string, index: number) => (
          <FormHelperText id="my-helper-text" key={index}>
            {error}
          </FormHelperText>
        ))}
    </FormControl>
  );
};
