// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/candy');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
    username : String,
    pw : String,
    em : String
});
const productSchema = mongoose.Schema({
    name : String,
    price : String,
    flag : 0
});

/************** 定义模型Model **************/

/************** 定义模型Model **************/
const Models = {
	loginSchema : mongoose.model('user',loginSchema),
	productSchema : mongoose.model('product',productSchema)
}

module.exports = Models;