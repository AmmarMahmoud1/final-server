const User = require('../Models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config');

 signUp = async (req , res) =>{
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        throw new Error('Please add all fields')
    }
    const existUser = await User.findOne({email})

    if (existUser) {
        res.status(400)
        throw new Error('Profile already exists')
      }

       // Hash password
     const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

     // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid Profile data')
  }

}


updateUser = async (req, res)  =>{
    const  body = req.body;
    if(!body){
        return res.status(400).json({
            success: false,
            message: 'Please choose a profile to update'
        })

    }

    User.findOne({_id :req.params.id} , (err, profile) =>{
        if(err) {
            return res.status(404).json({
                err,
                message: 'Profile not found!',
            })
        }
        User.name = body.name;
        User.email = body.email;
        User.password = body.password;
        User.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: user._id,
                message: 'User updated!',
            })
        })
        .catch(error => {
            return res.status(404).json({
                error,
                message: 'Profile not updated!',
            })
        })

        })
    
}

deleteUser = async (req, res) => {
    await Profile.findOneAndDelete({ _id: req.params.id }, (err, profile) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Profile not found` })
        }

        return res.status(200).json({ success: true, data: profile })
    }).catch(err => console.log(err))
}

getUser = async (req, res) => {
    await 
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `Profile not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}


const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(password)
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    console.log(user)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    
    const token = jwt.sign({ userId: user._id }, config.secretKey);
    res.cookie('token', token, config.cookieOptions);
    
    return res.json({ message: 'Authentication successful.', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

const logout = (req, res, next) => {
    try {
      res
        .clearCookie('token', { path: '/', sameSite: 'none', secure: true })
        .sendStatus(200);
    } catch (error) {
      next(error);
    }
  };


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }


module.exports = {
    signUp,
    updateUser,
    getUser,
    deleteUser,
    login,
    logout
}