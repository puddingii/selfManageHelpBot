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
import Dashboard from 'views/Dashboard.js'
import UserProfile from 'views/UserProfile.js'
import TableList from 'views/TableList.js'
import Typography from 'views/Typography.js'
import Icons from 'views/Icons.js'
import Notifications from 'views/Notifications.js'
import Upgrade from 'views/Upgrade.js'
import { Study } from 'views/Study'
import AccountBook from 'views/AccountBook/index.js'
import Todo from 'views/Todo/index.js'

const dashboardRoutes = [
	{
		upgrade: true,
		path: '/upgrade',
		name: 'Upgrade to PRO',
		icon: 'nc-icon nc-alien-33',
		component: Upgrade,
		layout: '/admin',
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: 'nc-icon nc-chart-pie-35',
		component: Dashboard,
		layout: '/admin',
	},
	{
		path: '/user',
		name: 'User Profile',
		icon: 'nc-icon nc-circle-09',
		component: UserProfile,
		layout: '/admin',
	},
	{
		path: '/table',
		name: 'Table List',
		icon: 'nc-icon nc-notes',
		component: TableList,
		layout: '/admin',
	},
	{
		path: '/typography',
		name: 'Typography',
		icon: 'nc-icon nc-paper-2',
		component: Typography,
		layout: '/admin',
	},
	{
		path: '/icons',
		name: 'Icons',
		icon: 'nc-icon nc-atom',
		component: Icons,
		layout: '/admin',
	},
	{
		path: '/notifications',
		name: 'Notifications',
		icon: 'nc-icon nc-bell-55',
		component: Notifications,
		layout: '/admin',
	},
	{
		path: '/account',
		name: 'AccountBook',
		icon: 'nc-icon nc-bell-55',
		component: AccountBook,
		layout: '/admin',
	},
]

const smbRoutes = [
	{
		path: '/',
		name: '공부',
		icon: 'nc-icon nc-ruler-pencil',
		component: Study,
		layout: '/study',
	},
	{
		path: '/',
		name: '할 일',
		icon: 'nc-icon nc-notes',
		component: Todo,
		layout: '/todo',
	},
	{
		path: '/',
		name: '가계부',
		icon: 'nc-icon nc-money-coins',
		component: AccountBook,
		layout: '/accountBook',
	},
]

export { smbRoutes }

export default dashboardRoutes
