import React from "react";
import { Formik } from "formik";
import { object, string } from "yup";

export default function Login() {
  const validationSchema = object({
    email: string()
      .email("Please provide a proper email address")
      .required("Email is Required"),
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 p-[15px] rounded shadow-lg">
        <h3 className="font-bold text-lg text-gray-950">Sign in</h3>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
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
                disabled={isSubmitting}
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
