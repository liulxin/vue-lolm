const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, // false 查询不出
    set(val) {
      return bcrypt.hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)
