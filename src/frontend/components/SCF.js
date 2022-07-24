import { Contract, providers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import {
  CHARITY_ABI,
  CHARITY_ADDRESS,
  NFT_ABI,
  NFT_ADDRESS,
} from "../constants/constants";

const [loading, setLoading] = useState(false);

const getProviderOrSigner = async (needSigner = false) => {
  const provider = await web3ModalRef.current.connect();
  const web3Provider = new providers.Web3Provider(provider);

  const { chainId } = await web3Provider.getNetwork();
  if (chainId !== 4) {
    window.alert("Please switch to the Polygon network!");
    throw new Error("Please switch to the Polygon network");
  }

  if (needSigner) {
    const signer = web3Provider.getSigner();
    return signer;
  }
  return web3Provider;
};

const getCharity = (providerOrSigner) => {
  return new Contract(CHARITY_ADDRESS, CHARITY_ABI, providerOrSigner);
};

// Helper function to return a CryptoDevs NFT Contract instance
// given a Provider/Signer
const getNFT = (providerOrSigner) => {
  return new Contract(NFT_ADDRESS, NFT_ABI, providerOrSigner);
};

const listCause = async (goal) => {
  try {
    const signer = await getProviderOrSigner(true);
    const charityContract = getCharity(signer);
    const txn = await charityContract.listCause(goal);
    setLoading(true);
    await txn.wait();
    setLoading(false);
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
};

const CancelListing = async (oldId) => {
  try {
    const signer = await getProviderOrSigner(true);
    const charityContract = getCharity(signer);
    const txn = await charityContract.CancelListing();
    setLoading(true);
    await txn.wait();
    setLoading(false);
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
};

const Donate = async (oldId, person) => {
  try {
    const signer = await getProviderOrSigner(true);
    const charityContract = getCharity(signer);
    const txn = await charityContract.Donate(oldId, person);
    const NFTContract = getNFT(signer);
    const tx = await NFTContract.mintNft();
    setLoading(true);
    await txn.wait();
    await tx.wait();
    setLoading(false);
    await fetchAllProposals();
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
};

const DonorCancel = async (oldDonorCount) => {
  try {
    const signer = await getProviderOrSigner(true);
    const charityContract = getCharity(signer);
    const txn = await charityContract.DonorCancel(oldDonorCount);
    setLoading(true);
    await txn.wait();
    setLoading(false);
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
};

const UpdateCause = async (oldId, newGoal) => {
  try {
    const signer = await getProviderOrSigner(true);
    const charityContract = getCharity(signer);
    const txn = await charityContract.UpdateCause(oldId, newGoal);
    setLoading(true);
    await txn.wait();
    setLoading(false);
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
};

const WithdrawProceeds = async (oldId) => {
  try {
    const signer = await getProviderOrSigner(true);
    const charityContract = getCharity(signer);
    const txn = await charityContract.WithdrawProceeds(oldId);
    setLoading(true);
    await txn.wait();
    setLoading(false);
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
};

const getListing = async (oldId) => {
  try {
    const signer = await getProviderOrSigner(true);
    const charityContract = getCharity(signer);
    const txn = await charityContract.getListing(oldId);
    setLoading(true);
    await txn.wait();
    setLoading(false);
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
};

const getProceeds = async (oldId) => {
  try {
    const signer = await getProviderOrSigner(true);
    const charityContract = getCharity(signer);
    const txn = await charityContract.getProceeds(oldId);
    setLoading(true);
    await txn.wait();
    setLoading(false);
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
};
