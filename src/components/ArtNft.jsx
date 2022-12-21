import React, { useContext } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { AppContext } from "../utils";
import { create } from "ipfs-http-client";
import { parseUnits } from "@ethersproject/units";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useNftMinting } from "../ConnectivityAssets/hooks";

import BALANCE from "../images/BALANCE.webp";
import text from "../images/test.png";
import CEREMONY from "../images/CEREMONY.webp";
import CLARITY from "../images/CLARITY.webp";
import COMPASSION from "../images/COMPASSION.webp";
import CONNECTION from "../images/CONNECTION.webp";
import DEFINITION from "../images/DEFINITION.webp";
import DETERMINATION from "../images/DETERMINATION.webp";
import DIGNITY from "../images/DIGNITY.webp";
import DISCERNMENT from "../images/DISCERNMENT.webp";
import ENDURANCE from "../images/ENDURANCE.webp";
import GRACE from "../images/GRACE.webp";
import HONESTY from "../images/HONESTY.webp";
import JOYFULPASSION from "../images/JOYFULPASSION.webp";
import KINDNESS from "../images/KINDNESS.webp";
import PRECISION from "../images/PRECISION.webp";
import PROTECTION from "../images/PROTECTION.webp";
import REALIZATION from "../images/REALIZATION.webp";
import SHINING from "../images/SHINING.webp";
import STABILITY from "../images/STABILITY.webp";
import STRENGTH from "../images/STRENGTH.webp";
import STRUCTURE from "../images/STRUCTURE.webp";

import Loading from "../loading";

//Styled Component
export const CustomButton = styled(Button)({
  background: "linear-gradient(90.1deg, #4889DA 0.08%, #FB497F 101.84%)",
  borderRadius: "44px",
  transition: "0.6s",
  "&:hover": {
    color: "#EF4D84",
    background: "black",
  },
  height: "36px",
  fontWeight: 700,
  fontSize: "12px",
  color: "white",
  width: "190px",
});

const nftArray = [
  { name: "BALANCE", img: BALANCE },
  { name: "CEREMONY", img: CEREMONY },
  { name: "CLARITY", img: CLARITY },
  { name: "COMPASSION", img: COMPASSION },
  { name: "CONNECTION", img: CONNECTION },
  { name: "DEFINITION", img: DEFINITION },
  { name: "DETERMINATION", img: DETERMINATION },
  { name: "DISCERNMENT", img: DISCERNMENT },
  { name: "DIGNITY", img: DIGNITY },
  { name: "ENDURANCE", img: ENDURANCE },
  { name: "GRACE", img: GRACE },
  { name: "HONESTY", img: HONESTY },
  { name: "JOYFUL PASSION", img: JOYFULPASSION },
  { name: "KINDNESS", img: KINDNESS },
  { name: "PRECISION", img: PRECISION },
  { name: "PROTECTION", img: PROTECTION },
  { name: "REALIZATION", img: REALIZATION },
  { name: "SHINING", img: SHINING },
  { name: "STABILITY", img: STABILITY },
  { name: "STRENGTH", img: STRENGTH },
  { name: "STRUCTURE", img: STRUCTURE },
];

const auth =
  "Basic " +
  Buffer.from(
    `${process.env.REACT_APP_PRJECT_ID}` +
      ":" +
      `${process.env.REACT_APP_SECRET_KEY}`
  ).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
const ArtNft = () => {
  const [loading, setLoading] = useState(false);
  const [cardsToLoad, setCardstoLoad] = useState({
    start: 0,
    end: 7,
  });
  const { account, connect, signer } = useContext(AppContext);
  const mintingContract = useNftMinting(signer);

  // const init = async () => {
  //   try {
  //     let owner = await mintingContract.owner();
  //     console.log(owner);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const previous = () => {
    if (cardsToLoad.start > 0) {
      setCardstoLoad({
        start: cardsToLoad.start - 7,
        end: cardsToLoad.end - 7,
      });
    }
  };

  const next = () => {
    if (cardsToLoad.end < 21) {
      setCardstoLoad({
        start: cardsToLoad.start + 7,
        end: cardsToLoad.end + 7,
      });
    }
  };

  const mint = async (index) => {
    try {
      setLoading(true);
      let singleNFT = {
        image: `https://ipfs.io/ipfs/Qmdxd5wCbgBbiATjgCPfGcSsgghDCLL2Yz5sw8mvRT5Hhk/${nftArray[index].name}.jpg`,
        name: nftArray[index].name,
        description: "This is the Spirtual ArtNft",
        type: "art",
        qType: "single",
        account: account,
      };
      console.log(singleNFT, "SINGLE NFT============>>>>>");
      const nftHash = await client.add(Buffer.from(JSON.stringify(singleNFT)));
      console.log(nftHash.path, "Hash--->");
      const res = await mintingContract.mint(account, [nftHash.path], {
        value: parseUnits("0.1"),
      });
      await res.wait();
      console.log(res);
      setLoading(false);
    } catch (error) {
      if (error?.data?.message) {
        console.log("e", error?.data?.message);
      } else if (error?.reason) {
        console.log("e", error?.reason);
      } else {
        console.log("e", error?.message);
      }
      setLoading(false);
      // console.log(error);
    }
  };

  return (
    <Box py="30px">
      <Loading loading={loading} />
      <Container>
        <Typography
          sx={{ color: "black", fontWeight: "700" }}
          textAlign={"center"}
          variant="h2"
        >
          Art NFT's{" "}
        </Typography>
        <Box mt="50px">
          <Box py={3}>
            <CustomButton
              disabled={cardsToLoad.start === 0 ? true : false}
              onClick={previous}
            >
              {" "}
              Load Previous{" "}
            </CustomButton>
          </Box>
          <Grid justifyContent={"center"} container spacing={5}>
            {nftArray
              .slice(cardsToLoad.start, cardsToLoad.end)
              .map(({ name, img }, i) => (
                <Grid key={i} item md={4} sm={6} xs={12}>
                  <Box
                    height={"100%"}
                    sx={{
                      backgroundColor: "white",
                      boxShadow: "0 0 10px",
                      borderRadius: "20px",
                      backdropFilter: "blur(15px)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      transition: "0.4s",
                      p: 2,
                      "&:hover": {
                        transform: "scale(1.1)",
                        borderRadius: "20px",
                        boxShadow: "0px 0 31px 0px rgb(0 0 0 / 30%)",
                      },
                    }}
                  >
                    <LazyLoadImage
                      src={img}
                      width="100%"
                      alt={name}
                      style={{ borderRadius: "20px" }}
                    />

                    {/* {`https://ipfs.io/ipfs/Qmdxd5wCbgBbiATjgCPfGcSsgghDCLL2Yz5sw8mvRT5Hhk/${name}.jpg`} */}
                    <Typography
                      sx={{ color: "black", fontWeight: "600" }}
                      textAlign={"center"}
                      variant="h4"
                    >
                      {name}
                    </Typography>
                    <Box pt="10px" textAlign={"center"}>
                      {account ? (
                        <CustomButton
                          onClick={() => {
                            mint(i);
                          }}
                        >
                          {" "}
                          MINT{" "}
                        </CustomButton>
                      ) : (
                        <CustomButton
                          disabled={cardsToLoad.end === 21 ? true : false}
                          onClick={connect}
                        >
                          {" "}
                          Connect{" "}
                        </CustomButton>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
          </Grid>
          <Box py={3}>
            <CustomButton
              disabled={cardsToLoad.end === 21 ? true : false}
              onClick={next}
            >
              Load Next
            </CustomButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ArtNft;
