import customError from "./customError.js"

export const NotFoundError = (msg) =>{
  return customError(msg, 404)
}

export const BadRequestError = (msg) =>{
  return customError(msg, 400)
}
export const UnAuthorisedError = (msg) =>{
  return customError(msg, 401)
}
export const InvalidError = (msg) =>{
  return customError(msg, 403)
}
