var express = require('express');
var router = express.Router();
const monk = require('monk')

const { body, validationResult } = require('express-validator');

const db = require('monk')("localhost:27017/tutorialdb") //connect to db


/* GET product listing. */
router.get('/', function(req, res, next) {
    res.render("blog"); //link to view folder with product.ejs
});


router.get('/add', function(req, res, next) {
    res.render("addblog"); //link to view folder with product.ejs
});

router.post('/add', [
        body("name", ">>Please input blogname").not().isEmpty(),
        body("description", ">>Please input blog description").not().isEmpty(),
        body("author", ">>Please input blog author").not().isEmpty()
    ],
    function(req, res, next) {
        const result = validationResult(req);
        var errors = result.errors;
        if (!result.isEmpty()) {
            res.render('addblog', { errors: errors });
        } else {
            //insert db
            var ct = db.get('blogs');
            ct.insert({
                name: req.body.name,
                description: req.body.description,
                author: req.body.author
            }, function(err, blog) {
                if (err) {
                    res.send(err);
                } else {
                    res.location('/blog/add'); //not error, then back to home
                    res.redirect('/blog/add');
                }

            });
        }

    });


module.exports = router;