const customError = (msg, status)=>{
  let err =  Error(msg)
  err.status = status
  err.custom = true
  return err
}

export default customError