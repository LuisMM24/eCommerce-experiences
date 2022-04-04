import { GetServerSideProps, NextPage } from "next";
import { IExperienceCard } from "../..";
import { ExperienceCard } from "../../../components/ExperienceCard/ExperienceCard";

interface Props {
  data: IExperienceCard;
}

const index: NextPage<Props> = ({ data }) => {
  const { _id, title, location, photos, price, availableSlots } = data;
  return (
    <article>
      <section></section>
      <section>
        <div className="smallExperienceCard">
          <ExperienceCard
            _id={_id}
            title={title}
            location={location}
            photos={photos}
            price={price}
            availableSlots={availableSlots}
          />
        </div>
      </section>
    </article>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const res = await fetch(`http://localhost:4000/experiences/${id}`);
  const data = await res.json();
  return { props: { data } };
};

export default index;
