export const errorHandler = (err, req, res, next) => {
  console.log(err)
  if(err?.code === 11000){
    err.status = 409
    err.message = "This email is already registered."
  }
  res.status( err.status || 500 ).json({
    success : false,
    message : err?.message
  })
}