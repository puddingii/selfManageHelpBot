/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import dotenv from 'dotenv'
import path from 'path'
console.log(process.env.REACT_APP_ENV)
const envPath = process.env.REACT_APP_ENV === 'local' ? '../.env-local' : '../.env'
dotenv.config({ path: path.resolve(__dirname, envPath) })
console.log(process.env.REACT_APP_BACKEND_DOMAIN)

import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/animate.min.css'
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0'
import './assets/css/demo.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'

import AdminLayout from 'layouts/Admin.js'
import Layout from 'layouts/Layout'
import LoginLayout from 'layouts/LoginLayout'
import configureAppStore from 'configureStore'
import { LoginRequiredRoute, NonLoginRequiredRoute } from 'layouts/routes'

const store = configureAppStore()

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route exact path="/" render={props => <Redirect push to="/study" />} />
				<Route path="/admin" render={props => <AdminLayout {...props} />} />
				<NonLoginRequiredRoute path="/account" component={LoginLayout} />
				<LoginRequiredRoute path="/study" component={Layout} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
)
