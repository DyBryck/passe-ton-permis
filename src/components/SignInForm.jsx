import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../lib/supabase";

const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [stayConnected, setStayConnected] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    const { email, password } = formData;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.status === 400) {
        setError("Email ou mot de passe incorrect");
        setLoading(false);
      } else setError(error.message);
    } else {
      navigate("/app/accueil");
    }
  };

  return (
    <div className="mt-auto flex flex-col gap-4 rounded-t-4xl bg-white p-8">
      <Link to={"/"} className="text-2xl font-bold">
        ←
      </Link>
      <h2 className="text-3xl font-bold">Connexion</h2>
      <form onSubmit={handleSignIn} className="flex flex-col font-semibold">
        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Entre ton email"
          value={formData.email}
          onChange={handleFormChange}
          disabled={loading}
          className="mb-4 rounded-lg border border-gray-400 p-3 font-normal focus:outline-[rgb(var(--primary))]"
        />
        <label htmlFor="password" className="mb-1">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Entre ton mot de passe"
          value={formData.password}
          onChange={handleFormChange}
          disabled={loading}
          className="mb-1 rounded-lg border border-gray-400 p-3 font-normal outline-[rgb(var(--primary))]"
        />
        <Link to={"#"} className="mb-4 font-normal text-gray-400">
          Mot de passe oublié ?
        </Link>
        <div className="mb-4 flex items-center gap-2">
          <input
            id="termsOfUse"
            type="checkbox"
            name="termsOfUse"
            value={stayConnected}
            onChange={() => setStayConnected((prev) => !prev)}
            disabled={loading}
            className="accent-[rgb(var(--primary))]"
          />
          <label htmlFor="termsOfUse" className="font-normal">
            Rester connecté
          </label>
        </div>
        <input
          type="submit"
          value={"Se connecter"}
          disabled={loading}
          className="rounded-lg bg-[rgb(var(--primary))] py-3 text-lg font-bold text-white"
        />
      </form>
      <p className="text-center text-gray-500">
        Pas encore de compte ?{" "}
        <Link to={"/inscription"} className="font-bold text-black underline">
          S'inscrire
        </Link>
      </p>
      {error && <p className="text-center text-red-400">{error}</p>}
    </div>
  );
};

export default SignInForm;
