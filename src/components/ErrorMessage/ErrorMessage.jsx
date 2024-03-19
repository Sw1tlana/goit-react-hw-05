
const ErrorMessage = ({ message = ""}) => {
  return (
      <div>
          <p>
              {message.length > 0 ? message : "Whoops, something went wrong! Please try reloading this page!"}   
          </p>
    </div>
  )
}

export default ErrorMessage
