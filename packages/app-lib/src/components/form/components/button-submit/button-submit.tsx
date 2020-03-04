import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect
} from 'react';
import { debounceTime, takeWhile, takeUntil } from 'rxjs/operators';
import Button from '@material-ui/core/Button';

import { ValidationTriggerEnum } from '../../../form/enums';
import { RxFormGroupRef } from '../../classes';

interface IRxButtonSubmitProps {
  formGroupRef: RxFormGroupRef;
  submitLabel?: string;
  onSubmit?: (payload: { [key: string]: any }) => void; // TODO: evalue if this is still needed
}

export const RxButtonSubmit: FunctionComponent<IRxButtonSubmitProps> = ({
  formGroupRef,
  // TODO: this should be handled by language service
  submitLabel = 'Submit',
  onSubmit
}): ReactElement => {
  const initialValidty = getInitialValidity();
  const [invalid, setInvalid] = useState(initialValidty);

  function getInitialValidity(): boolean {
    if (formGroupRef.validationTrigger !== ValidationTriggerEnum.onAsync) {
      return formGroupRef.invalid;
    }
    return true;
  }

  useEffect(
    () => {
      formGroupRef.onDebounce
        .pipe(
          takeWhile(
            () =>
              formGroupRef.validationTrigger !== ValidationTriggerEnum.onAsync
          ),
          takeUntil(formGroupRef.unsubscribe),
          debounceTime(formGroupRef.debounceTimer)
        )
        .subscribe(() => {
          setInvalid(formGroupRef.invalid);
        });

      formGroupRef.onClear
        .pipe(takeUntil(formGroupRef.unsubscribe))
        .subscribe(() => {
          setInvalid(formGroupRef.invalid);
        });
      return () => {
        formGroupRef.unsubscribe.next();
        formGroupRef.unsubscribe.complete();
      };
    },
    [formGroupRef]
  );

  function onClick(): void {
    formGroupRef.onSubmit.next();
    if (onSubmit) {
      onSubmit(formGroupRef.values)
    }
  }

  return (
    <Button
      type="button"
      variant="contained"
      color="primary"
      disabled={invalid}
      onClick={onClick}>
      {submitLabel}
    </Button>
  );
};
