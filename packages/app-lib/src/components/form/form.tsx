import React, { FunctionComponent, ReactElement } from 'react';
import { RxFormGroupRef } from './classes';
import { RxButtonSubmit, RxButtonClear } from './components';
import { useStyles } from './form.style';

interface IRxFormProps {
    formGroupRef: RxFormGroupRef;
    showDefaultActions?: boolean;
    submitLabel?: string;
    clearLabel?: string;
    onSubmit?: (payload: { [key: string]: any }) => void;
    onClear?: () => void;
}

export const RxForm: FunctionComponent<IRxFormProps> = ({
    formGroupRef,
    showDefaultActions = true,
    submitLabel = 'Submit',
    clearLabel = 'Clear',
    onSubmit,
    onClear,
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
                        onClear={onClear}
                        clearLabel={clearLabel}/>
                    <RxButtonSubmit
                        formGroupRef={formGroupRef}
                        onSubmit={onSubmit}
                        submitLabel={submitLabel} />
                </div>
            }
        </form>
    )
};
