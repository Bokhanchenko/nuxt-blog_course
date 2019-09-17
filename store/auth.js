// npm i cookie js-cookie - библиотеки для работы с куками (решает проблемы парсинга данных)
import Cookie from 'cookie'; // для чтения
import Cookies from 'js-cookie'; // для записи
// npm i jwt-decode - для проверки валидности токена
import jwtDecode from 'jwt-decode';

export const state = () => ({
  // true => null for login logic
  token: null,
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
    return state
  },

  clearToken(state) {
    state.token = null;
    return state
  }
};

export const actions = {
  async login({ commit, dispatch }, formData) {
    try {
      // const token = await new Promise((res) => {
      //   setTimeout(() => res('mock-token'), 2000)
      // });
      const { token } = await this.$axios.$post('/api/auth/admin/login', formData);

      dispatch('setToken', token);
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  },

  setToken({ commit }, token) {
    this.$axios.setToken(token, 'Bearer');
    commit('setToken', token);
    Cookies.set('jwt-token', token);
  },

  logout({ commit }) {
    this.$axios.setToken(false);
    commit('clearToken');
    Cookies.remove('jwt-token');
  },

  autoLogin({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie;

    const cookies = Cookie.parse(cookieStr || '') || {};
    const token = cookies['jwt-token'];

    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  },

  async createUser({ commit }, formData) {
    try {
      await this.$axios.$post('/api/auth/admin/create', formData)
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  }
};

export const getters = {
  isAuthenticated: state => Boolean(state.token),
  token: state => state.token,
};

function isJWTValid(token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {};
  const expires = jwtData.exp || 0;

  // проверка на валидность токена по времени. Не истек ли он
  return (new Date().getTime() / 1000) < expires
}
