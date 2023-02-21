const useAuth = () => {
  return sessionStorage.getItem("id") ?? false;
};

export default useAuth;
