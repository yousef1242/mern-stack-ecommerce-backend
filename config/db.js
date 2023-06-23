const mongoose = require("mongoose");



const connectDb = async() => {
    try {
        await mongoose.connect(process.env.CONNECT_DB)
        console.log("connect mongodb");
    } catch (error) {
        console.log("faild connect DB",error);
    }
} 



module.exports = {
    connectDb,
}