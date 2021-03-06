var express  =require("express");
var router   =express.Router();
var Visited     =require("../models/visited");

//show
router.get("/",function(req,res){
    Visited.find({}, function(err, allvisited){
        if(err){
            console.log(err);
        } else {
           res.render("./visited/index",{visited:allvisited});
        }
     });
});

//new
router.get("/new",isLoggedIn,function(req,res){
    res.render("./visited/new");
});
//newpost
router.post("/",isLoggedIn,function(req,res){
    var city=req.body.city;
    var photourl=req.body.photourl;
    var desc=req.body.description;
    var date=req.body.date;
    var isVisited = req.body.isVisited;
    var isBucket = req.body.isBucket;
    var visited={city:city ,photourl:photourl,description:desc,isVisited: isVisited,
        isBucket: isBucket, date:date};
    Visited.create(visited,function(err,visited){
       if(err){
         console.log("err");
       }else{
         res.redirect("/visited");
     }
    });
});

//edit
router.get("/:id/edit",function(req,res){
    Visited.findById(req.params.id,function(err,foundVisited){
        res.render("visited/edit", {visited:foundVisited});
    });
});
//update
router.put("/:id",function(req,res){
    Visited.findByIdAndUpdate(req.params.id,req.body.visited,function(err,updvisited){
        if(err){
            res.send("err");
        }else{
            res.redirect("/visited");
        }
    });
});
//delete
router.delete("/:id",isLoggedIn,function(req,res){
    Visited.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/visited");
        } else {
            res.redirect("/visited");
        }
     });
});
//check
function isLoggedIn(req, res, next){	
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/");
}
module.exports=router;