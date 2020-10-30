import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BackHandler } from 'react-native';
import AppStyles from '../../assets/styles/AppStyles';
import ScheduleScreen from '../screens/ScheduleScreen';

class ScheduleStack extends React.PureComponent {
    render() {
        const Stack = createStackNavigator();

        return (
            <Stack.Navigator>
                <Stack.Screen name="ScheduleStack"
                    component={ScheduleScreen}
                    options={{
                        title: "Lịch học",
                        headerTitleStyle: AppStyles.headerBar
                    }}
                />     
            </Stack.Navigator>
        );
    }
}

export default ScheduleStack;