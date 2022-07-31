const state = {
	products: []
};

const mutations = {
	SET_PRODUCTS_MOCKUP: (state, productsMockup) => {
		state.products = productsMockup;
	}
};

const actions = {
	async FETCH_PRODUCTS_MOCKUP({ commit }) {
		let mockup = await import('../mockup.json')
		commit("SET_PRODUCTS_MOCKUP", mockup.products);
		return mockup;
	},
	// async CREATE_PRODUCT({ commit, payload }) {
		
	// }
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