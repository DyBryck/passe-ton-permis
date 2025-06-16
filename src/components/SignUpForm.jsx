import { useState } from "react";
import { Link } from "react-router";
import { supabase } from "../lib/supabase";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [soulSold, setSoulSold] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const verifyPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    if (!soulSold) {
      setError("Tu dois vendre ton âme au diable obligatoirement");
      setLoading(false);
      return;
    }

    const { email, password, confirmPassword } = formData;

    if (password.length < 6) {
      setError("Le mot de passe est trop court");
      return;
    }

    if (verifyPassword(password, confirmPassword)) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setLoading(false);
        setConfirmEmail(true);
      }
    } else {
      setError("Les mots de passes sont différents");
      setLoading(false);
      return;
    }
  };

  return (
    <div className="mt-auto flex flex-col gap-4 rounded-t-4xl bg-white p-8">
      <Link to={"/"} className="text-2xl font-bold">
        ←
      </Link>
      <h2 className="text-3xl font-bold">Inscription</h2>
      <form onSubmit={handleSignUp} className="flex flex-col font-semibold">
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
          autoComplete="new-password"
          placeholder="Entre ton mot de passe"
          value={formData.password}
          onChange={handleFormChange}
          disabled={loading}
          className="mb-4 rounded-lg border border-gray-400 p-3 font-normal outline-sky-400"
        />
        <label htmlFor="confirmPassword" className="mb-1">
          Mot de passe de confirmation
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirme ton mot de passe"
          value={formData.confirmPassword}
          onChange={(e) => handleFormChange(e)}
          disabled={loading}
          className="mb-4 rounded-lg border border-gray-400 p-3 font-normal outline-sky-400"
        />
        <div className="mb-4 flex items-center gap-2">
          <input
            id="termsOfUse"
            type="checkbox"
            name="termsOfUse"
            value={soulSold}
            onChange={() => setSoulSold((prev) => !prev)}
            className="accent-[rgb(var(--primary))]"
          />
          <label htmlFor="termsOfUse" className="font-normal">
            Je vends mon âme au diable
          </label>
        </div>
        <input
          type="submit"
          value={"S'inscrire"}
          disabled={loading}
          className="rounded-lg bg-[rgb(var(--primary))] py-3 text-lg font-bold text-white"
        />
      </form>
      <p className="text-center text-gray-500">
        Déjà inscrit ?{" "}
        <Link to={"/connexion"} className="font-bold text-black underline">
          Se connecter
        </Link>
      </p>
      {error && <p className="text-center text-red-400">{error}</p>}
      {confirmEmail && (
        <p className="text-center font-semibold text-[rgb(var(--primary))]">
          Tu vas recevoir un email de confirmation d'inscription
        </p>
      )}
    </div>
  );
};

export default SignUpForm;
