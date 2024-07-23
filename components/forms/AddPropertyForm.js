"use client";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Required } from "../constants";
import { inputs } from "./PropertyFormFields";
import FileUpload from "./FileUpload";
import { UploadImage } from "./UploadImage";
import { supabase } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";

function AddPropertyForm({ setOpen, getListings, isEdit, currentProperty }) {
  const { toast } = useToast();

  const schema = Yup.object().shape({
    propertyName: Yup.string().required(Required),
    price: Yup.number().required(Required),
    address: Yup.string().required(Required),
    description: Yup.string().required(Required),
    type: Yup.array().min(1, "At least one amenity must be selected"),
    image: Yup.string().required(Required),
  });
  const formik = useFormik({
    initialValues: {
      propertyName: currentProperty?.propertyName || "",
      price: currentProperty?.price || null,
      address: currentProperty?.address || "",
      area: currentProperty?.area || null,
      description: currentProperty?.description || "",
      status: currentProperty?.status || "active",
      category: currentProperty?.category || "for_sale",
      type: currentProperty?.type || [],
      features: currentProperty?.features || "",
      attractions: currentProperty?.attractions || "",
      url: currentProperty?.url || "",
      image: "",
      image_url: currentProperty?.image_url || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      delete values.image;
      // delete values.imageUrl;

      const payload = {
        area: Number(values.area),
        price: Number(values.price),
        ...values,
      };

      if (!isEdit) {
        const { data, error } = await supabase
          .from("listing")
          .insert(payload)
          .select();

        if (data) {
          formik.resetForm();
          setOpen(false);
          getListings();
          toast({
            description: "Your Property has been created successfully",
          });
        }
        if (error) {
          console.log(error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
      } else {
        const { data, error } = await supabase
          .from("listing")
          .update(payload)
          .eq("id", currentProperty?.id)
          .select();

        if (data) {
          formik.resetForm();
          setOpen(false);
          getListings();
          toast({
            description: "Your Property has been updated successfully",
          });
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
      }
    },
  });

  const handleChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;

    formik.setFieldValue("image", URL.createObjectURL(files[0]));
    // setPreview(URL.createObjectURL(files[0]));
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await UploadImage(file);
        formik.setFieldValue("image_url", imageUrl);

        console.log(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div>
      <div className="pt-10">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inputs.map((item, i) => (
              <div
                key={i}
                className={`${
                  item.type === "textarea" || item.type === "url"
                    ? "col-span-1 md:col-span-3"
                    : ""
                }`}
              >
                <Input
                  item={item}
                  key={i}
                  handleChange={handleChange}
                  formik={formik}
                />
              </div>
            ))}
            <div className="col-span-1 md:col-span-3">
              <FileUpload handleChange={handleImageChange} formik={formik} currentProperty={currentProperty} />
            </div>
          </div>

          <div className=" flex  gap-3 mt-5">
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Submitting" : "Submit"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => formik.resetForm()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPropertyForm;
