import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import UnauthorizeScreen from './components/screens/UnauthorizeScreen';
import HomeStack from './components/stacks/HomeStack';
import NotificationStack from './components/stacks/NotificationStack';
import ScheduleStack from './components/stacks/ScheduleStack';
import ScoreStack from './components/stacks/ScoreStack';

class DUTCrawlerApp extends React.PureComponent {

    render() {

        const Tab = createBottomTabNavigator();

        console.log(this.props.loginedData);
        return (
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
                        let iconName;

                        switch (route.name) {
                            case "HomeStack":
                                iconName = "home";
                                break;
                            case "NotificationStack":
                                iconName = focused ? "notifications" : "notifications-none";
                                break;
                            case "ScheduleStack":
                                iconName = "event-note";
                                break;
                            case "ScoreStack":
                                iconName = "grade"
                                break;
                        }
                        return <Icon name={iconName} size={size} color={color} />
                    }
                })}>

                    <Tab.Screen name="HomeStack"
                        component={HomeStack}
                        options={{ tabBarLabel: "Trang chủ" }} />
                    <Tab.Screen name="NotificationStack"
                        component={NotificationStack}
                        options={{ tabBarLabel: "Thông báo" }} />
                    <Tab.Screen name="ScheduleStack"
                        component={(this.props.loginedData.token)?ScheduleStack:UnauthorizeScreen}
                        options={{ tabBarLabel: "Lịch" }} />
                    <Tab.Screen name="ScoreStack"
                        component={(this.props.loginedData.token)?ScoreStack:UnauthorizeScreen}
                        options={{ tabBarLabel: "Điểm" }} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

var mapStateToProps = (state)=>({
    loginedData: state.loginedData
});

export default connect(mapStateToProps, null)(DUTCrawlerApp);
