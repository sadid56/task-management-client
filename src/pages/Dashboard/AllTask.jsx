import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AllTaskCard from "./AllTaskCard";

const AllTask = () => {
  const { user } = useAuth();
  const { data: allTasks = [], refetch } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axios.get(
        `https://tast-management-server.vercel.app/task?email=${user?.email}`
      );
      return res.data;
    },
  });


  const toDoTask = allTasks.filter((task) => task?.status === "to-do");
  const ongoingTask = allTasks.filter((task) => task?.status === "ongoing");
  const completedTask = allTasks.filter((task) => task?.status === "completed");

  return (
    <div className="grid md:grid-cols-3 min-h-screen">
      <div className="border-2 w-full">
        {/* todo */}
        <h2 className="text-2xl text-center font-semibold border-b-2 border-black w-fit mx-auto">
          To-Do
        </h2>
        <AllTaskCard tasks={toDoTask} refetch={refetch}/>
      </div>
      <div className="border-2 w-full">
        {/* ongoing */}
        <h2 className="text-2xl text-center font-semibold border-b-2 border-black w-fit mx-auto">
          Ongoing
        </h2>
        <AllTaskCard tasks={ongoingTask} refetch={refetch}/>
      </div>
      <div className="border-2 w-full">
        {/* complete */}
        <h2 className="text-2xl text-center font-semibold border-b-2 border-black w-fit mx-auto">
          Completed
        </h2>
        <AllTaskCard tasks={completedTask} refetch={refetch}/>
      </div>
    </div>
  );
};

export default AllTask;
