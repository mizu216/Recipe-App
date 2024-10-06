import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/appNavigation'
import {NavigationContainer} from '@react-navigation/native';
import { navigationRef } from './src/services/navigationService';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
//according to react navigation, we must use SafeAreaProvider to wrap navigation container
//then inide each screen, we put safeareaview only it will have effects

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'}/>
        <SafeAreaProvider>
          <PaperProvider>
            <GestureHandlerRootView>
              <NavigationContainer ref={navigationRef}>
                <AppNavigator />
              </NavigationContainer>
            </GestureHandlerRootView>
          </PaperProvider>
      </SafeAreaProvider>
    </>
  );
};

export default App;