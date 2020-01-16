import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Header, Button } from 'react-native-elements';

import Index from './src/pages/Index';
import Add from './src/pages/Add';
import { Text, View } from 'react-native';

const AddBt = (props) => {
    return (
        <Button
            icon={{
                name: "add",
                size: 25,
                color: "white",
            }}
            title=""
            type="clear"
            onPress={() => props.navigation.navigate('Add')}
        />
    )
}
const App = createStackNavigator({
    Index: {
        screen: Index,

        navigationOptions: ({ navigation }) => ({
            title: 'VUTTR',
            headerRight: () => (
                <AddBt navigation={navigation} /> 
            )
            // header: ( 
            //     <Header
            //         style={{ backgroundColor: '#1976d2' }}
            //         centerComponent={{ text: 'VUTTR', style: { color: '#fff', fontSize: 18 } }}
            //         rightComponent={}
            //     />
            // )
        })
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
            backgroundColor: "#3f51b5",
        }
    },
    mode: 'modal'
});


export default createAppContainer(App);