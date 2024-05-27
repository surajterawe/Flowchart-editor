import { ChoiceGroup, TextField } from "office-ui-fabric-react";
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import React, { memo, useState } from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { Handle, Position } from "reactflow";

const options = [
  {
    key: "public_access_from_all_network",
    text: <p style={{ margin: 0 }}>Enable public access from all networks</p>,
    ariaLabel: "A label with a cat icon",
    onRenderField: (props, render) => {
      return <div>{render(props)}</div>;
    },
  },
  {
    key: "public_access_from_selected_virtual_networks_and_ip",
    text: (
      <p style={{ margin: 0 }}>
        Enable public access from selected virtual networks and IP addresses
      </p>
    ),
    ariaLabel: "A label with a cat icon",
    onRenderField: (props, render) => {
      return <div>{render(props)}</div>;
    },
  },
  {
    key: "disable_public_access_and_use_pvt_access",
    text: (
      <p style={{ margin: 0 }}>Disable public access and use private access</p>
    ),
    ariaLabel: "A label with a cat icon",
    onRenderField: (props, render) => {
      return <div>{render(props)}</div>;
    },
  },
];

const dimensionAttrs = [
  "Storage account name",
  "Region",
  "Performance",
  "Redundancy",
];
const handleStyle = {
  top: "10%",
};
const RedundancyOptions = [
  {
    key: "lrs",
    text: "Locally-redundant storage (LRS)",
    description:
      "Lowest-cost option with basic protection against server rack and drive failures. Recommended for non-critical scenarios.",
  },
  {
    key: "zrs",
    text: "Zone-redundant storage (ZRS)",
    description:
      "Intermediate option with protection against datacenter-level failures. Recommended for high availability scenarios.",
  },
];



// const RedundancyOptions = [
//     { key: 'fruitsHeader', text: 'Fruits' },
//     { key: 'apple', text: 'Apple' },
//     { key: 'banana', text: 'Banana' },
//     { key: 'orange', text: 'Orange', disabled: true },
//     { key: 'grape', text: 'Grape' },
//     { key: 'broccoli', text: 'Broccoli' },
//     { key: 'carrot', text: 'Carrot' },
//     { key: 'lettuce', text: 'Lettuce' },
//   ];

export default memo(({ id }) => {
  const [selectednetAccess, setSelectedNetAccess] = useState(options[0]);
  const onRenderOption = (option) => {
    return (
      <div>
        <div>{option.text}</div>
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          flexDirection: "column",
        }}
        className="wrapper gradient"
      >
        <p
          style={{
            position: "relative",
            borderBottom: "1px solid #00000010",
            color: "black",
            marginTop: "5px",
            marginBottom: "1px",
            fontWeight: "600",
            padding: "5px 0 9px 20px",
            fontFamily: "sans-serif",
            fontSize: "18px",
          }}
        >
          <Icon iconName="StorageAcount" />
          Network Settings
        </p>
        <div
          className="inner"
          style={{
            paddingTop: "0",
          }}
        >
          <form>
            <div className="inputWrapper">
              {/* <TextField
                label={"Storage Account Name"}
                className="textfield-custom"
                id={"storageaccountname"}
                required
              />
              <Dropdown
                label={"Region"}
                style={{
                  position: "relative",
                }}
                onRenderOption={onRenderOption}
                id="region"
                placeholder="Select your region"
                options={RedundancyOptions}
                required
              /> */}
              <ChoiceGroup
                selectedKey={selectednetAccess.key}
                options={options}
                onChange={(ev, option) => {
                  setSelectedNetAccess({ ...option });
                }}
                label="Network Access"
                required={true}
              />
              {selectednetAccess.key ===
                "public_access_from_selected_virtual_networks_and_ip" && (
                <>
                  <p
                    style={{
                      color: "#000000",
                      fontSize: "14px",
                      fontWeight: "600",
                      margin: 0,
                      marginTop: "15px",
                    }}
                  >
                    Virtual networks
                  </p>

                  <Dropdown
                    label={"Virtual network subscription"}
                    style={{
                      position: "relative",
                    }}
                    onRenderOption={onRenderOption}
                    id="region"
                    placeholder="Select your Virtual Network Subscription"
                    options={RedundancyOptions}
                    required
                  />
                  <Dropdown
                    label={"Virtual network"}
                    style={{
                      position: "relative",
                    }}
                    onRenderOption={onRenderOption}
                    id="region"
                    placeholder="Select your Virtual Network"
                    options={RedundancyOptions}
                    required
                  />
                </>
              )}

              {selectednetAccess.key ===
                "disable_public_access_and_use_pvt_access" && (
                <>
                  <p
                    style={{
                      color: "#000000",
                      fontSize: "16px",
                      fontWeight: "600",
                      margin: 0,
                      marginTop: "15px",
                    }}
                  >
                    Create private endpoint
                  </p>

                  <TextField
                    label={"Storage Account Name"}
                    className="textfield-custom"
                    id={"storageaccountname"}
                    required
                  />

                  <TextField
                    label={"Address range"}
                    className="textfield-custom"
                    id={"addressrange"}
                    required
                  />
                   <TextField
                    label={"Subnet range"}
                    className="textfield-custom"
                    id={"addressrange"}
                    required
                  />
                   
                </>
              )}
            </div>
          </form>
          {!dimensionAttrs && "no node connected"}
        </div>
      </div>
      {/* <Handle type="source" style={handleStyle} isConnectable={true} position={Position.Left} /> */}
      <Handle
        type="target"
        style={handleStyle}
        id="netwrokingStorage"
        isConnectable={true}
        position={Position.Right}
      />
    </>
  );
});
