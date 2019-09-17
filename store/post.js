export const state = () => ({
  posts: []
});

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },

  addPost(state, post) {
    state.posts.push(post)
  }
};

export const actions = {
  async fetchAdminPosts({ state, commit }) {
    try {
      const posts = await this.$axios.$get('/api/post/admin');
      await commit('setPosts', posts);
      return posts
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  },
  async fetch({ state, commit }) {
    try {
      const posts = await this.$axios.$get('/api/post');
      await commit('setPosts', posts);
      return posts;
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  },
  async remove({ state, commit }, id) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`);
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  },

  async update({ state, commit }, { id, text }) {
    try {
      return await this.$axios.$put(`/api/post/admin/${id}`, { text });
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  },

  async fetchAdminById({ state, commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`);
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  },

  async fetchById({ state, commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`);
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  },

  async create({ state, commit }, postData) {
    try {
      const formData = new FormData();
      const post = {
        date: new Date(),
        views: 0,
        comments: [],
        _id: state.posts.length + 1,
        ...postData,
      };

      Object.keys(post).forEach(key => {
        if (key === 'image') {
          formData.append(key, post[key], post[key].name);
        } else {
          formData.append(key, post[key]);
        }
      });

      return await this.$axios.post('/api/post/admin', formData)
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  },

  async addView({ commit }, { _id, views }) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, { views });
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  },

  async getAnalitics({ commit }) {
    try {
      return await this.$axios.$get('/api/post/admin/get/analitics');
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  }
};

export const getters = {
  posts: state => state.posts,
};
