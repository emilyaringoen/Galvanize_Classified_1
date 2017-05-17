
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex')


router.get('/', (req, res, next) => {
  knex('classifieds')
    .select('id', 'title', 'description', 'price', 'item_image')
    .then((items) => {
      res.send(items)
    })
})

router.get('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  knex('classifieds')
    .select('id', 'title', 'description', 'price', 'item_image')
    .where('id', id)
    .then((item) => {
      res.send(item[0])
    })
})


router.post('/', (req, res, next) => {
  knex('classifieds')
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .insert({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      item_image: req.body.item_image
    }).then((item) => {
      res.send(item[0])
    })
})

router.patch('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  let updated = req.body

  knex('classifieds')
    .where('id', id)
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .then((el) => {
      let item = el[0]
      for (let key in item) {
        if (updated.hasOwnProperty(key)) {
          item[key] = updated[key]
        }
      }
      delete item.created_at
      delete item.updated_at
      res.set('Content-Type', 'application/json')
      res.send(item)
    })
})

router.delete('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  knex('classifieds')
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .where('id', id)
    .del()
    .then((item) => {
      res.send(item[0])
    })
})



module.exports = router;
