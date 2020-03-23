import React, { FunctionComponent, useContext } from 'react';
import {
    RxForm,
    RxFormControl,
    useFormGroup,
    useInput
} from '@madkimchi/core-ui';

import { ICredentialDto } from '@madkimchi/core/src/https/http-client/dtos';

import { ServiceContext } from '../core/contexts';

export const LoginPage: FunctionComponent = () => {
    const { authService } = useContext(ServiceContext);

    const formGroup = useFormGroup();
    const emailControl = useInput('email');
    const passwordControl = useInput('password');
  
    formGroup.addControl(emailControl);
    formGroup.addControl(passwordControl);

    function onSubmit(): void {
        const payload = formGroup.values as ICredentialDto;
        if (!payload) {
            return;
        }

        // NOTE: currently this does not work since there isn't a data service running with the specified endpoint
        // the error is also not handled
        authService
            .signIn(payload)
            .subscribe((loggedIn: boolean) => {
                console.log(loggedIn);
                // TODO: do something after logged in or handle error
            });
    }

    return (
        <div>
            <RxForm
                formGroupRef={formGroup}
                onSubmit={onSubmit}>
                <div>
                    <RxFormControl controlRef={emailControl} />
                </div>
                <div>
                    <RxFormControl controlRef={passwordControl} />
                </div>
            </RxForm>
        </div>
    );
}
    