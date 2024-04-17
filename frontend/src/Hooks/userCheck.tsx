import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect, useState } from "react";

export default function userCheck() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { user } = useSelector((state: IRootState) => state.userReducer);
  useEffect(() => {
    console.log("checks user");
    
    if (Object.keys(user).length) setLoggedIn(true);
    else setLoggedIn(false);
  }, [user]);

  return { isLoggedIn };
}
