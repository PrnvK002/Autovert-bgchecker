import BackgroundVerification from "./BackgroundVerification";
import Themeprovider from "../Provider/Themeprovider";
import userCheck from "../Hooks/userCheck";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = userCheck();
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn]);

  return (
    <>
      <Themeprovider>
        <BackgroundVerification />
      </Themeprovider>
    </>
  );
}
