import { IExperience } from "../../pages";
import { Container } from "@mantine/core";
import Image from "next/image";
export const ExperienceCard: React.FC<IExperience> = ({
  _id,
  title,
  location,
  photos,
}) => {
  return (
    <article className="cardWrapper">
      <Image
        layout="fill"
        src={
          "https://images.unsplash.com/photo-1601505804121-45e2c5506c94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        }
        alt="photo"
      />
      <Container className="absoluteContainer">
        <Container>
          <h3 className="expTitle">{title}</h3>
          <span className="expLocation">{location}</span>
        </Container>
        <Container>
          <span className="expAvailability">2 spots left</span>
          <span className="expPrice">Starting from 1500€</span>
        </Container>
      </Container>
    </article>
  );
};
