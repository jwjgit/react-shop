import React, { Component } from 'react';
import {Provider} from 'react-redux'

import configureStore from './store/index';

let store = configureStore();

import Root from './root'; 


export default class App extends Component{
	constructor(){
		super();
		this.state = {
			store: configureStore()
		}
	}
	render(){
		return (
			<Provider store={this.state.store}>
				<Root />
			</Provider>
		)
	}
}

