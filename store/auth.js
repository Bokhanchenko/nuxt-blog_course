export const state = () => ({
  // true => null for login logic
  token: true,
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },

  clearToken() {
    state.token = null;
  }
};

export const actions = {
  async login({ commit, dispatch, formData }) {
    try {
      // const token = await new Promise((res) => {
      //   setTimeout(() => res('mock-token'), 2000)
      // });
      const { token } = this.$axios.$post('/api/auth/admin/login', formData);

      console.log(token);

      dispatch('setToken', token);
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  },

  setToken({ commit }, token) {
    commit('setToken', token)
  },

  logout({ commit }) {
    commit('clearToken');
  },

  async createUser({ commit }, formData) {
    try {
      console.log('createUser', formData);
    } catch (e) {

    }
  }
};

export const getters = {
  isAuthenticated: state => Boolean(state.token)
};
