var express=require("express");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

var farm=new mongoose.Schema({
  climate:{
    type:String
  },
  name:{
    type:String
  },
  quantity:{
    type:Number
  },
  area:{
    type:Number
  },
  type:{
    type:String
  },
  position:{
    type:String
  }
});


mongoose.connect("mongodb://vatsal:vatsal1@ds113866.mlab.com:13866/farm",function(err){
  if(err){
    console.log(err);
  }
  var Farm=mongoose.model("farm",farm)

  var app=express();
  app.use(bodyParser.json());

  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader(
      'Access-Control-Expose-Headers',
      'Authorization, Content-Length'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Accept,Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    next();
  });

  app.post("/",function(req,res){
    var farm_new=new Farm({
      climate:req.body.climate,
      name:req.body.name,
      area:req.body.area,
      quantity:req.body.quantity,
      type:req.body.type,
      position:req.body.position
    });
    console.log(req.body);
    farm_new.save(function(err){
      if(err){
        console.log(err);
        res.json({success:false})
      } else{
        let data={}
        if(req.body.name=="cotton" && req.body.type=="black"){
          data.fert="phosphate",
          data.pest="fungicides"
          data.amount=req.body.quantity%5;
          res.json({success:true,data:data})
        } else if(req.body.name=="wheat" && req.body.type=="red"){
          data.fert="multi-nutirent",
          data.pest="rodenticides"
          data.amount=req.body.quantity%5;
          res.json({success:true,data:data})
        } else if(req.body.name=="rice" && req.body.type=="latrite"){
          data.fert="compound",
          data.pest="insecticides"
          data.amount=req.body.quantity%5;
          res.json({success:true,data:data})
        } else if(req.body.name=="barley" && req.body.type=="alluvial"){
          data.fert="micronutrients",
          data.pest="heribicides"
          data.amount=req.body.quantity%5;
          res.json({success:true,data:data})
        } else if(req.body.name=="tea" && req.body.type=="saline"){
          data.fert="organic",
          data.pest="bactericides"
          data.amount=req.body.quantity%5;
          res.json({success:true,data:data})
        } else{
          console.log("Error")
          res.json({success:false,message:"Invalid data"})
        }
      }
    })
  })

  app.listen(process.env.PORT||3000);
})
