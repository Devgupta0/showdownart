var url = 'mongodb+srv://dev:12345@showdown.8wujz.mongodb.net/showdown?retryWrites=true&w=majority';
var mongoose = require("mongoose");
module.exports = {
    connectToServer: function(callback ) {
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        },(err)=>{
            return callback(err);
        });
      }
}