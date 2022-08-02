import { User } from "./models/user.js"

export function loginUser(username, password, callback) {
  findOne({ username: username }).exec(function (error, user) {
    if (error) {
      callback({ error: true })
    } else if (!user) {
      callback({ error: true })
    } else {
      user.comparePassword(password, function (matchError, isMatch) {
        if (matchError) {
          callback({ error: true })
        } else if (!isMatch) {
          callback({ error: true })
        } else {
          callback({ success: true })
        }
      })
    }
  })
}