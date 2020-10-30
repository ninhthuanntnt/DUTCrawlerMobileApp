
import React from 'react';
import { BackHandler, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import CalendarImage from "../../assets/images/Calendar.jpg";
import NotificationImage from "../../assets/images/notification.png";
import ScoreImage from "../../assets/images/score.png";

class HomeScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            exitApp: 0
        }
        
        this.props.navigation.addListener('focus', ()=>{
            BackHandler.addEventListener("hardwareBackPress", this.onHardwareBack);
        });
        this.props.navigation.addListener('blur', ()=>{
            BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBack);
        });
    }

    onHardwareBack = ()=>{
        this.setState({
            exitApp: this.state.exitApp + 1
        })
        this.props.navigation.navigate('HomeStack');

        return true;
    }

    renderItem = ({ item }) => {
        let navigation = this.props.navigation;
        return (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(item.navigation)}>
                <Image source={item.image} resizeMode='contain' style={styles.banner} />
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        );

    }

    renderHeaderItem = () => {
        if (this.props.loginedData) {
            if (this.props.loginedData.token) {
                return (
                    <TouchableOpacity style={styles.item} onPress={() => this.props.logout()}>
                        <Text style={styles.title}>Đăng xuất</Text>
                    </TouchableOpacity>
                );
            }
        }
        return (
            <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate("LoginStack")}>
                <Text style={styles.title}>Đăng nhập</Text>
            </TouchableOpacity>
        )
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.exitApp === 1){
            ToastAndroid.show('Nhấn nút Back 2 lần để thoát', ToastAndroid.SHORT);
            setTimeout(()=>{this.setState({exitApp: 0})}, 500);
        }else if(nextState.exitApp === 2){
            BackHandler.exitApp();
        }
        if(nextState.exitApp !== this.state.exitApp){
            return false;
        }
        return true;
    }

    render() {
        console.log(NotificationImage.width);
        const datas = [
            {
                id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
                title: "Thông báo",
                image: NotificationImage,
                navigation: "NotificationStack"
            },
            {
                id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
                title: "Lịch học",
                image: CalendarImage,
                navigation: "ScheduleStack"
            },
            {
                id: "58694a0f-3da1-471f-bd96-145571e29d72",
                title: "Điểm",
                image: ScoreImage,
                navigation: "ScoreStack"
            },
        ];
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="default" />
                <FlatList style={styles.flatList}
                    data={datas}
                    renderItem={this.renderItem}
                    keyExtractor={data => data.id + ""}
                    ListHeaderComponent={this.renderHeaderItem} 
                    showsVerticalScrollIndicator={false}/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
    },
    flatList: {
        width: "100%"
    },
    item: {
        padding: 5,
        margin: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    banner: {
        width: "100%",
        height: 250
    }
});


const mapStateToProps = (state) => ({
    loginedData: state.loginedData
});

const mapDispatchToProps = (dispatch) =>({
    logout: ()=>dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);