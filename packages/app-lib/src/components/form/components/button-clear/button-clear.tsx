import React, { FunctionComponent, ReactElement } from 'react';
import Button from '@material-ui/core/Button';

import { RxFormGroupRef } from '../../classes';

interface IRxButtonClearProps {
  formGroupRef: RxFormGroupRef;
  clearLabel?: string;
  onClear?: () => void;
}

export const RxButtonClear: FunctionComponent<IRxButtonClearProps> = ({
  formGroupRef,
  // TODO: this should be handled by language service
  clearLabel = 'Clear',
  onClear // TODO: evaluate if this is still needed with rxjs implementation
}): ReactElement => {
  function onClick(): void {
    formGroupRef.onClear.next();
    if (onClear) {
      onClear()
    }
  }

  return (
    <Button type="button" onClick={onClick}>
      {clearLabel}
    </Button>
  );
};
