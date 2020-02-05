import React, { FunctionComponent, ReactElement } from 'react';
import { ControlInput } from './components';
import { ControlTypeEnum } from './enums/control-type.enum';
import { IFormControlProps } from './interfaces';

export const RxFormControl: FunctionComponent<IFormControlProps> = ({
  controlRef
}): ReactElement => {
  const buildControl = (): ReactElement => {
    if (controlRef.type === ControlTypeEnum.input) {
      return <ControlInput controlRef={controlRef} />;
    }

    return <></>;
  };

  return buildControl();
};
