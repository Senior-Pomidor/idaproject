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
	},
	DELETE_PRODUCT: (state, productId) => {
		const index = state.products.findIndex(product => {
				return product.id == productId
			}
		)
		state.products.splice(index, 1);
	}
};

const actions = {
	async FETCH_PRODUCTS_MOCKUP({ commit }) {
		let mockup = await import('../mockup.json')
		commit("SET_PRODUCTS_MOCKUP", mockup.products);
		return mockup;
	},
	CREATE_PRODUCT({ commit }, product) {
		// отправка в БД
		// ...
		// установка в стейт
		commit("ADD_PRODUCT", product)
	},
	DELETE_PRODUCT({ commit }, productId) {
		// удаление из БД
		// ...
		// удаление из стейта
		commit("DELETE_PRODUCT", productId)
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