const router = require('express').Router();
const { request } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      { model:Product }
    ]
  }).then(dbCategory => {
    if(!dbCategory) {
      res.status(400).json({ message: "This Category was not found!" })
    }
    res.json(dbCategory)
  }) 
  .catch(err => {
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    //including its products here
    include: [{ model:Product }]
  }).then(dbCategory => {
    if(!dbCategory) {
      res.status(400).json({ message: "This Category was not found!" })
    }
    res.json(dbCategory)
  }) 
  .catch(err => {
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    res.status(500).json(err);
  });
})

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id:req.body.id
    }
  }).then(dbCategory => {
    if(!dbCategory) {
      res.status(400).json({ message: "This Category was not found!" })
    }
    res.json(dbCategory)
  }) 
  .catch(err => {
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbCategory => {
    if(!dbCategory) {
      res.status(400).json({ message: "This Category was not found!" })
    }
    res.json(dbCategory)
  }) 
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;
