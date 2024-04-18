import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import moment from "moment";
import { getApplicant } from "../redux/reducer/user.reducer";
import Loader from "./Loader.component";
import DetailModal from "./ApplicantDetails.component";

export default function BasicTable() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { applicants, loading } = useSelector(
    (state: IRootState) => state.userReducer
  );

  const handleMoreInfo = (id: string) => {
    dispatch(getApplicant(id) as any);
    setOpen(true);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((row: any) => (
            <tr key={row._id} className="border-b-2">
              <td className="p-2">
                <button
                  className="bg-yellow-400 p-2"
                  onClick={() => handleMoreInfo(row._id)}
                >
                  more info
                </button>
              </td>
              <td style={{ paddingLeft: "1rem" }}>
                {moment(row.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </td>
              <td style={{ paddingLeft: "1rem" }}>{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Loader open={loading} />
      <DetailModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
