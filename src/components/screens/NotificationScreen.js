import React from 'react';
import { Alert, BackHandler, FlatList, Linking, StatusBar, StyleSheet, Text, View } from 'react-native';
import HTML from "react-native-render-html";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { loadNotification } from '../../actions';
import AppStyles from '../../assets/styles/AppStyles';
import ProgressLoader from 'rn-progress-loader';

class NotificationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'general',
            page: 1,
            isLoading: false
        }
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

    openLinkInbrowser = (event, url, attrs) => {

        let isSupported = Linking.canOpenURL(url);
        if (isSupported) {
            Linking.openURL(url);
        } else {
            Alert.alert("Url isn't supported");
        }
    }

    renderItem = ({ item }) => {

        return (
            <View style={AppStyles.flatList_item}>
                <Text style={AppStyles.flatList_title}>{item.title}</Text>
                <HTML html={item.content} onLinkPress={this.openLinkInbrowser} ignoredStyles={["font-family"]} />
                <Text style={{ alignSelf: "flex-end" }}>{item.date}</Text>
            </View>
        )
    }

    previousPage = () => {
        if (this.state.page > 1) {
            this.setState({
                page: this.state.page - 1,
                isLoading: true
            });
        }
    }

    nextPage = () => {
        this.setState({
            page: this.state.page + 1,
            isLoading: true
        });
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.props.loadNotification(this.state.type, this.state.page);
        }else if(prevState.isLoading === true){
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={AppStyles.container}>
                <ProgressLoader
                    visible={(this.props.notifications.length <= 0) || (this.state.isLoading == true)}
                    isModal={false}
                    hudColor={"#000000"}
                    color={"#FFFFFF"} />

                <StatusBar barStyle="default" />

                <FlatList style={AppStyles.flatList}
                    data={this.props.notifications}
                    renderItem={this.renderItem}
                    keyExtractor={data => data.title} 
                    showsVerticalScrollIndicator={false}/>
                <View style={[AppStyles.rowContainer, {
                    width: 50,
                    padding: 8
                }]}>
                    <Icon name="navigate-before" size={30} onPress={this.previousPage} />
                    <Text style={{ paddingHorizontal: 5, fontSize: 18 }}>{this.state.page}</Text>
                    <Icon name="navigate-next" size={30} onPress={this.nextPage} />
                </View>
            </SafeAreaView>
        );
    }
    
    componentDidMount(){
        this.props.loadNotification(this.state.type, this.state.page);
    }
}

var mapStateToProps = (state) => ({
    notifications: state.notifications
});

var mapDispatchToProps = (dispatch) => ({
    loadNotification: (type, page) => dispatch(loadNotification(type, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);