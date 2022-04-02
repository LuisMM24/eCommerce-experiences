import { IExperienceCard } from "../../pages";
import { Container } from "@mantine/core";
export const ExperienceCard: React.FC<IExperienceCard> = ({
  _id,
  title,
  location,
  photos,
  availableSlots,
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
          <div className="expAvailability">{availableSlots} spots left</div>
          <div className="expPrice">Starting from {price}€</div>
        </Container>
      </Container>
    </article>
  );
};
