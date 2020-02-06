import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect
} from 'react';
import { debounceTime } from 'rxjs/operators';

import { RxFormControlRef } from '../../classes';
import { IFormGroupProps } from '../../interfaces/group.interface';

export const RxButtonSubmit: FunctionComponent<IFormGroupProps> = ({
  formGroupRef
}): ReactElement => {
  const [invalid, setInvalid] = useState(true);
  useEffect(
    () => {
      const subscription = formGroupRef.onDebounce
        .pipe(debounceTime(formGroupRef.debounceTimer))
        .subscribe(() => setInvalid(formGroupRef.invalid));
      return () => subscription.unsubscribe();
    },
    [formGroupRef.onDebounce, formGroupRef.controls, formGroupRef.invalid]
  );
  return <button disabled={invalid}>submit</button>;
};
