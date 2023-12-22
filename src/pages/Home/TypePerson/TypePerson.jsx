import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TypePerson = () => {
  const { data: persons = [] } = useQuery({
    queryKey: ["person"],
    queryFn: async () => {
      const res = await axios.get("/typePerson.json");
      return res.data;
    },
  });
  // console.log(persons);
  return (
    <div className=" max-w-7xl mx-auto">
      <div className="text-center w-full mx-auto my-5 md:my-10">
        <h2 className="text-4xl font-bold">Task </h2>
        <p className="font-semibold">Which type person use my task</p>
      </div>
      <div className="mb-10 grid gap-5 grid-cols-1 mx-3 md:hidden">
        {persons.map((person) => (
          <div className="p-3 rounded-md shadow-md text-center space-y-3 border" key={person.id}>
            <h2 className="text-xl font-bold">{person.typeOfPerson}</h2>
            <p className="text-gray-400 font-medium">{person.feature}</p>
          </div>
        ))}
      </div>
      <div className="steps steps-vertical md:steps-horizontal mb-10 hidden md:flex">
        {persons.map((person) => (
          <div className="step p-3 rounded-md shadow-md text-center" key={person.id}>
            <h2 className="text-xl font-bold">{person.typeOfPerson}</h2>
            <p className="text-gray-400 font-medium">{person.feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypePerson;
