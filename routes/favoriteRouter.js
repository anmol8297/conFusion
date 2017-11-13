const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");

const Favorites = require("../models/favourite");

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ user: req.user._id })
      .populate("user")
      .populate("dishes")
      .then(
        dishes => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dishes);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findById(req.user._id, (err, user) => {
      if (err) {
        throw err;
      } else {
        if (Favorites) {
          for (i = req.body.length; i >= 0; i--) {
              Favorites.dishes.push(i._id);
            }
            Favorites.save((err, favorite) => {
              if (err) {
                throw err;
              } else {
                res.json(favorite);
              }
            });
          } else {
          Favorites.create(req.user._id)
            .then(
              (dishes, err) => {
                Favorites.dishes.push(req.body._id);
                Favorites.dishes.save((err, favorite) => {
                  if (err) {
                    throw err;
                  } else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favorite);
                  }
                });
              },
              err => next(err)
            )
            .catch(err => next(err));
        }
      }
    });
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.remove({ user: req.body.user })
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

favoriteRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    if (Favorites) {
      var dish = req.params._id;
      if (Favorites.dishes.indexOf(dish) === -1) {
        Favorites.dishes.push(dish);
        Favorites.dishes.save((favorite, err) => {
          if (err) {
            throw err;
          } else {
            res.json(favorite);
          }
        });
      }
    } else {
    }
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findByIdAndRemove(req.params._id)
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

  module.exports = favoriteRouter;
