import { useForm } from "react-hook-form";
import axios from "axios";

import React from "react"; 

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      username: "rajesh",
      email: "rajesh@gmail.com",
      password: "rajeshgatty",
      cnfPassword: "rajeshgatty",
    },
  });
  async function onSubmit({ username, email, password }) {
     const data={username,email,password}
    try{
        const response = await axios.post('http://localhost:5000/api/register',data);
        console.log(response.data);
    }catch(err){
        console.log(err);
        console.log("error")
    }
  }
  return (
    <div className="bg-neutral-500 w-screen h-screen flex items-center justify-center">
      <form
        className="flex flex-col w-96 h-96 bg-red-400"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center text-2xl p-3">Registration form</h2>

        <input
          {...register("username", {
            required: "user name required",
          })}
          className="m-5 h-12 p-2"
          type="text"
          placeholder="Enter user name"
        />
        {errors.username && <div>{errors.username.message}</div>}
        <input
          {...register("email", {
            required: "Enter enaail correcltu",
          })}
          className="m-5 h-12 p-2"
          type="email"
          placeholder="Enter user email"
        />
        {errors.email && <div>{errors.email.message}</div>}
        <input
          {...register("password", {
            required: "enter the password required",
            minLength: {
              value: 8,
              message: "password must be at least 8 characters long",
            },
          })}
          className="m-5 h-12 p-2"
          type="password"
          placeholder="Enter user password"
        />
        {errors.password && <div>{errors.password.message}</div>}

        <input
          {...register("cnfPassword", {
            required: "enter the password required",
            minLength: {
              value: 8,
              message: "password must be at least 8 characters long",
            },
            validate: (value) => {
              if (watch("password") !== value) {
                return "passwords do not match";
              }
              return true;
            },
          })}
          className="m-5 h-12 p-2"
          type="password"
          placeholder="Enter user password"
        />
        {errors.cnfPassword && <div>{errors.cnfPassword.message}</div>}
        <button
          className="bg-green-500 text-white mx-24"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading" : "submit"}
        </button>
      </form>
    </div>
  );
}

export default Registration;
