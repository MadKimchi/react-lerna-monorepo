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
  const [isValid, setIsValid] = useState(false);
  useEffect(
    () => {
      const subscription = formGroupRef.onDebounce
        .pipe(debounceTime(3000))
        .subscribe((value: boolean) => {
          Object.values(formGroupRef.controls).forEach(
            (control: RxFormControlRef) => {
              console.log(control.key, control.value);
            }
          );

          setIsValid(formGroupRef.invalid);
        });
      return () => subscription.unsubscribe();
    },
    [formGroupRef.onDebounce, formGroupRef.controls, formGroupRef.invalid]
  );
  return <button disabled={!isValid}>submit</button>;
};
