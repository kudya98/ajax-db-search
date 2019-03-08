const express = require("express");
const bodyParser = require("body-parser");
const API_PORT = 3001;
const mongodb = require("./mongo")
const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/api", router);
router.get('/search',(req,res) => {
    const search_str = req.query.last_name;
    const query = {};
    mongodb.countDocuments({},(err)=>{
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"}
        }
        mongodb.find({last_name:{ "$regex": search_str, "$options": "i" }},{},query,(err,data)=>{
            // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
                //response = {"error" : false,"message" : data,"pages": totalPages};
            }
            res.json(response);
        });
    })
});
router.get('/users',(req,res) => {
    const pageNo = parseInt(req.query.pageNo);
    const size = parseInt(req.query.size);
    const query = {};
    if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    // Find some documents
    mongodb.countDocuments({},(err,totalCount)=>{
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"}
        }
        mongodb.find({},{},query,(err,data)=>{
            // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                const totalPages = Math.ceil(totalCount / size);
                response = {"error" : false,"message" : data,"pages": totalPages};
            }
            res.json(response);
        });
    })
});

app.listen(API_PORT, () => console.log(`APP LISTENING ON PORT ${API_PORT}`));