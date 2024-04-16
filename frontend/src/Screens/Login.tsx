import { useEffect } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducer/user.reducer";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../redux/store";

export default function Login() {
  const validationSchema = object({
    email: string()
      .email("Please provide a proper email address")
      .required("Email is Required"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, err }: any = useSelector(
    (state: IRootState) => state.userReducer
  );

  useEffect(() => {
    if (Object.keys(user).length) {
      navigate("/");
    }
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 p-[15px] rounded shadow-lg">
        <h3 className="font-bold text-lg text-gray-950">Sign in</h3>
        {err.length ? <p className="text-sm text-red-500 mt-2">{err}</p> : ""}
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            dispatch(loginUser({ ...values, role: "Applicant" }) as any);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label htmlFor="email">Please provide your email address</label>
                <br />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="rounded w-96 h-8 p-3"
                  placeholder="Enter email here..."
                />
                <br />
                {errors.email && touched.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                className="text-white bg-blue-800 rounded w-96 h-10 mt-4 shadow-md"
                disabled={loading}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
