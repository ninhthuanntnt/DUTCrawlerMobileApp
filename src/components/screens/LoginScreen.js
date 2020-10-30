import React from 'react';
import { Button, Text, View, TextInput, Alert } from 'react-native';
import styles from '../../assets/styles/AppStyles';
import { login, resetLoginData } from '../../actions';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.state = {
            username: "",
            password: "",
            isLoading: false
        }
    }

    submitForm = () => {
        this.setState({
            isLoading: true
        });

        this.props.login(this.state.username, this.state.password);
    }

    reloadFormLogin = ()=>{
        this.props.resetLoginData();
        this.setState({isLoading: false});
    }

    resetFormLogin = ()=>{
        this.reloadFormLogin();
        this.setState({
            username: "",
            password: ""
        });
    }

    render() {

        if(this.props.loginedData.isFailed){
            Alert.alert('Lỗi xác thực','Tên đăng nhập hoặc mật khẩu của bạn không chính xác!',[
                {
                    text: 'Ok',
                    onPress: ()=> {this.reloadFormLogin()}
                },
                {
                    text: 'Reset',
                    onPress: ()=>{this.resetFormLogin()}
                }
            ]);
        }

        return (
            <View style={[styles.container, styles.formContainer]}>
                <Text style={styles.formHeader}>DUTCrawler</Text>
                <View style={styles.formControl}>
                    <Text style={styles.formTitle}>Tên đăng nhập</Text>
                    <TextInput style={styles.formInput}
                        placeholder="Nhập ở đây"
                        onChangeText={text => this.setState({ username: text })}
                        value={this.state.username} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.formTitle}>Mật khẩu</Text>
                    <TextInput style={styles.formInput}
                        passwordRules={true}
                        secureTextEntry={true}
                        autoCompleteType="password" textContentType="password" placeholder="Nhập ở đây"
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password} />
                </View>
                <View style={styles.formButton}>
                    <Button onPress={this.submitForm} title="Đăng nhập" />
                </View>

                <ProgressLoader
                    visible={(this.props.loginedData.token === null) && (this.state.isLoading)}
                    isModal={false}
                    color={"#FFFFFF"} />
            </View>
        );
    }

    componentDidUpdate(){
        if(this.props.loginedData){
            if(this.props.loginedData.token){
                this.props.navigation.navigate("HomeStack");
            }
        }
    }
}

var mapStateToProps = (state) => ({
    loginedData: state.loginedData
});

var mapDispatchToProps = (dispatch) => ({
    login: (username, password) => dispatch(login(username, password)),
    resetLoginData: ()=>dispatch(resetLoginData())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);