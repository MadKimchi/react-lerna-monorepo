import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect
} from 'react';
import { debounceTime, filter } from 'rxjs/operators';

import { RxFormControlRef } from '../../classes';
import { IFormGroupProps } from '../../interfaces/group.interface';
import { ValidationTriggerEnum } from '../../enums';

export const RxButtonClear: FunctionComponent<IFormGroupProps> = ({
  formGroupRef
}): ReactElement => {
  const initialValidty =
    formGroupRef.validationTrigger !== ValidationTriggerEnum.onAsync;
  const [invalid, setInvalid] = useState(initialValidty);
  useEffect(
    () => {
      const subscription = formGroupRef.onDebounce
        .pipe(
          filter(
            () =>
              formGroupRef.validationTrigger !== ValidationTriggerEnum.onAsync
          ),
          debounceTime(formGroupRef.debounceTimer)
        )
        .subscribe(() => setInvalid(formGroupRef.invalid));
      return () => subscription.unsubscribe();
    },
    [formGroupRef.onDebounce, formGroupRef.controls, formGroupRef.invalid]
  );

  function onClick(): void {
    formGroupRef.onSubmit.next();
  }

  return (
    <button disabled={invalid} onClick={onClick}>
      submit
    </button>
  );
};
