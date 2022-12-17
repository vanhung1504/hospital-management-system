import { isBefore } from "date-fns";
import { useSelector } from "react-redux";

function useCheckUser() {
  const { id, expired } = useSelector((state) => state.userLoggedIn);

  if (!id) return null;

  const isExpired = isBefore(new Date(expired), new Date());

  if (isExpired) {
    localStorage.removeItem("USER_LOGGEDIN");
    return null;
  }

  return id;
}

export default useCheckUser;
