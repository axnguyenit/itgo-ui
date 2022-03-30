import { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { setSession } from '../utils/jwt';
import { getCartApi } from '../redux/slices/cart';
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

const initialState = {
	isAuthenticated: false,
	isInitialized: false,
	user: null,
};

const handlers = {
	INITIALIZE: (state, action) => {
		const { isAuthenticated, user } = action.payload;
		return {
			...state,
			isAuthenticated,
			isInitialized: true,
			user,
		};
	},
	LOGIN: (state, action) => {
		const { user } = action.payload;

		return {
			...state,
			isAuthenticated: true,
			user,
		};
	},
	LOGOUT: (state) => ({
		...state,
		isAuthenticated: false,
		user: null,
	}),
};

const reducer = (state, action) =>
	handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
	...initialState,
	login: () => Promise.resolve(),
	logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
	children: PropTypes.node,
};

function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();

	useEffect(() => {
		const initialize = async () => {
			try {
				const accessToken = window.localStorage.getItem('accessToken');
				const refreshToken = window.localStorage.getItem('refreshToken');

				if (accessToken) {
					setSession(accessToken, refreshToken);

					const response = await axios.get('/api/users/my-account');
					const { user } = response.data;

					if (!user.emailVerified) navigate(PATH_AUTH.verify, { replace: true });
					if (user.emailVerified) {
						dispatch({
							type: 'INITIALIZE',
							payload: {
								isAuthenticated: true,
								user,
							},
						});
						getCartApi();
					}
				} else {
					dispatch({
						type: 'INITIALIZE',
						payload: {
							isAuthenticated: false,
							user: null,
						},
					});
				}
			} catch (err) {
				console.error(err);
				dispatch({
					type: 'INITIALIZE',
					payload: {
						isAuthenticated: false,
						user: null,
					},
				});
			}
		};

		initialize();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const login = async (email, password) => {
		const response = await axios.post('/api/auth/login', {
			email,
			password,
		});
		const { accessToken, refreshToken, user } = response.data;

		if (!user.emailVerified) navigate(PATH_AUTH.verify, { replace: true });
		if (user.emailVerified) {
			setSession(accessToken, refreshToken);
			getCartApi();
			dispatch({
				type: 'LOGIN',
				payload: {
					user,
				},
			});
		}
	};

	const logout = async () => {
		setSession(null, null);
		dispatch({ type: 'LOGOUT' });
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				login,
				logout,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
