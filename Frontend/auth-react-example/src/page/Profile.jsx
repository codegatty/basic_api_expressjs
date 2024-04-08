import { useForm } from "react-hook-form";
import { useEffect, useContext, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthProvider";
import {axios_private } from "../axios_conifg/axios";
import useRefresh from "../hooks/useRefresh";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Profile() {
  const authCtx = useContext(AuthContext);
  const [username,setUsername]=useState("");
  const refresh=useRefresh();
  const axiosPrivate=useAxiosPrivate()
  useEffect(() => {
    async function getProfile() {
      try {
        const response = await axiosPrivate.get("http://localhost:5000/api/current", {
          headers: {
            Authorization: `Bearer ${authCtx.tokenId}`,
          },
        });
        
        setUsername(response.data.username);
      } catch (e) {
        console.log(e);
      }
    }
    getProfile();
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {},
  });
  async function onSubmit(data) {
    try {
      const response = await axiosPrivate.post(
        "http://localhost:5000/api/contacts",
        data,{
        headers: {
          Authorization: `Bearer ${authCtx.tokenId}`,
        },withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (er) {
      console.log(er);
    }
  }
  return (
    <div className="bg-neutral-500 w-screen h-screen flex items-center justify-center">
      <p>Logged in as {username}</p>
      <form
        className="flex flex-col w-96 h-96 bg-red-400"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center text-2xl p-3">Contact form</h2>

        <input
          {...register("name", {
            required: "contact name required",
          })}
          className="m-5 h-12 p-2"
          type="text"
          placeholder="Enter name"
        />
        {errors.name && <div>{errors.name.message}</div>}
        <input
          {...register("email", {
            required: "Enter email",
          })}
          className="m-5 h-12 p-2"
          type="email"
          placeholder="Enter  email"
        />
        {errors.email && <div>{errors.email.message}</div>}
        <input
          {...register("phone", {
            required: "enter the phone required",
            minLength: {
              value: 8,
              message: "password must be at least 10 characters long",
            },
          })}
          className="m-5 h-12 p-2"
          type="number"
          placeholder="Enter user phone number"
        />
        {errors.phone && <div>{errors.phone.message}</div>}

        <button
          className="bg-green-500 text-white mx-24"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading" : "submit"}
        </button>
      </form>
      <button onClick={()=>{refresh()}}>Refresh</button>
    </div>
  );
}

export default Profile;
