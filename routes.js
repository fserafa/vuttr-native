import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Index from './src/pages/Index';
import Add from './src/pages/Add';

const Routes = createAppContainer(
    createStackNavigator({
        Index: {
            screen: Index,
            navigationOptions: ({
                title: 'Very Useful Tools To Remember'
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
                elevation: 0,
                shadowOpacity: 0,
            }
        },
        mode: 'modal'
    })
)


export default Routes;