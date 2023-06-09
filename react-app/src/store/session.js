// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const BUY_CHAPTER = "session/BUY_CHAPTER"
const PURCHASE_COINS = "session/PURCHASE_COINS"
const DEACTIVATE_WALLET = "session/DEACTIVATE"

const purchase_coins = user => ({
	type: PURCHASE_COINS,
	payload: user
})
const buy_chapter = (user) => ({
	type: BUY_CHAPTER,
	payload: user
})
const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password, ...tags) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			tags
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const fetchBuyChapter = (data) => async dispatch => {
	const res = await fetch("/api/users/purchase_chapter", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({data}),
	});
	if (res.ok){
		const user = await res.json()
		dispatch(buy_chapter(user))
	}
}

export const fetchBuyCoins = (data) => async dispatch => {
	const res = await fetch("/api/users/purchase_coins", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({data}),
	});
	if (res.ok){
		const user = await res.json()
		dispatch(purchase_coins(user))
	}
}

export const fetchDeactivateWallet = () => async dispatch => {
	const res = await fetch("/api/users/deactivate_wallet", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});
	if (res.ok){
		const user = await res.json()
		return dispatch(purchase_coins(user))
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case BUY_CHAPTER:
			return { user: action.payload }
		case PURCHASE_COINS:
			return { user: action.payload }
		case DEACTIVATE_WALLET:
			return { user: action.payload }
		default:
			return state;
	}
}
