import { IFullExperience } from "../../pages/experience/[id]";

export const Experience: React.FC<IFullExperience> = ({
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
}) => {
  return <div>Hello Experience</div>;
};
