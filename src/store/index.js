import { createStore } from 'vuex';

export default createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
      localStorage.setItem('accessToken', token);
    },
    setRefreshToken(state, token) {
      state.refreshToken = token;
      localStorage.setItem('refreshToken', token);
    },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  actions: {
    saveTokens({ commit }, { accessToken, refreshToken }) {
      commit('setAccessToken', accessToken);
      commit('setRefreshToken', refreshToken);
    },
    logout({ commit }) {
      commit('clearTokens');
    },
    async refreshToken({ commit, state }) {
      try {
        const response = await axios.post('https://www.strava.com/oauth/token', {
          client_id: '139442',
          client_secret: '37ae2114e675f2e8af254024d0c232c4c637f3fe',
          grant_type: 'refresh_token',
          refresh_token: state.refreshToken,
        });

        const { access_token: accessToken, refresh_token: refreshToken } = response.data;
        commit('setAccessToken', accessToken);
        commit('setRefreshToken', refreshToken);
      } catch (error) {
        console.error('Failed to refresh token', error);
        commit('clearTokens');
      }
    },
  },
});
