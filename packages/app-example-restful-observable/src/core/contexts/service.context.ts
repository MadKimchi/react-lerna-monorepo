import React from 'react';
import { AppService } from '../services';

export const ServiceContext = React.createContext(new AppService());