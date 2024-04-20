import {useEffect} from "react";
import Usertable from "../Components/Usertable.component";
import { useDispatch } from "react-redux";
import { getApplicants } from "../redux/reducer/user.reducer";

export default function Usermanagement() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApplicants() as any);
  },[])

  return (
    <>
      <h1 className="font-bold text-lg ms-3 mt-3 mb-3">Applicants</h1>
      <Usertable />
    </>
  );
}
