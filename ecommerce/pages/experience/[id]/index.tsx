import { NextPage, GetServerSideProps } from "next";
// hooks
import { useRouter } from "next/router";
import { useContext, useState } from "react";
// icons
import { Plus } from "tabler-icons-react";
// interfaces
import { IExperienceCard } from "../..";
// components
import Link from "next/link";
import { Modal } from "@mantine/core";
import { DescriptionCategory } from "../../../components/DescriptionCategory/DescriptionCategory";
import { HeaderMenuColored } from "../../../components/header/Header";
// context
import { authContext } from "../../../context/authContext";

//svg
import modalImage from "../../../assets/img/modalCheckout.svg";
import { locationIcon } from "../../../utils/locationIcon";
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

const index: NextPage<Props> = ({ experience }) => {
  const { currentUser } = useContext(authContext);
  const router = useRouter();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
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

  const handleBookButton = (): void => {
    if (currentUser) {
      router.push(`/checkout/${_id}`);
      return;
    }
    setIsModalOpened(true);
  };
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
            {locationIcon}
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
          <button
            className="actionButton bookButton"
            onClick={handleBookButton}
          >
            <span className="bookSpan">
              Book now <Plus width={15} />
            </span>
          </button>
        </div>
      </article>
      <Modal
        opened={isModalOpened}
        title="Before to book, login or create an account 🤖"
        onClose={() => setIsModalOpened(false)}
        transition="fade"
        transitionDuration={600}
      >
        <h4 className="experienceModalText">
          Please,{" "}
          <Link href="/login">
            <a className="loginLink">login&nbsp;</a>
          </Link>
          or&nbsp;
          <Link href="/login">
            <a className="loginLink">register&nbsp;</a>
          </Link>
          to book this experience and proceed to checkout
        </h4>
        <img src={modalImage.src} alt="payment guy" />
      </Modal>
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
