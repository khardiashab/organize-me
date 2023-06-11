import bcrypt from "bcryptjs"

async function hashPassword (){
  let salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  return ;
}

async function comparePassword (givenPassword){
  return bcrypt.compare(givenPassword, this.password)
}

export {hashPassword, comparePassword}