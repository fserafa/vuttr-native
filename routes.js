import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Header, Button } from 'react-native-elements';

import Index from './src/pages/Index';
import Add from './src/pages/Add';

const ADD = (props) => {
    return (
        <Button
            icon={{
                name: "add",
                size: 15,
                color: "white"
            }}
            title=""
            onPress={() => props.navigation.navigate('Add')}
        />
    )
}
const App = createStackNavigator({
    Index: {
        screen: Index,
        navigationOptions: {
            header: () => <Header
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                rightComponent={{ icon: 'add', style: { color: '#fff' } }}
            />
        }
    },
    Add: {
        screen: Add
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