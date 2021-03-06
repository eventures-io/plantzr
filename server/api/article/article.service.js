/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /articles              ->  index
 * POST    /articles              ->  create
 * GET     /articles/:id          ->  show
 * PUT     /articles/:id          ->  update
 * DELETE  /articles/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Article = require('./article.model');

// Get list of articles
exports.index = function (req, res) {
    var select = {
        title: 1,
        thumbnail: 1,
        type: 1,
        publDate: 1
    }
    var hrstart = process.hrtime();
    var query = Article.find({}, select);
    Article.find(function (err, articles) {
        query.exec(function (err, articles) {
            if (err) {
                return handleError(res, err);
            }
            var hrend = process.hrtime(hrstart);
            console.info("<< Article list query time: %ds %dms >>", hrend[0], hrend[1]/1000000);
            return res.json(200, articles);
        });
    });
};

//Get 5 most recent posts
exports.recent = function (req, res) {

    var select = {
        title: 1,
        type: 1,
        publDate: 1

    }

    var query = Article.find({}, select).sort({publDate: -1}).limit(10);
    query.exec(function (err, articles) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, articles);
    });
}

//Filter on types
exports.types = function (req, res) {
    //Use starts with to improve performance /^
    var query = Article.find({type: {$regex: req.params.type, $options: "$i"}})
    query.exec(function (err, articles) {
        if (err) {
            return handleError(res, err);
        }
        var result = [];
        _.forEach(articles, function (value, key) {
            if (_.indexOf(result, value._doc.type) === -1) {
                result.push(value.type);
            }
        });
        return res.json(200, result);
    });
}


// Get a single article
exports.show = function (req, res) {
    var hrstart = process.hrtime();
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            return handleError(res, err);
        }
        if (!article) {
            return res.send(404);
        }
        var hrend = process.hrtime(hrstart);
        console.info("<< Article query time: %ds %dms >>", hrend[0], hrend[1]/1000000);
        return res.json(200, article);
    });
};

var createThumbnail = function(article) {
    if(!article.thumbnail && article.images.length > 0) {
        var buf = new Buffer(article.images[0], 'base64');

    }

}

// Creates a new article in the DB.
exports.create = function (req, res) {
    var article = req.body;

    Article.create(req.body, function (err, article) {
        console.log("saving new article: " + Article.title);
        if (err) {
            console.log('Error saving article: ' + JSON.stringify(err));
            return handleError(res, err);
        }

        return res.json(201, article);
    });
};

// Updates an existing article in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            return handleError(res, err);
        }
        if (!article) {
            return res.send(404);
        }
        var updated = _.merge(article, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, updated);
        });
    });
};

// Deletes a article from the DB.
exports.destroy = function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            return handleError(res, err);
        }
        if (!article) {
            return res.send(404);
        }
        article.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}