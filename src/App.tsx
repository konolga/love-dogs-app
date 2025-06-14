import React, { useContext } from "react";
import { LoginForm } from "./components/LoginComponent/LoginForm";
import { LogoutButton } from "./components/LoginComponent/LogoutButton";
import { AuthContext } from "./context/authContext";
import { ListComponent } from "./components/ListComponent/ListComponent";
import { SearchComponent } from "./components/SearchComponent/SearchComponent";

export const App = () => {
  const { isAuthenticated, isLoading, error } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {isAuthenticated ? <LogoutButton /> : <LoginForm />}
      {<SearchComponent />}
      {!isAuthenticated && <div>Please log in to access the application.</div>}
    </div>
  );
};
