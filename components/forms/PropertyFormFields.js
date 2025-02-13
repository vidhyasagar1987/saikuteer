export const inputs = [
  {
    label: "Property Name",
    type: "text",
    placeholder: "Property Name...",
    name: "propertyName",
    required: true,
  },
  {
    label: "Address",
    type: "text",
    placeholder: "Address...",
    name: "address",
    required: true,
  },
  {
    label: "Price (₹)",
    type: "number",
    placeholder: "Price...",
    name: "price",
    required: true,
  },
  {
    label: "Area (Sq.Ft)",
    type: "number",
    placeholder: "Area...",
    name: "area",
    required: true,
  },
  {
    label: "Property Status",
    type: "select",
    placeholder: "Property Status...",
    name: "status",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Closed", value: "closed" },
    ],
  },
  {
    label: "Property Category",
    type: "select",
    placeholder: "Property Category...",
    name: "category",
    options: [
      { label: "For Sale", value: "for_sale" },
      { label: "For Rent", value: "for_rent" },
    ],
    required: true,
  },
  {
    label: "Property Type",
    type: "checkbox",
    placeholder: "Property Type...",
    name: "type",
    options: [
      { label: "Apartments", value: "apartments" },
      { label: "Commercial Properties", value: "commercial" },
      { label: "Plots", value: "plots" },
      { label: "Ready to move", value: "readytomove" },
      { label: "Rental", value: "rental" },
      { label: "Villas", value: "villas" },
    ],
    required: true,
  },

  {
    label: "Description",
    type: "textarea",
    placeholder: "Description...",
    name: "description",
    required: true,
  },
  {
    label: "Proerty Features",
    type: "textarea",
    placeholder: "Proerty Features...",
    name: "features",
    required: false,
  },
  {
    label: "Nearby Attractions",
    type: "textarea",
    placeholder: "Nearby Attractions...",
    name: "attractions",
    required: false,
  },
  {
    label: "Video Url",
    type: "url",
    placeholder: "Video Url...",
    name: "url",
    required: false,
  },
];
