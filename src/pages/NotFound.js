import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <h1>404</h1>
      <h2>Error 404, Page Not Found</h2>
      <h3>
        I'm lost take me back <Link to="/">home!</Link> &#128546;
      </h3>
    </main>
  );
};

export default NotFound;
