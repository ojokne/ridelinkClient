const useId = () => {
  return sessionStorage.getItem("clientId") ?? false;
};

export default useId;
