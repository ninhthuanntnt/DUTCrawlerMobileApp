import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AppStyles from '../../assets/styles/AppStyles';
import ScheduleScreen from '../screens/ScheduleScreen';

class ScheduleStack extends React.Component {
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