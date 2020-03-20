import React, {
    cloneElement,
    ReactNode,
    ReactElement,
    FunctionComponent,
    ComponentType,
    FunctionComponentElement,
    useContext
} from 'react';

import { ApolloProvider } from 'react-apollo';

import { GlobalContext } from '../contexts/global.context';
import { graphClient } from '../https/graph/graph-client';

interface IProvider<T> {
    type: ComponentType<T>;
    value?: T;
}

export const AppProvider: FunctionComponent = ({ children }): ReactElement => {
    const globalContext = useContext(GlobalContext);

    const providers: IProvider<any>[] = [
        /**
         * TODO: add a provider like the below
         *  {
         *      type: ThemeProvider,
         *      value: { theme }
         *  }
         *  
         */
        {
            type: ApolloProvider,
            value: { client: graphClient }
        },
        {
            type: GlobalContext.Provider,
            // value: { value: globalContext }
        }
    ];

    return providers.reduce<ReactElement>((children: ReactNode, provider: IProvider<any>) => {
        return createProviderFactory(provider, children);
    }, children as ReactElement);
}

function createProviderFactory(provider: IProvider<any>, children: ReactNode): FunctionComponentElement<any> {
    const parent = <provider.type {...provider.value} />;
    return cloneElement(parent, { children });
}