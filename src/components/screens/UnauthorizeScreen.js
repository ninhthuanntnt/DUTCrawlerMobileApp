import React from 'react';
import { BackHandler, SafeAreaView, Text, View } from 'react-native';
import AppStyles from '../../assets/styles/AppStyles';

class UnauthorizeScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        let navigation = this.props.navigation;
        navigation.addListener('focus', ()=>{
            BackHandler.addEventListener("hardwareBackPress", this.onHardwareBack);
        });
        navigation.addListener('blur', ()=>{
            BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBack);
        });
    }

    onHardwareBack = ()=>{
        this.props.navigation.navigate('HomeStack');

        return true;
    }

    render() {
        
        return (
            <SafeAreaView style={AppStyles.container}>
                <Text style={{fontSize:100}}>401</Text>
                <Text style={{fontSize:35, marginBottom:15}}>Unauthorized</Text>
                <Text style={{fontSize:16}}>Vui lòng đăng nhập để sử dụng chức năng này</Text>
            </SafeAreaView>
        );
    }
}
export default UnauthorizeScreen;