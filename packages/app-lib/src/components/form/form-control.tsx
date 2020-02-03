import React, { FunctionComponent, ReactElement } from 'react';
import { ControlInput } from './components/control-input';
import { LibFormControlConfig } from './classes/form-control-config.class';
import { ControlTypeEnum } from './enums/control-type.enum';

interface IFormControlProps {
  config: LibFormControlConfig;
}

export const LibFormControl: FunctionComponent<IFormControlProps> = ({
  config
}): ReactElement => {
  const buildControl = (): ReactElement => {
    if (config.type === ControlTypeEnum.input) {
      return <ControlInput config={config} />;
    }

    return <></>;
  };

  return buildControl();
};
