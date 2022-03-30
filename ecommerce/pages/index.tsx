import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { HeaderMenuColored } from "../components/header/Header";

const Home: NextPage = () => {
  return <HeaderMenuColored links={[{ link: "/", label: "Home" }]} />;
};

export default Home;
