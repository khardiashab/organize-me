export const customError = (msg, status) => {
  let err = new Error(msg)
  err.status = status
  err.custom = true
  return err
}