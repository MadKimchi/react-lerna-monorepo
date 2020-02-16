import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect
} from 'react';
import { debounceTime, takeWhile, takeUntil } from 'rxjs/operators';
import Button from '@material-ui/core/Button';

import { IFormGroupProps } from '../../interfaces/group.interface';
import { ValidationTriggerEnum } from '../../enums';

export const RxButtonSubmit: FunctionComponent<IFormGroupProps> = ({
  formGroupRef
}): ReactElement => {
  const initialValidty =
    formGroupRef.validationTrigger !== ValidationTriggerEnum.onAsync;
  const [invalid, setInvalid] = useState(initialValidty);
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
  }

  return (
    <Button
      type="button"
      variant="contained"
      color="primary"
      disabled={invalid}
      onClick={onClick}
    >
      Submit
    </Button>
  );
};
