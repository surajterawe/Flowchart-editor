import { ChoiceGroup, TextField } from "office-ui-fabric-react";
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import React, { memo } from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { Handle, Position } from "reactflow";
const options = [
  {
    key: "A",
    text: (
      <p style={{ margin: 0 }}>
        {" "}
        <span style={{ fontWeight: 600 }}>Standard :</span> Recommended for most
        scenarios (general-purpose v2 account)
      </p>
    ),
    ariaLabel: "A label with a cat icon",
    onRenderField: (props, render) => {
      return <div>{render(props)}</div>;
    },
  },
  {
    key: "B",
    text: (
      <p style={{ margin: 0 }}>
        {" "}
        <span style={{ fontWeight: 600 }}>Premium :</span> Recommended for
        scenarios that require low latency.
      </p>
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
const handleStyle2 = {
  top: "20%",
};
const handleStyle3 = {
  top: "30%",
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

const AccountTypeOptions = [
  {
    key: "blockblob",
    text: "Block blobs:",
    description: "Best for high transaction rates or low storage latency",
  },
  {
    key: "fileshares",
    text: "File shares:",
    description:
      "Best for enterprise or high-performance applications that need to scale",
  },
  {
    key: "pageblobs",
    text: "Page Blobs:",
    description: "Best for random read and write operations",
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
          Storage Account
        </p>
        <div
          className="inner"
          style={{
            paddingTop: "0",
          }}
        >
          <form>
            <div className="inputWrapper">
              <TextField
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
              />
              <ChoiceGroup
                defaultSelectedKey="B"
                options={options}
                label="Performance"
                required={true}
              />

              <Dropdown
                label={"Premium account type"}
                style={{
                  position: "relative",
                }}
                onRenderOption={onRenderOption}
                id="premiumaccounttype"
                placeholder="Select your permium account type"
                options={AccountTypeOptions}
                required
              />
              <div
                style={{
                  position: "relative",
                }}
              >
                {/* <select name="cars" id="cars">
                  {RedundancyOptions.map((option) => {
                    return (
                      <option value={option.key}>
                        <div>
                            <div> {option.text} </div>
                            <div>{option.description}</div>
                        </div>
                        
                      </option>
                    );
                  })} */}
                  {/* <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option> */}
                {/* </select> */}

                <Dropdown
                  label={"Redundancy"}
                  style={{
                    position: "relative",
                  }}
                  // onRenderOption={onRenderOption}
                  id="redundency"
                  placeholder="Select Your option"
                  options={RedundancyOptions}
                  required
                />
              </div>
            </div>
          </form>
          {!dimensionAttrs && "no node connected"}
        </div>
      </div>
      {/* <Handle type="source" style={handleStyle} isConnectable={true} position={Position.Left} /> */}
      <Handle
        type="source"
        style={handleStyle}
        id="a"
        isConnectable={true}
        position={Position.Left}
      />
      <Handle
        id="b"
        type="target"
        style={handleStyle2}
        isConnectable={true}
        position={Position.Left}
      />
      <Handle
        id="c"
        type="target"
        style={handleStyle3}
        isConnectable={true}
        onRenderOption={onRenderOption}
        position={Position.Left}
      />
    </>
  );
});
