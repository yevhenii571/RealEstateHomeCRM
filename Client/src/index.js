import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from 'layouts/admin';
import UserLayout from 'layouts/user';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { RoleProvider } from 'contexts/RoleContext';

function App() {
	const token = localStorage.getItem("token") || sessionStorage.getItem("token");

	const user = JSON.parse(localStorage.getItem("user"))
	useNavigate()

	return (
		<>
			<ToastContainer />
			<Routes>
				{token && user?.role ? (
					user?.role == 'user' ?
						<Route path="/*" element={<UserLayout />} />
						: user?.role === 'admin' ?
							<Route path="/*" element={<AdminLayout />} />
							: ''
				) : (
					<Route path="/*" element={<AuthLayout />} />
				)}
			</Routes>
		</>
	);
}

ReactDOM.render(
	<Provider store={store}>
		<RoleProvider>
			<ChakraProvider theme={theme}>
				<React.StrictMode>
					<ThemeEditorProvider>
						<Router>
							<App />
						</Router>
					</ThemeEditorProvider>
				</React.StrictMode>
			</ChakraProvider>
		</RoleProvider>
	</Provider>
	, document.getElementById('root')
);

