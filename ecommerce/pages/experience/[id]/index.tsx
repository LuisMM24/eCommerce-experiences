import { NextPage, GetServerSideProps } from "next";
import { Plus } from "tabler-icons-react";
import { IExperienceCard } from "../..";
import { DescriptionCategory } from "../../../components/DescriptionCategory/DescriptionCategory";
import { HeaderMenuColored } from "../../../components/header/Header";

export interface IFullExperience extends IExperienceCard {
  description: string;
  group: string;
  level: string;
  dates: string;
  bookedSlots: number;
}
interface Props {
  experience: IFullExperience;
}

const svgLocation = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="svgLocation"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const index: NextPage<Props> = ({ experience }) => {
  const {
    _id,
    title,
    description,
    group,
    level,
    dates,
    location,
    photos,
    price,
    availableSlots,
    bookedSlots,
  } = experience;
  const bgImage = {
    backgroundImage: `url(${photos[0]})`,
  };
  console.log(title);
  return (
    <>
      <HeaderMenuColored
        links={[{ link: "/", label: "Adventures" }]}
        marginBottom={0}
      />

      <article style={bgImage} className="expIntroduction">
        <section className="introSection">
          <h3 className="expTitle">{title}</h3>
          <span className="expLocation">
            {svgLocation}
            {location}
          </span>
        </section>
      </article>
      <article className="expDescription">
        <ul className="descriptionCategories">
          <DescriptionCategory title="Level" text={level} />
          <DescriptionCategory title="Group" text={group} />
          <DescriptionCategory title="Dates" text={dates} />
        </ul>
        <section className="descriptionField">{description}</section>
      </article>

      <article className="expSectionButtons">
        <div className="priceAndPurchaseWrapper">
          <span className="actionButton priceText">Starting from {price}€</span>
          <button className="actionButton bookButton">
            <span className="bookSpan">
              Book now <Plus width={15} />
            </span>
          </button>
        </div>
      </article>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:4000/experiences/${id}`);
  const experience = await res.json();

  return { props: { experience } };
};

export default index;
