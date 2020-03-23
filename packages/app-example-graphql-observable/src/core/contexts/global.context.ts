import React from 'react';
import { AppService } from '../services/app.service';
export const GlobalContext = React.createContext({
    service: new AppService()
});
