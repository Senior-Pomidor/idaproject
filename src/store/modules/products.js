const state = {
	products: [],
	newId: ''
};

const mutations = {
	SET_PRODUCTS_MOCKUP: (state, productsMockup) => {
		state.products = productsMockup;
	},
	ADD_PRODUCT: (state, product) => {
		state.newId = product.id + '';
		state.products.unshift(product);
	}
};

const actions = {
	async FETCH_PRODUCTS_MOCKUP({ commit }) {
		let mockup = await import('../mockup.json')
		commit("SET_PRODUCTS_MOCKUP", mockup.products);
		return mockup;
	},
	CREATE_PRODUCT({ commit }, product) {
		// отправка в бд
		// установка в стейт
		commit("ADD_PRODUCT", product)
	}
};

const getters = {
	PRODUCTS: (state) => state.products
};


export default {
	state,
	getters,
	actions,
	mutations
}