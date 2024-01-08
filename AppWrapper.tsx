import {AppProvider, UserProvider} from '@realm/react';
import React from 'react';
import RealmWrapper from './RealmWrapper';

function AppWrapper(): JSX.Element {
  return (
    // IMPORTANT: ADD YOUR APP ID BELOW
    <AppProvider id={'APP_ID_HERE'}>
      <UserProvider fallback={<RealmWrapper />}>
        <RealmWrapper />
      </UserProvider>
    </AppProvider>
  );
}

export default AppWrapper;
