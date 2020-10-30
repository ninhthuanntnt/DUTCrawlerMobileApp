import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Row, Table } from 'react-native-table-component';
import { connect } from 'react-redux';
import { loadScore } from '../../actions';
import * as SecureStore from 'expo-secure-store';
import ProgressLoader from 'rn-progress-loader';

class ScoreScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tableHead: ['Mã', 'Tên', 'Số TC', 'BT', 'CK', 'ĐA', 'GK', 'LT', 'TH', 'T10', 'T4', 'chữ'],
            widthTableHead: [100, 150, 50, 40, 40, 40, 40, 40, 40, 40, 40, 40],
            tableTotalHead: ['Tổng TC', 'Số TC học lại', 'Điểm TBC HK T4', 'Điểm TBC HB', 'Điểm TBC T10', 'XL Học tập', 'Điểm RL'],
            widthTableTotalHead: [50, 100, 100, 80, 80, 80, 50]
        }

        this.props.navigation.addListener('focus', this.componentDidFocus);
    }

    loadScore = () => {
        SecureStore.getItemAsync('token').then(token => {
            console.log('Score Mounted with token: ' + token);
            this.props.loadScore(token);
        });
    }

    renderRowScore = () => {
        if (this.props.score) {
            if (this.props.score.detailedScores) {
                return this.props.score.detailedScores.map((item, index) => {
                    let rowData = [item.code,
                    item.subject,
                    item.credit,
                    item.score1,
                    item.score2,
                    item.score3,
                    item.score4,
                    item.score5,
                    item.score6,
                    item.score7,
                    item.score8,
                    item.score9]
                    return (
                        <Row
                            key={index}
                            data={rowData}
                            widthArr={this.state.widthTableHead}
                            style={styles.row}
                            textStyle={styles.text}
                        />
                    )
                });
            }
        }
    }

    renderRowTotalScore = () => {
        if (this.props.score) {
            if (this.props.score.totalScores) {
                // ['Tổng TC', 'Số TC học lại', 'Điểm TBC HK T4', 'Điểm TBC HB', 'Điểm TBC T10', 'XL Học tập', 'Điểm RL', 'Số TC Tích lũy'],
                return this.props.score.totalScores.map((item, index) => {
                    let rowData = [item.totalCredit,
                    item.restCredit,
                    item.score1,
                    item.score2,
                    item.score3,
                    item.resultType,
                    item.activityScore]
                    return (
                        <Row
                            key={index}
                            data={rowData}
                            widthArr={this.state.widthTableTotalHead}
                            style={styles.row}
                            textStyle={styles.text}
                        />
                    )
                });
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    <View>
                        <Table>
                            <Row
                                data={this.state.tableHead}
                                widthArr={this.state.widthTableHead}
                                style={styles.header}
                                textStyle={styles.text} />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table>
                                {this.renderRowScore()}
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
                <ScrollView horizontal={true} style={{ height: 170, paddingTop: 5 }}>
                    <View>
                        <Table>
                            <Row
                                data={this.state.tableTotalHead}
                                widthArr={this.state.widthTableTotalHead}
                                style={styles.header}
                                textStyle={styles.text}
                            />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table>
                                {this.renderRowTotalScore()}
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
                <ProgressLoader
                    visible={this.props.score.totalScores.length <= 0}
                    isModal={false}
                    hudColor={"#000000"}
                    color={"#FFFFFF"} />
            </View>
        );
    }

    componentDidFocus = () => { this.loadScore(); }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#66a3ff' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#e6f0ff' }
});

var mapStateToProps = (state) => ({
    score: state.score
});

var mapDispatchToProps = (dispatch) => ({
    loadScore: (token) => dispatch(loadScore(token))
});
export default connect(mapStateToProps, mapDispatchToProps)(ScoreScreen);