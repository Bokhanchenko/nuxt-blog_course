const postsTest = [
  {
    title: 'Post 1',
    date: new Date(),
    views: 22,
    text: 'Text 1',
    comments: [1,2],
    _id: '1',
  },
  {
    title: 'Post 2',
    date: new Date(),
    views: 22,
    text: 'text 2',
    comments: [1,2],
    _id: '2',
  }
];

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
    const posts = await new Promise(res => {
      setTimeout(() => {
        if (state.posts.length) {
          res(state.posts)
        } else {
          res(postsTest)
        }
      }, 1000)
    });

    await commit('setPosts', posts);

    return posts
  },

  async remove({ state, commit }, id) {
    const posts = state.posts.slice(0);
    const index = posts.findIndex(({ _id }) => _id === id);

    if (index) {
      posts.splice(index, 1)
    }

    commit('setPosts', posts)
  },

  async update({ state, commit }, { id, text }) {
    const posts = state.posts.slice(0);
    const index = posts.findIndex(post => post._id === id);

    if (index) {
      posts[index].text = text
    }

    commit('setPosts', posts)
  },

  async fetchAdminById({ state }, id) {
    return await new Promise(res => {
      setTimeout(() => res(state.posts.find(post => post._id === id)), 1000)
    })
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

      return await new Promise(res => {
        commit('addPost', post);

        setTimeout(() => res(post), 1000)
      })
    } catch (e) {
      commit('setError', e, { root: true });
      throw e
    }
  }
};

export const getters = {
  posts: state => state.posts,
};
