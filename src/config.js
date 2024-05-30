export const formFields = {
  "9da04d87-adb8-4334-afc3-1b866cdb2a9b": [
    {
      key: "storageaccountname",
      name: "Storage Account Name",
      type: "text",
      options: [
        {
          description: "",
          key: "",
          name: "",
        },
      ],
    },
    {
      key: "region",
      name: "Region",
      type: "dropdown",
      options: [
        {
          description: "",
          key: "lrs",
          name: "Locally-redundent storage (LRS)",
        },
        {
          description: "",
          key: "zrs",
          name: "Zone-redundent storage (ZRS)",
        },
      ],
    },
    {
      key: "performance",
      name: "Performance",
      type: "radio",
      options: [
        {
          description:
            "Recommended for most scenarios (general-purpose v2 account)",
          key: "standard",
          name: "Standard",
        },
        {
          description: "Recommended for scenarios that require low latency.",
          key: "premium",
          name: "Premium",
        },
      ],
    },
    {
      key: "premiumaccounttype",
      name: "Premium account type",
      type: "dropdown",
      options: [
        {
          description: "",
          key: "blackbloba",
          name: "Black blobs",
        },
        {
          description: "",
          key: "fileshares",
          name: "File shares",
        },
        {
          description: "",
          key: "pageblobs",
          name: "Page blobs",
        },
      ],
    },
    {
      key: "redundency",
      name: "Redundancy",
      type: "checkbox",
      options: [
        {
          description: "",
          key: "lrs",
          name: "Locally-redundent storage (LRS)",
        },
        {
          description: "",
          key: "zrs",
          name: "Zone-redundent storage (ZRS)",
        },
      ],
    },
  ],
};
