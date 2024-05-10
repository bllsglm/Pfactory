import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '30d'})

  //Set JWT as HTTP-Only  Cookie
  res.cookie('jwt', token, {
    httpOnly : true,
    secure : process.env.NODE_ENV === 'production', //use secure cookies only in production
    sameSite: 'strict', //CRSF attacks
    maxAge : 1000*60*60*24*30 //30 days
  })
}

export default generateToken



