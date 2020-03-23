import React from 'react';
import { AppService } from '../services/app.service';

export const ServiceContext = React.createContext(new AppService());
