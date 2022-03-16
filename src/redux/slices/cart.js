import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import cartApi from 'src/api/cartApi';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
	activeStep: 0,
	cart: [],
	subtotal: 0,
	total: 0,
	discount: 0,
	billing: null,
};

const slice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// CHECKOUT
		getCart(state, action) {
			const cart = action.payload;

			const subtotal = sum(
				cart.map((cartItem) => cartItem.course.priceSale || cartItem.course.price)
			);
			const discount = cart.length === 0 ? 0 : state.discount;
			const billing = cart.length === 0 ? null : state.billing;

			state.cart = cart;
			state.discount = discount;
			state.billing = billing;
			state.subtotal = subtotal;
			state.total = subtotal - discount;
		},

		addCart(state, action) {
			const course = action.payload;
			state.cart = uniqBy([...state.cart, course], '_id');
		},

		setCart(state, action) {
			state.cart = action.payload;
		},

		deleteCart(state, action) {
			const updateCart = state.cart.filter((item) => item._id !== action.payload);
			state.cart = updateCart;
		},

		resetCart(state) {
			state.activeStep = 0;
			state.cart = [];
			state.total = 0;
			state.subtotal = 0;
			state.discount = 0;
			state.billing = null;
		},

		onBackStep(state) {
			state.activeStep -= 1;
		},

		onNextStep(state) {
			state.activeStep += 1;
		},

		onGotoStep(state, action) {
			const goToStep = action.payload;
			state.activeStep = goToStep;
		},

		createBilling(state, action) {
			state.billing = action.payload;
		},

		applyDiscount(state, action) {
			const discount = action.payload;
			state.discount = discount;
			state.total = state.subtotal - discount;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const {
	getCart,
	addCart,
	resetCart,
	onGotoStep,
	onBackStep,
	onNextStep,
	deleteCart,
	createBilling,
	applyDiscount,
} = slice.actions;

export async function getCartApi() {
	try {
		const response = await cartApi.get();
		if (response.data.success) dispatch(slice.actions.setCart(response.data.cartItems));
	} catch (error) {
		console.error(error);
	}
}
