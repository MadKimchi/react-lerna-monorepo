import React from 'react';
import './App.css';
import { LibFormControl } from './components/form';
import { LibFormControlConfig } from './components/form/classes/form-control-config.class';
import { ControlTypeEnum } from './components/form/enums';
import { StringValidator } from './components/form/validators';

const App = () => {
  // const formBuilder = new FormBuilder();
  const inputControl = new LibFormControlConfig(
    'inputControl',
    ControlTypeEnum.input
  );

  inputControl.label = 'some label';
  inputControl.validators = [StringValidator(3)];

  const form = [
    buildInputControl1(),
    buildInputControl2(),
    buildInputControl3(),
    buildInputControl4(),
    buildInputControl5(),
    buildInputControl6()
  ];

  function buildInputControl1(): LibFormControlConfig {
    const inputControl = new LibFormControlConfig(
      'inputControl1',
      ControlTypeEnum.input
    );

    inputControl.label = 'some label 1';
    inputControl.validators = [StringValidator(3)];
    return inputControl;
  }
  function buildInputControl2(): LibFormControlConfig {
    const inputControl = new LibFormControlConfig(
      'inputControl2',
      ControlTypeEnum.input
    );

    inputControl.label = 'some label 2';
    inputControl.validators = [StringValidator(3)];
    return inputControl;
  }

  function buildInputControl3(): LibFormControlConfig {
    const inputControl = new LibFormControlConfig(
      'inputControl3',
      ControlTypeEnum.input
    );

    inputControl.label = 'some label 3';
    inputControl.validators = [StringValidator(3)];
    return inputControl;
  }
  function buildInputControl4(): LibFormControlConfig {
    const inputControl = new LibFormControlConfig(
      'inputControl4',
      ControlTypeEnum.input
    );

    inputControl.label = 'some label 4';
    inputControl.validators = [StringValidator(3)];
    return inputControl;
  }
  function buildInputControl5(): LibFormControlConfig {
    const inputControl = new LibFormControlConfig(
      'inputControl5',
      ControlTypeEnum.input
    );

    inputControl.label = 'some label 5';
    inputControl.validators = [StringValidator(3)];
    return inputControl;
  }
  function buildInputControl6(): LibFormControlConfig {
    const inputControl = new LibFormControlConfig(
      'inputControl6',
      ControlTypeEnum.input
    );

    inputControl.label = 'some label 6';
    inputControl.validators = [StringValidator(3)];
    return inputControl;
  }
  return (
    <div className="App">
      {form.map((config: LibFormControlConfig) => (
        <LibFormControl key={config.key} config={config} />
      ))}
    </div>
  );
};

export default App;
