/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: (req, res) => {
    Articles.find().exec((err, articles) => {
      if (err) {
        res.send(500, { err: err });
      }
      res.view('articles/article', { articles: articles })
    });
  },

  add: (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    Articles.create({ title: title, body: body }).exec((err) => {
      if (err) {
        res.send(500, { err: err });
      }
      res.redirect('/articles/list')
    });
  },

  edit: (req, res) => {
    Articles.find({ id: req.params.id }).exec(function (err, article) {
      if (err) {
        res.send(500, { err: err });
      }
      res.view('articles/edit', { article: article[0] })
    });
  },

  delete: (req, res) => {
    Articles.destroy({ id: req.params.id }).exec(function (err, article) {
      if (err) {
        res.send(500, { err: err });
      }
      res.redirect('/articles/list');
    });
  },

  update: (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    Articles.update({ id: req.params.id }, { title: title, body: body }).exec((err) => {
      if (err) {
        res.send(500, { err: err });
      }
      res.redirect('/articles/list')
    });
  }
  
};

