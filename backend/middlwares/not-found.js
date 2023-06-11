export const notFound = (req, res)=>{
  res.status(404).json({
    success : false,
    message : "This path is not defined for this url."
  })
}