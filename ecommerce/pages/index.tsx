import type { NextPage, GetServerSideProps } from "next";
import { useState } from "react";

// components
import { Grid, Loader } from "@mantine/core";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
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
  data: [IExperienceCard];
}

const Home: NextPage<Props> = ({ data }) => {
  const [experiences, setExperiences] = useState<Array<IExperienceCard>>(data);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(2);

  const getMoreExperiences = async (): Promise<void> => {
    const res = await fetch(`http://localhost:4000/experiences?page=${page}`);
    const data = await res.json();
    if (data.length === 0) {
      setHasMore(false);
      return;
    }
    setPage((page) => page + 1);
    setExperiences((prevExperiences) => [...prevExperiences, ...data]);
  };

  return (
    <>
      <HeaderMenuColored links={[{ link: "/", label: "Adventures" }]} />

      <InfiniteScroll
        dataLength={experiences.length}
        next={getMoreExperiences}
        hasMore={hasMore}
        loader={<Loader size="xl" />}
        endMessage={"END"}
      >
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
      </InfiniteScroll>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:4000/experiences?page=1");
  const data = await res.json();

  return { props: { data } };
};

export default Home;
