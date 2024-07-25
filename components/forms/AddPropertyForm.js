"use client";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import QuillEditor from "@/components/ui/QuillEditor";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { Required } from "../constants";
import { inputs } from "./PropertyFormFields";
import FileUpload from "./FileUpload";
import { RemoveImage, UploadImage } from "./UploadImage";
import { supabase } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";

function AddPropertyForm({ setOpen, getListings, isEdit, currentProperty }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const validateSizeImage = async (file) => {
    if (!file) return false;

    const fileSizeLimit = 200 * 1024; // 200 KB

    return new Promise((resolve, reject) => {
      if (file.size > fileSizeLimit) {
        return reject(new Error("Image size should not exceed 200 KB"));
      }
      resolve(true);
    });
  };

  const validateDimensionImage = async (file) => {
    if (!file) return false;

    const image = new Image();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        image.onload = () => {
          if (image.width < 1280 || image.height < 720) {
            return reject(
              new Error("Image dimensions should be at least 800x400 pixels")
            );
          }
          resolve(true);
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const schema = Yup.lazy((values) => {
    return Yup.object().shape({
      propertyName: Yup.string().required(Required),
      price: Yup.number().required(Required),
      address: Yup.string().required(Required),
      description: Yup.string().required(Required),
      area: Yup.number().required(Required),
      content: Yup.string().required("Content is required"),
      type: Yup.array().min(1, "At least one amenity must be selected"),
      image: values.newImageUploaded
        ? Yup.mixed()
            .required("Image is required")
            .test(
              "fileSize",
              "Image size should not exceed 200 KB",
              async () => {
                if (!values.sourceImage) return false;
                try {
                  await validateSizeImage(values.sourceImage);
                  return true;
                } catch (error) {
                  return false;
                }
              }
            )
            .test(
              "fileDimensions",
              "Image dimensions should be at least 800x400 pixels",
              async () => {
                if (!values.sourceImage) return false;
                try {
                  await validateDimensionImage(values.sourceImage);
                  return true;
                } catch (error) {
                  return false;
                }
              }
            )
        : Yup.string().required(Required),
    });
  });
  const formik = useFormik({
    initialValues: {
      propertyName: currentProperty?.propertyName || "",
      content: "",
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
      image: currentProperty?.image_url || "",
      image_url: currentProperty?.image_url || "",
      sourceImage: "",
      newImageUploaded: false,
      imageRemoved: false,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      const file = values.sourceImage;
      const imageRemoved = values.imageRemoved;
      const newImageUploaded = values.newImageUploaded;
      if (!isEdit) {
        if (file) {
          try {
            const imageUrl = await UploadImage(file);

            const payload = {
              area: Number(values.area),
              price: Number(values.price),
              image_url: imageUrl,
              propertyName: values.propertyName,
              price: values?.price,
              address: values?.address,
              area: values?.area,
              description: values?.description,
              status: values?.status,
              category: values?.category,
              type: values?.type,
              features: values?.features,
              attractions: values?.attractions,
              url: values?.url,
            };
            if (imageUrl) {
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
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description: error.message,
                });
              }
            }
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: error.message,
            });
          } finally {
            setLoading(false);
          }
        }
      } else {
        let imageUrl = currentProperty.image_url;
        try {
          if (imageRemoved && newImageUploaded) {
            const oldImageFileName = currentProperty.image_url.split("/").pop();
            await RemoveImage(oldImageFileName);
            imageUrl = await UploadImage(file);
          }
          const payload = {
            area: Number(values.area),
            price: Number(values.price),
            image_url: imageUrl,
            propertyName: values.propertyName,
            price: values?.price,
            address: values?.address,
            area: values?.area,
            description: values?.description,
            status: values?.status,
            category: values?.category,
            type: values?.type,
            features: values?.features,
            attractions: values?.attractions,
            url: values?.url,
          };

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
              description: error.message,
            });
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
          });
        } finally {
          setLoading(false);
        }
      }
    },
  });

  const handleChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      formik.setValues({
        ...formik.values,
        image: URL.createObjectURL(files[0]),
        sourceImage: files[0],
        newImageUploaded: true,
      });
    }
  };
  const handleRemoveImage = () => {
    formik.setValues({
      ...formik.values,
      image: "",
      sourceImage: "",
      image_url: "",
      imageRemoved: true,
      newImageUploaded: false,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const fileInputRef = useRef(null);

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
              <QuillEditor
                handleChange={handleChange}
                formik={formik}
                name="content"
              />
            </div>
            <div className="col-span-1 md:col-span-3">
              <FileUpload
                handleChange={handleImageChange}
                formik={formik}
                currentProperty={currentProperty}
                onClose={handleRemoveImage}
                fileInputRef={fileInputRef}
              />
            </div>
          </div>

          <div className=" flex  gap-3 mt-5">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting" : "Submit"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
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
