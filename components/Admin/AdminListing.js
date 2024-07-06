"use client";
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import { Add, Edit } from "@mui/icons-material";
import { supabase } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import AddPropertyForm from "@/components/forms/AddPropertyForm";

function AdminListing() {
  const [listings, setListings] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const getListings = async () => {
    let { data: listing, error } = await supabase.from("listing").select("*");
    setListings(listing?.sort((a, b) => b.id - a.id));
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
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                onClick={() => {
                  setIsEdit(true);
                  handleEditProperty(property);
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                onClick={() => {
                  setIsEdit(true);
                  handleEditProperty(property);
                }}
              >
                Delete
              </Button>
            </>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    customToolbar: (dataIndex) => [
      <Button
        color="primary"
        startIcon={<Add />}
        onClick={handleAddProperty}
        key={dataIndex}
      >
        Add Property
      </Button>,
    ],
  };
  const DialogTitleCustom = styled(DialogTitle)(() => ({
    background: "#ccc",
    color: "#363B4D",
    fontSize: "1.25rem",
    borderBottom: "1px solid #E0E0E0",
  }));
  return (
    <div style={{ padding: "20px" }}>
      <MUIDataTable
        title={"Property Listings"}
        data={listings}
        columns={columns}
        options={options}
        style={{ border: "1px solid #ddd", borderRadius: "4px" }}
      />
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
      >
        <DialogTitleCustom>
          {currentProperty ? "Edit Property" : "Add Property"}
        </DialogTitleCustom>
        <DialogContent>
          {
            <AddPropertyForm
              setOpen={setOpen}
              getListings={getListings}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              currentProperty={currentProperty}
              setCurrentProperty={setCurrentProperty}
            />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outline">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminListing;
