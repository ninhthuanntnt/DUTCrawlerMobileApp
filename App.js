import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect, Provider } from 'react-redux';
import DUTCrawlerApp from './src/DUTCrawlerApp';
import store from './src/store';


class App extends React.Component {

	render() {
		return (
			<Provider store={store}>
				<DUTCrawlerApp/>
			</Provider>
		);
	}
}

export default App;
