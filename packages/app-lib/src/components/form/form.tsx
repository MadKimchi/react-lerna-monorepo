import React, { FunctionComponent, ReactElement } from 'react';
import { RxFormGroupRef } from './classes';
import { RxButtonSubmit, RxButtonClear } from './components';
import { useStyles } from './form.style';

interface IRxFormProps {
    formGroupRef: RxFormGroupRef;
    showDefaultActions?: boolean;
    submitLabel?: string;
    clearLabel?: string;
}

export const RxForm: FunctionComponent<IRxFormProps> = ({
    formGroupRef,
    showDefaultActions = true,
    submitLabel,
    clearLabel,
    children
}): ReactElement => {
    const classes = useStyles()
    
    return (
        <form>
            { children }
            { showDefaultActions &&
                <div className={classes.formActionContainer}>
                    <RxButtonClear
                        formGroupRef={formGroupRef}
                        clearLabel={clearLabel}/>
                    <RxButtonSubmit
                        formGroupRef={formGroupRef}
                        submitLabel={submitLabel} />
                </div>
            }
        </form>
    )
};
