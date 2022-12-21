import { Backdrop, Box, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { ToastNotify } from "../ConnectivityAssets/hooks";
import { CustomButton } from "./ArtNft";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: "20px",
};

const AttributesModal = ({ open, setOpen, setAttributes, attributes }) => {
  const handleClose = () => setOpen(false);
  const [attribute, setAttribute] = useState({
    name: "",
    type: "",
  });
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box>
        <ToastNotify alertState={alertState} setAlertState={setAlertState} />
        <Box sx={style}>
          <Typography variant="h6" fontWeight={"700"} textAlign="center">
            Add Attributes
          </Typography>

          <TextField
            sx={{ mt: "30px" }}
            fullWidth
            label="Name"
            value={attribute.name}
            placeholder="Gender"
            onChange={(e) =>
              setAttribute({ ...attribute, name: e.target.value })
            }
          />

          <TextField
            sx={{ mt: "30px" }}
            fullWidth
            label="Type"
            value={attribute.type}
            placeholder="Male"
            onChange={(e) =>
              setAttribute({ ...attribute, type: e.target.value })
            }
          />

          <Box textAlign="center" mt="30px">
            <CustomButton
              onClick={() => {
                setAttributes([...attributes, attribute]);
                setAttribute({
                  name: "",
                  type: "",
                });
                setAlertState({
                  open: true,
                  message: "Attribute Added successfully!",
                  severity: "success",
                });
                console.log("====================================");
                console.log(attributes);
                console.log("====================================");
              }}
            >
              {" "}
              Add More{" "}
            </CustomButton>
          </Box>

          <Box textAlign="center" mt="50px">
            <CustomButton
              onClick={() => {
                if (attribute.name.length > 0 && attribute.type.length > 0) {
                  setAttributes([...attributes, attribute]);
                }
                setAttribute({
                  name: "",
                  type: "",
                });
                if (attributes.length > 0) {
                  setAlertState({
                    open: true,
                    message: "Attribute Saved!",
                    severity: "success",
                  });
                }
                handleClose();
              }}
            >
              Save
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AttributesModal;
