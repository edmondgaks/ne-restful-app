import { useState } from "react";
import { errorToast, successToast } from "../utils/Toast";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/Api";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isFormDataFilled = Object.values(formData).every(
      (value) => value !== ""
    );

    if (!isFormDataFilled) {
      errorToast("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        API_URL + "/users/admin/register",
        formData
      );

      if (response?.data?.status == 201) {
        successToast("Successfully registered");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });

        setLoading(false);
        navigate("/login");
      } else {
        errorToast(
          response?.data?.message || "Error occurred while registering"
        );
      }
    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="pb-12">
      <h1 className="text-xl text-black font-extrabold text-center my-12">
        Library Management System
      </h1>
      <div className="flex flex-col items-center mt-8 border w-full md:w-[35vw] mx-auto py-8 px-16">
        <h1 className="font-black text-black mb-4 text-xl">Create account</h1>
        <p className="text-xs font-light text-gray-400 mb-8">
          To start using Library Management System, you need to create an
          account.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <Input
              type="text"
              name="firstName"
              placeholder="First name"
              defaultInputValue={formData.firstName || ""}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              name="lastName"
              placeholder="Last name"
              defaultInputValue={formData.lastName || ""}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
          <div className="mb-6">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              defaultInputValue={formData.email || ""}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="mb-8">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              defaultInputValue={formData.password || ""}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="w-full mb-6 flex justify-center mx-auto text-base px-4 py-3 text-white rounded-md"
          >
            {loading ? "Creating account..." : "Signup"}
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
