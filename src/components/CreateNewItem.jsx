import React, { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Container,
  Popper,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import AddIcon from "@mui/icons-material/Add";

import { AppContext } from "../utils";
import Loading from "../loading";
import { CustomButton } from "./ArtNft";
import AttributesModal from "./AttributesModal";

//Styled Component
const MainHeading = styled(Typography)({
  fontWeight: 700,
  letterSpacing: "0.2px",
  color: "black",
  lineHeight: { xs: "auto", sm: "56px" },
});
//Styled Component
const AddButton = styled(Box)({
  height: "60px",
  width: "60px",
  border: "1px solid #098CDC",
  borderRadius: "20px",
  "&:hover": {
    border: "10px solid #098CDC",
  },
  transition: "0.4s ease-out",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

const Attribute = styled(Box)({
  border: "1px solid #098CDC",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#098CDC",
    color: "#FFFFFF",
  },
  transition: "0.4s ease-out",
  cursor: "pointer",
  padding: "10px 15px",
});

const StyledInput = styled(TextField)({
  width: "100%",
  marginTop: "30px",
  fontWeight: "400",
  color: "black",
  borderBottomColor: "black",
  "& .MuiInput-underline": {
    borderBottomColor: "black",
  },
  "& label": {
    color: "black",
  },
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#098CDC ",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "black",
  },
  "& .MuiInput-underline:hover": {
    borderBottomColor: "#098CDC ",
  },
  "& .MuiStandardInput-root": {
    borderBottomColor: "black !important",
    "& fieldset": {
      color: "black",
      borderBottomColor: "black",
    },

    "&:hover fieldset": {
      color: "black",
      borderBottomColor: "black",
    },
    "&.Mui-focused fieldset": {
      color: "black",
      borderBottomColor: "black",
    },
  },

  input: {
    "&[type=number]": {
      "-moz-appearance": "textfield",
    },
    "&::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    color: "black !important",
    fontSize: { xs: "16px", md: "14px" },
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "black",
    },
  },
});

const CreateNewItem = () => {
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const { signer, sign } = useContext(AppContext);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  function getImageFileObject(imageFile) {
    console.log({ onAdd: imageFile });
  }
  function runAfterImageDelete(file) {
    console.log({ onDele: file });
  }

  const signMessage = async () => {
    try {
      setLoading(true);
      await sign();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (signer) {
      signMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };

  const [value, setValue] = React.useState(null);
  return (
    <Box py="40px">
      <AttributesModal
        open={open}
        setOpen={setOpen}
        setAttributes={setAttributes}
        attributes={attributes}
      />
      <Loading loading={loading} />
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: "0 0 10px",
            backdropFilter: "blur(76px)",
            borderRadius: "20px",
            px: { sm: "40px", xs: "20px" },
            py: { sm: "30px", xs: "20px" },
          }}
          py="40px"
        >
          <Box>
            <Box component="h2" textAlign="center">
              <MainHeading fontSize={{ xs: "25px", sm: "44px" }}>
                Create New NFT
              </MainHeading>
            </Box>
            <form
              action=""
              autoComplete="off"

              //   onSubmit={handleClick}
            >
              <Box mt="30px">
                <ImageUploader
                  onFileAdded={(img) => getImageFileObject(img)} // function that runs to confirm that your image actually exists
                  onFileRemoved={(img) => runAfterImageDelete(img)} // function runs on once you delete your image
                />
              </Box>
              <StyledInput
                //   onChange={(e) => setName(e.target.value)}
                variant="standard"
                label="NFT Name"
                id="standard-name"
                required
              />

              <StyledInput
                //   onChange={(e) => setEmail(e.target.value)}
                variant="standard"
                label="External Link"
                id="standard-name"
                required
                placeholder="https://example.com/item/323"
              />

              <StyledInput
                //   onChange={(e) => setEmail(e.target.value)}
                variant="standard"
                label="Description"
                id="standard-name"
                required
              />

              <Autocomplete
                multiple
                {...defaultProps}
                id="controlled-demo"
                // value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                PopperComponent={(props) => (
                  <Popper {...props}>{props.children}</Popper>
                )}
                renderInput={(params) => (
                  <StyledInput
                    {...params}
                    label="Catagories"
                    variant="standard"
                  />
                )}
              />

              <Box
                mt="30px"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid black",
                  pb: "10px",
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={"700"}>
                    {" "}
                    Attributes{" "}
                  </Typography>
                  <Typography variant="p">
                    NFT attributes like gender , hair-color , e.g.{" "}
                  </Typography>
                </Box>
                <AddButton onClick={() => setOpen(true)}>
                  <AddIcon sx={{ fontSize: "30px" }} />
                </AddButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  mt: "20px",
                }}
              >
                {attributes.map(({ name, type }, i) => (
                  <Attribute mt="5px" mx="10px" key={i}>
                    <Typography
                      variant="h6"
                      fontWeight={"700"}
                      textAlign="center"
                    >
                      {name}
                    </Typography>
                    <Typography variant="p" mt="20px" textAlign="center">
                      {type}
                    </Typography>
                  </Attribute>
                ))}
              </Box>

              <Box
                mt="30px"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid black",
                  pb: "10px",
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={"700"}>
                    {" "}
                    Explicit & Sensitive Content
                  </Typography>
                  <Typography variant="p">
                    Set this item as explicit and sensitive content
                  </Typography>
                </Box>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Box>

              <Box
                mt="20px"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <CustomButton type="submit">Create New NFT</CustomButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "Virtual world", year: 1994 },
  { title: "Music", year: 1972 },
  { title: "Gaming", year: 1974 },
  { title: "Art", year: 1974 },
  { title: "Vectors", year: 1974 },
];

export default CreateNewItem;
