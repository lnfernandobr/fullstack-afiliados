import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../users/UserContext";
import { api } from "../services/api";
import { RoutePaths } from "../routes/RoutePaths";
import { Logo } from "../components/Logo";
import { TOKEN_KEY } from "../constants";

export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ password: "", email: "" });
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onChange = ({ target: { value, name } }) =>
    setForm((prevState) => ({ ...prevState, [name]: value }));

  const handleLogin = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    setIsAuthenticated(true);
    navigate(RoutePaths.ROOT);
    toast("Bem vindo!", { type: "success" });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = isRegister ? "/users/signup" : "/auth/signin";
      const data = {
        email: form.email.toLowerCase().trim(),
        password: form.password,
        ...(isRegister ? { name: form.name } : {}),
      };

      const response = await api.post(url, data);

      if (isRegister && response.data.id) {
        api.post("/auth/signin", data).then((r) => handleLogin(r.data.token));
        return;
      }

      const tk = response.data.token;
      if (tk) {
        handleLogin(tk);
      }
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
          <Logo size={92} />
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-400">
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
          <div className="-space-y-px rounded-md shadow-sm">
            {isRegister && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Nome
                </label>
                <input
                  onChange={onChange}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mb-4 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Nome"
                />
              </div>
            )}

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
                placeholder="Email"
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
                className="mt-4 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Senha"
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
