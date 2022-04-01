import { IExperienceCard } from "../../pages";
import { Container } from "@mantine/core";
import Image from "next/image";
export const ExperienceCard: React.FC<IExperienceCard> = ({
  _id,
  title,
  location,
  photos,
  availableSlots,
  bookedSlots,
  price,
}) => {
  return (
    <article className="cardWrapper">
      <img src={photos[0]} alt="photo" />
      <Container className="absoluteContainer">
        <Container>
          <h3 className="expTitle">{title}</h3>
          <span className="expLocation">{location}</span>
        </Container>
        <Container>
          <span className="expAvailability">
            {availableSlots - bookedSlots} spots left
          </span>
          <span className="expPrice">Starting from {price}€</span>
        </Container>
      </Container>
    </article>
  );
};
