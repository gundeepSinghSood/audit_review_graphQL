const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');


module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ username: args.userInput.username });
      if (existingUser) {
        throw new Error('user already exist')
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      
      const user = new User({
        username: args.userInput.username,
        password: hashedPassword,
      });
      const result = await user.save();
       return {...result._doc, password: null};
    } catch (error) {
      throw error;
    }
  },
  login: async ({username, password}) => {
    const user = await User.findOne({username: username});
    if(!user) {
      throw new Error('user does not exist')
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual) {
      throw new Error('something is wrong');
    }
    const token = jwt.sign({userId: user.id, username: user.username}, 'secretKey', {
      expiresIn: '1h'
    });
    
    return { userId: user.id, token: token, tokenExpire: 1, username: user.username }
  }
}