import { Grid } from "@mantine/core";
import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { ExperienceCard } from "../components/ExperienceCard/ExperienceCard";
import { HeaderMenuColored } from "../components/header/Header";

export interface IExperienceCard {
  _id: string;
  title: string;
  location: string;
  photos: [string];
  price: number;
  availableSlots: number;
}

interface Props {
  experiences: [IExperienceCard];
}

const Home: NextPage<Props> = ({ experiences }) => {
  return (
    <>
      <HeaderMenuColored links={[{ link: "/", label: "Adventures" }]} />

      {
        <Grid m={0}>
          {experiences.map((experience) => {
            const { _id, title, location, photos, price, availableSlots } =
              experience;
            return (
              <Grid.Col m={0} key={_id} xs={6} md={6} lg={4} mb={20}>
                <Link href={`/experience/${_id}`}>
                  <a>
                    <ExperienceCard
                      _id={_id}
                      title={title}
                      location={location}
                      photos={photos}
                      price={price}
                      availableSlots={availableSlots}
                    />
                  </a>
                </Link>
              </Grid.Col>
            );
          })}
        </Grid>
      }
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:4000/experiences");
  const experiences = await res.json();

  return { props: { experiences } };
};

export default Home;
