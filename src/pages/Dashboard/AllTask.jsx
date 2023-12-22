
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import UpdateTask from "../../shared/UpdateTask/UpdateTask";
import Swal from "sweetalert2";


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

    const handleDelete = (task) => {
        try {
          Swal.fire({
            title: "Are you sure?",
            text: `Are you sure to delete ${task?.title} task ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const res = await axios.delete(
                `https://tast-management-server.vercel.app/task/${task?._id}`
              );
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                refetch();
              }
            }
          });
        } catch (err) {
          console.log("delete error-->", err);
        }
      };
  
    return (
        <div className="grid md:grid-cols-3 min-h-screen">
            <div className="border-2 w-full">
                {/* todo */}
                <h2 className="text-2xl text-center font-semibold border-b-2 border-black w-fit mx-auto">To-Do</h2>
                {
                    allTasks.map(task=> <div key={task?._id} className="p-5 m-3 rounded border border-black shadow-lg">
                        <div className="flex justify-between items-center">
                            <p >{task?.priority}</p>
                            <p>{task?.deadlines}</p>
                        </div>
                        <h2 className="text-2xl font-semibold">{task?.title}</h2>
                        <p className="text-gray-500">{task?.description}</p>
                        <div className="text-xl flex justify-between mt-5 gap-3">
                      <button onClick={() => handleDelete(task)}>
                        <MdOutlineDelete />
                      </button>
                      <button>
                        <UpdateTask task={task} refetch={refetch} />
                      </button>
                    </div>
                    </div>)
                }

            </div>
            <div className="border-2 w-full">
                {/* ongoing */}
                <h2 className="text-2xl text-center font-semibold border-b-2 border-black w-fit mx-auto">Ongoing</h2>
                
            </div>
            <div className="border-2 w-full">
                {/* complete */}
                <h2 className="text-2xl text-center font-semibold border-b-2 border-black w-fit mx-auto">Completed</h2>

            </div>
        </div>
    );
};

export default AllTask;