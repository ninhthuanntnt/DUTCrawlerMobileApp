import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AppStyles from '../../assets/styles/AppStyles';
import ScoreScreen from '../screens/ScoreScreen';

class ScoreStack extends React.Component {
    render() {
        const Stack = createStackNavigator();

        return (
            <Stack.Navigator>
                <Stack.Screen name="ScoreStack"
                    component={ScoreScreen}
                    options={{
                        title: "Điểm",
                        headerTitleStyle: AppStyles.headerBar
                    }}
                />     
            </Stack.Navigator>
        );
    }
}

export default ScoreStack;