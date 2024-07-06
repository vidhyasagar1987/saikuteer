"use client";

import React from "react";
import Input from "@/components/ui/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Required } from "../../../components/constants";
import { Button } from "@/components/ui/button";
import { emailLogin } from "./action";

const Page = ({ searchParams }) => {
  const inputs = [
    {
      label: "Email",
      type: "email",
      placeholder: "Email...",
      name: "email",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Password...",
      name: "password",
    },
  ];
  const schema = Yup.object().shape({
    email: Yup.string().required(Required),
    password: Yup.string().required(Required),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { email: values.email, password: values.password };
      emailLogin(data);
    },
  });

  const handleChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <div
      className="border border-gray-600 p-5 rounded-md bg-white/10
      w-[80%] mx-auto md:w-[25rem]"
    >
      <form
        className="flex flex-col item-center gap-2"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-center text-xl uppercase pb-3">Sign In</h1>
        {inputs.map((item, i) => (
          <Input
            item={item}
            key={i}
            handleChange={handleChange}
            formik={formik}
          />
        ))}
        {searchParams && searchParams?.message}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Page;
