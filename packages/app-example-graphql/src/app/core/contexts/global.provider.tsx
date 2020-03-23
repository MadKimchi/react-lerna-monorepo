import React, { FunctionComponent, useContext } from 'react';
import { GlobalContext } from './global.context';

export const GlobalProvider: FunctionComponent = ({ children }) => {
    const context = useContext(GlobalContext);
    return <GlobalContext.Provider value={context}>
        { children }
    </GlobalContext.Provider>
};