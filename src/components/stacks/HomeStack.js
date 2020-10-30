import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import AppStyles from '../../assets/styles/AppStyles';
import LoginScreen from '../screens/LoginScreen';

class HomeStack extends React.Component {
    render() {
        const Stack = createStackNavigator();

        return (
            <Stack.Navigator>
                <Stack.Screen name="HomeStack"
                    component={HomeScreen}
                    options={{
                        title: "Trang chủ",
                        headerTitleStyle: AppStyles.headerBar
                    }}
                />
                <Stack.Screen name="LoginStack"
                    component={LoginScreen}
                    options={{
                        title: "Đăng nhập",
                        headerTitleStyle: AppStyles.headerBar
                    }}
                />        
            </Stack.Navigator>
        );
    }
}

export default HomeStack;