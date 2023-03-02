const useToken = () => {
  return sessionStorage.getItem("clientToken") ?? false;
};

export default useToken;
