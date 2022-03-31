import { IExperience } from "../../pages/";
interface Props {
  experiences: [IExperience];
}

export const HomeContent: React.FC<Props> = ({ experiences }) => {
  console.log(experiences);
  return <div></div>;
};
