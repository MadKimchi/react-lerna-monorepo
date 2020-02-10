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
  function onClick(): void {
    formGroupRef.onClear.next();
  }

  return <button onClick={onClick}>clear</button>;
};
