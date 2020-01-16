import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Index from './src/pages/Index';

const App = createStackNavigator({
    Index: {
        screen: Index
    },
}, {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerBackTitle: null,
        headerStyle: {
            backgroundColor: "#402039",
        }
    }, 
    mode: 'modal'
});


export default createAppContainer(App);