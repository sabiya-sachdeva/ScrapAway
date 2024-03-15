const mongoose=require('mongoose')

const wasteSchema=new mongoose.Schema
({
    name:{
        type:String,
        required:true
    },
    contactno:{
        type:Number,
       
    },
    address:{
        type:String,
        required:true
       
    },
    pincode:{
        type:String,
        required:true
       
    },
    email:{
        type:String,
        required:true
      
    },
  pickupdate:{
        type:String,
        required:true
        
    },
    typeofwaste:{
        type: [String],
        required:true
        
    },
    imagePath: {
        type: String,
        required:true
        // data: Buffer,
        // contentType: String
      }
})






const Waste=mongoose.model('WASTE',wasteSchema);

module.exports=Waste
