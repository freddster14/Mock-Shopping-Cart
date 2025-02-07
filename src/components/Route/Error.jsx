import { Link, useRouteError } from "react-router-dom"

function Error() {
  const error = useRouteError()
 return (
    <>
      <h1>Something went wrong!</h1>
      <h2>{error.message}</h2>
      <Link to="/">Please try again.</Link>
    </>
 )
}

export default Error