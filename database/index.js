const mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-manager'

mongoose.connect(url, { useNewUrlParser: true });

module.exports = mongoose;