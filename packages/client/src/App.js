import { AuthenticatedLayout } from "./layouts/AuthenticatedLayout";
import { AuthenticatedRoutes } from "./routes/AuthenticatedRoutes";
import { UnauthenticatedRoutes } from "./routes/UnauthenticatedRoutes";

const useLoggedUser = () => ({ loggedUser: true });

export function App() {
  const { loggedUser } = useLoggedUser();

  if (!loggedUser) {
    return <UnauthenticatedRoutes />;
  }

  return (
    <AuthenticatedLayout>
      <AuthenticatedRoutes />
    </AuthenticatedLayout>
  );
}
