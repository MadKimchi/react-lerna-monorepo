import React, { FunctionComponent, ReactElement } from 'react';

import { IFormGroupProps } from '../../interfaces/group.interface';

export const RxButtonClear: FunctionComponent<IFormGroupProps> = ({
  formGroupRef
}): ReactElement => {
  function onClick(): void {
    formGroupRef.onClear.next();
  }

  return (
    <button type="button" onClick={onClick}>
      clear
    </button>
  );
};
