import axios from "axios";

const state = {
	products: [],
	defaultCurrency: 'руб.',
	options: {}
};

const mutations = {
	SET_PRODUCTS: (state, products) => {
		state.products = products;
	},
	ADD_PRODUCT: (state, product) => {
		state.products.unshift(product);
	},
	DELETE_PRODUCT: (state, productId) => {
		const index = state.products.findIndex(product => {
				return product.id == productId
			}
		)
		state.products.splice(index, 1);
	},
	SORT_PRODUCTS_BY_NAME: (state) => {
		state.products.sort((a, b) => a.name.localeCompare(b.name));
	},
	SORT_PRODUCTS_BY_PRICE_UP: (state) => {
		state.products.sort((a, b) => Number(a.price.replace(/ /g, '')) - Number(b.price.replace(/ /g, '')));
	},
		SORT_PRODUCTS_BY_PRICE_DOWN: (state) => {
		state.products.sort((a, b) => Number(b.price.replace(/ /g, '')) - Number(a.price.replace(/ /g, '')));
	}
};

const actions = {
	async FETCH_PRODUCTS_MOCKUP({ commit }) {
		let mockup = await import('../mockup.json')
		commit('SET_PRODUCTS', mockup.products);
		return mockup;
	},
	FETCH_PRODUCTS({ commit }) {
		return axios.get('https://fakerapi.it/api/v1/products')
			.then(response => {
				commit('SET_PRODUCTS', response.data.data);
				return response.data.data
			})
			.catch(error => {
				console.error(`${error.name}: ${error.message}`);
				return error
			})
	},
	CREATE_PRODUCT({ commit }, product) {
		// отправка в БД
		// ...
		// установка в стейт
		commit('ADD_PRODUCT', product)
	},
	DELETE_PRODUCT({ commit }, productId) {
		// let promise = new Promise((res, rej) => {
			// отправка запроса на удаление
			// setTimeout(() => {
			// 	res(productId)
			// }, 2000)
		// })
		
		// удаление из БД
		// ...
		// удаление из стейта
		commit('DELETE_PRODUCT', productId)
	},
	SORT_PRODUCTS({ commit }, type) {
		if (type === 'byName') {
			commit('SORT_PRODUCTS_BY_NAME')
		} else if (type === 'byPriceUp') {
			commit('SORT_PRODUCTS_BY_PRICE_UP')
		} else if (type === 'byPriceDown') {
			commit('SORT_PRODUCTS_BY_PRICE_DOWN')
		} else {
			console.error(`unknown sort type '${type}'`);
		}
	}
};

const getters = {
	PRODUCTS: state => state.products,
	DEFAULT_CURRENCY: state => state.defaultCurrency
};


export default {
	state,
	getters,
	actions,
	mutations
}