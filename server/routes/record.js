const express = require("express");

// recordRoutes is an isntance of the express router.
// Used to define the routes.
// The router will be added as a middleware and will take control of request starting with path /record.
const recordRoutes = express.Router();

// This will help connect to the database
const dbo = require("../db/conn");

// This converts the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res){
    let db_connect = dbo.getDb("employees");
    db_connect
        .collection("records")
        .find({})
        .toArrary(function (err, result){
            if (err) throw err;
            res.json(result);
        });
});

// This section handles getting a single record by id
recordRoutes.route("/record/:id").get(function (req, res){
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id)};
    db_connect 
        .collection("records")
        .findOne(myquery, function(err, result){
            if (err) throw err;
            res.json(result);
        });
});

// This section handles creation of new records
recordRoutes.route("/record/add").post(function (req, response){
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
    };
    db_connect.collection("records").insertOne(myobj, function (err, res){
        if (err) throw err;
        response.json(res);
    });
});

// This section handles updating of records by id
recordRoutes.route("/update/:id").post(function (req,response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id)};
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    }
});

// This section handles deleting of a record
recordRoutes.route("/:id"),delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id)};
    db_connect_connect.collection("records").deleteOne(myquery, function (err, obj){
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;