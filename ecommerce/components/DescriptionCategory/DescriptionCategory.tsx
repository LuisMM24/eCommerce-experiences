import { ArrowNarrowRight } from "tabler-icons-react";

interface Props {
  title: string;
  text: string;
}

export const DescriptionCategory: React.FC<Props> = ({ title, text }) => {
  return (
    <li className="descriptionCat">
      <span className="catName">
        <ArrowNarrowRight />
        {title}:
      </span>
      <p>{text}</p>
    </li>
  );
};
