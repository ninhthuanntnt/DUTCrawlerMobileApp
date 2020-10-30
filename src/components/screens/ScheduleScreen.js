import React from 'react';
import { Text, View, StatusBar, BackHandler } from 'react-native';
import { loadSchedule } from '../../actions';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import AppStyles from '../../assets/styles/AppStyles';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressLoader from 'rn-progress-loader';

class ScheduleScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            curSemester: "1/2020-2021"
        }

        this.props.navigation.addListener('focus', this.componentDidFocus);
        this.props.navigation.addListener('blur', ()=>{
            BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBack);
        });
    }

    onHardwareBack = ()=>{
        this.props.navigation.navigate('HomeStack');

        return true;
    }

    loadSchedule = (curSemester) => {
        SecureStore.getItemAsync('token')
            .then(token => this.props.loadSchedule(token, this.getSemesterCode(curSemester)));
    }

    getSemesterCode = (curSemester) => {
        let index = curSemester.indexOf("/");
        let prefixType = curSemester.substring(index + 3, index + 5);
        let subfix = curSemester.substring(0, index);
        let subfixType = ((subfix.indexOf("Hè") !== -1) ? "21" : subfix + "0");

        return prefixType + subfixType;
    }

    renderItem = ({ item }) => {

        return (
            <View style={AppStyles.flatList_item} key={item.code}>
                <Text style={AppStyles.flatList_title}>Môn: {item.name}</Text>
                <Text>Lịch: {item.schedule}</Text>
                <Text>Số tín chỉ: {item.credit}</Text>
            </View>
        );
    }

    render() {

        return (
            <SafeAreaView style={AppStyles.container}>
                <StatusBar barStyle="default" />
                <FlatList
                    style={AppStyles.flatList}
                    data={this.props.schedule}
                    renderItem={this.renderItem}
                    keyExtractor={data => data.code}
                    showsVerticalScrollIndicator={false}
                />
                <ProgressLoader
                    visible={this.props.schedule.length <= 0}
                    isModal={false}
                    hudColor={"#000000"}
                    color={"#FFFFFF"} />
            </SafeAreaView>
        );
    }

    componentDidFocus = () => {
        BackHandler.addEventListener("hardwareBackPress", this.onHardwareBack);
        this.loadSchedule(this.state.curSemester);
    }
}

var mapStateToProps = (state) => ({
    schedule: state.schedule,
    loginedData: state.loginedData
});

var mapDispatchToProps = (dispatch) => ({
    loadSchedule: (token, type) => dispatch(loadSchedule(token, type))
});


export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen);