import { Link, useRouteError } from "react-router-dom"

function Error() {
  const error = useRouteError()
 return (
    <>
      <h1>Error</h1>
      <h2>{error.message}</h2>
      <Link to="/">Go Back Home</Link>
    </>
 )
}

export default Error