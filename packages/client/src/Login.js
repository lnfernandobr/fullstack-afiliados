import { useState } from "react";
import { api } from "./services/api";
import { useAuth, useLoggedUser } from "./users/UserContext";
import { RoutePaths } from "./routes/RoutePaths";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ password: "", email: "" });
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onChange = ({ target: { value, name } }) =>
    setForm((prevState) => ({ ...prevState, [name]: value }));

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = isRegister ? "/users/signup" : "/auth/signin";
      const response = await api.post(url, {
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });
      console.log(response);
      setIsAuthenticated(true);
      localStorage.setItem("token", response.data.token);
      navigate(RoutePaths.ROOT);
    } catch (err) {
      console.log(err);
      toast(err?.response?.data.message || "Email ou senha incorretos", {
        type: "error",
      });
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center flex-col">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Fullstack Afiliados
          </h2>
          <button
            className="text-sm mt-4 text-blue-600 underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Quero fazer login" : "Quero fazer cadastro"}
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                onChange={onChange}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                onChange={onChange}
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isRegister ? "Cadastrar" : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
