"use client";
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { supabase } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import AddPropertyForm from "@/components/forms/AddPropertyForm";
import PopUpModal from "@/components/Modal/PopUpModal";
import Loading from "@/components/Loading/Loading";
import { ViewIcon } from "lucide-react";
import Link from "next/link";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { fetchListings } from "@/app/(auth)/login/action";
import { useToast } from "../ui/use-toast";

function AdminListing() {
  const [listings, setListings] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);

  const getListings = async () => {
    setLoading(true);

    try {
      const data = await fetchListings();
      setListings(
        data
          ?.sort((a, b) => b.id - a.id)
          ?.map((item) => ({
            ...item,
            category: item.category === "for_sale" ? "For Sale" : "For Rent",
            status: item.status === "active" ? "Active" : "Closed",
          }))
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.message,
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  const handleAddProperty = () => {
    setIsEdit(false);
    setCurrentProperty(null);
    setOpen(true);
  };

  const handleEditProperty = (property) => {
    setCurrentProperty(property);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProperty(null);
  };

  const handleDeleteProperty = () => {
    setDeleteVisible(true);
  };

  const handleDeleteClose = () => {
    setDeleteVisible(false);
  };

  const columns = [
    { name: "propertyName", label: "Name" },
    { name: "address", label: "Location" },
    { name: "price", label: "Price" },
    { name: "status", label: "Status" },
    { name: "category", label: "Category" },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const property = listings[tableMeta.rowIndex];
          return (
            <>
              <IconButton
                color="primary"
                onClick={() => {
                  setIsEdit(true);
                  handleEditProperty(property);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  handleDeleteProperty(property);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>

              <Link href={`/listings/${property?.id}`}>
                <Button color="primary" startIcon={<ViewIcon />}>
                  View
                </Button>
              </Link>
            </>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    print: false,
    customToolbar: (dataIndex) => [
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddProperty}
        key={dataIndex}
      >
        Add Property
      </Button>,
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome Admin!</h2>
      {loading ? (
        <Loading />
      ) : (
        <MUIDataTable
          title={"Property Listings"}
          data={listings}
          columns={columns}
          options={options}
          style={{ border: "1px solid #ddd", borderRadius: "4px" }}
        />
      )}
      <PopUpModal
        title={currentProperty ? "Edit Property" : "Add Property"}
        open={open}
        handleClose={handleClose}
      >
        <AddPropertyForm
          setOpen={setOpen}
          getListings={getListings}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          currentProperty={currentProperty}
          setCurrentProperty={setCurrentProperty}
        />
      </PopUpModal>
      <PopUpModal
        title={"Delete Property"}
        open={deleteVisible}
        handleClose={handleDeleteClose}
      >
        Are you sure want to delete the Property
      </PopUpModal>
    </div>
  );
}

export default AdminListing;
