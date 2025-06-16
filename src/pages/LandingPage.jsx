import { Link } from "react-router";

const LandingPage = () => {
  return (
    <>
      <Link to={"/connexion"}>Connexion</Link>
      <Link to={"/inscription"}>Inscription</Link>
    </>
  );
};

export default LandingPage;
