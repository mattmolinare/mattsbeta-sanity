import { defineType } from "sanity";
import PointInput from "../components/point-input";

const pointType = defineType({
  name: "point",
  title: "Point",
  type: "geopoint",
  components: {
    input: PointInput,
  },
});

export default pointType;
