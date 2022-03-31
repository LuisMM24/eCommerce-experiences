import type { NextPage, GetServerSideProps } from "next";
import { HeaderMenuColored } from "../components/header/Header";
import { HomeContent } from "../components/HomeContent/HomeContent";

export interface IExperience {
  _id: string;
  title: string;
  location: string;
  photos: [string];
}

interface Props {
  data: [IExperience];
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <>
      <HeaderMenuColored links={[{ link: "/", label: "Adventures" }]} />
      <HomeContent experiences={data} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:4000/experiences");
  const data = await res.json();

  return { props: { data } };
};

export default Home;
