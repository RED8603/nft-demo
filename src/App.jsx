import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import ArtNft from "./components/ArtNft";
import Header from "./components/Header";
import NetworkChange from "./networkSwitch";

import bg from "./images/bg.png";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Route } from "react-router-dom";
import CreateNewItem from "./components/CreateNewItem";

const web3 = new Web3(
  Web3.givenProvider
    ? Web3.givenProvider
    : "https://matic-mumbai.chainstacklabs.com"
);
function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let chain = async () => {
      const chainid = await web3.eth.getChainId();
      if (chainid !== 80001) {
        setOpen(true);
      }
    };
    chain();
  }, []);

  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <>
              <Header />
              <ArtNft />
            </>
          }
        />
        <Route
          children
          path="create-new-nft"
          element={
            <>
              <Header />
              <CreateNewItem />
            </>
          }
        />
      </>
    )
  );

  return (
    <Box
      sx={
        {
          // background: `url(${bg})`,
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          // minHeight: "100vh",
        }
      }
    >
      <NetworkChange open={open} setOpen={setOpen} />
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
