import React from "react";
import { Contract } from "@ethersproject/contracts";
import tokenAbi from "./tokenAbi.json";
import presaleAbi from "./preSaleAbi.json";
import stakingAbi from "./stakingAbi.json";
import nftMintingAbi from "./nftMinting.json";
import {
  tokenAddress,
  presaleAddress,
  stakingAddress,
  nftMintingAddress,
} from "./environment";
import { ethers } from "ethers";
import { Alert, Snackbar } from "@mui/material";
let walletAddress = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";

const provider = new ethers.providers.JsonRpcProvider(
  "https://matic-mumbai.chainstacklabs.com"
);

export const voidAccount = new ethers.VoidSigner(walletAddress, provider);
function useContract(address, ABI, signer) {
  return React.useMemo(() => {
    if (signer) {
      return new Contract(address, ABI, signer);
    } else {
      return new Contract(address, ABI, voidAccount);
    }
  }, [address, ABI, signer]);
}

export function useTokenContract(signer) {
  return useContract(tokenAddress, tokenAbi, signer);
}
export function usePresaleContract(signer) {
  return useContract(presaleAddress, presaleAbi, signer);
}
export function useStakingContract(signer) {
  return useContract(stakingAddress, stakingAbi, signer);
}
export function useNftMinting(signer) {
  return useContract(nftMintingAddress, nftMintingAbi, signer);
}

export function ToastNotify({ alertState, setAlertState }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alertState.open}
      autoHideDuration={10000}
      key={"top" + "center"}
      onClose={() => setAlertState({ ...alertState, open: false })}
    >
      <Alert
        onClose={() => setAlertState({ ...alertState, open: false })}
        severity={alertState.severity}
      >
        {alertState.message}
      </Alert>
    </Snackbar>
  );
}
