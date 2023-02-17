import { ACTIONS } from "../context/actions";
import { useAuthentication } from "../context/StateProvider";

const useAuth = () => {
  const { auth, authDispatch } = useAuthentication();
  (async () => {
    try {
      let res = await fetch("http://localhost:5000/check_auth", {
        method: "GET",
        credentials: "include",
      });
      let data = await res.json();
      if (data.isAuthenticated !== auth.isAuthenticated) {
        authDispatch({
          type: ACTIONS.AUTHENTICATE,
          isAuthenticated: data.isAuthenticated,
          id: data.id,
        });
      }
    } catch (e) {
      console.log(e);
    }
  })();
};

export default useAuth;
