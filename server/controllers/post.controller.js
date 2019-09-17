const Post = require('../models/post.model');

module.exports.create = async (req, res) => {
  const { title, text } = req.body;

  const post = new Post({
    title,
    text,
    imageUrl: `/${req.file.filename}`
  });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    // comments - что б получить список коментариев (рапее ID, после - обьекты)
    await Post
      .findById(req.params.id).populate('comments')
      .exec((error, post) => {
        // отправка на фронт найденого поста
        res.json(post)
      })
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.update = async (req, res) => {
  const $set = { text: req.body.text };

  try {
    const post = await Post.findOneAndUpdate({
      _id: req.params.id
    }, { $set }, { new: true });

    res.json(post)
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: 'Post is removed' });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.addView = async (req, res) => {
  try {
    const $set = { views: ++req.body.views };

    try {
      const post = await Post.findOneAndUpdate({
        _id: req.params.id
      }, { $set });

      res.status(204).json()
    } catch (e) {
      res.status(500).json(e);
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getAnalitics = async (req, res) => {
  try {
    const posts = await Post.find();
    const labels = posts.map(post => post.title);
    const json = {
      comments: {
        labels,
        data: posts.map(post => post.comments.length),
      },
      views: {
        labels,
        data: posts.map(post => post.views.length)
      },
    };

    res.json(json);
  } catch (e) {
    res.status(500).json(e);
  }
};
