import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export const RatingComponent = ({value }:{value:number}) => {

  return (
    <Rating style={{ maxWidth: 150 }} value={value}  readOnly/>
  );
};
