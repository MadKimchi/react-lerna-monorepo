import React, { FunctionComponent, ReactElement } from 'react';
import Button from '@material-ui/core/Button';

import { IFormGroupProps } from '../../interfaces/group.interface';

export const RxButtonClear: FunctionComponent<IFormGroupProps> = ({
  formGroupRef
}): ReactElement => {
  function onClick(): void {
    formGroupRef.onClear.next();
  }

  return (
    <Button type="button" onClick={onClick}>
      Clear
    </Button>
  );
};
