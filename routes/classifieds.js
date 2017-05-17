
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex')


router.get('/', (req, res, next) => {
  knex('classifieds')
    .then((items) => {
      res.send(items)
    })
})

router.get('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  return knex('classifieds')
    .where('id', id)
    .then((book) => {
      res.set('Content-Type', 'application/json')
      res.send(humps.camelizeKeys(book[0]))
    })
})


router.post('/', (req, res, next) => {
  knex('classifieds')
    .returning('*')
    .insert({
      title: req.body.title,
      author: req.body.description,
      genre: req.body.price,
      description: req.body.item_image
    }).then((item) => {
      res.send(item)
    })
})

router.patch('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  let updated = req.body
  knex('classifieds')
    .where('id', id)
    .then((item) => {
      item = humps.camelizeKeys(item[0])
      for (const key in item) {
        if (updated.hasOwnProperty(key)) {
          item[key] = updated[key]
        }
      }
      res.send(humps.camelizeKeys(item))
    })
})

router.delete('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  knex('classifieds')
    .returning(['title', 'author', 'genre', 'description', 'cover_url'])
    .where('id', id)
    .del()
    .then((book) => {
      res.send(humps.camelizeKeys(book[0]))
    }).catch((err) => {
      next(err)
    })
})



module.exports = router;
