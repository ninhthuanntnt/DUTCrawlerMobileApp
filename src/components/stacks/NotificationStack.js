import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AppStyles from '../../assets/styles/AppStyles';
import NotificationScreen from '../screens/NotificationScreen';

class NotificationStack extends React.PureComponent {
    render() {
        const Stack = createStackNavigator();

        return (
            <Stack.Navigator>
                <Stack.Screen name="Notification"
                    component={NotificationScreen}
                    options = {{
                        title : "Thông báo",
                        headerTitleStyle: AppStyles.headerBar
                    }}/>
            </Stack.Navigator>
        )
    }

}

export default NotificationStack;