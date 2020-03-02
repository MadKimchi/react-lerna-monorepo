import React, { FunctionComponent, ReactElement } from 'react';
import Button from '@material-ui/core/Button';

import { RxFormGroupRef } from '../../classes';

interface IRxButtonClearProps {
  formGroupRef: RxFormGroupRef;
  clearLabel?: string;
}

export const RxButtonClear: FunctionComponent<IRxButtonClearProps> = ({
  formGroupRef,
  // TODO: this should be handled by language service
  clearLabel = 'Clear'
}): ReactElement => {
  function onClick(): void {
    formGroupRef.onClear.next();
  }

  return (
    <Button type="button" onClick={onClick}>
      {clearLabel}
    </Button>
  );
};
