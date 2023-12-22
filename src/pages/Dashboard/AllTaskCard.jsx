/* eslint-disable react/prop-types */
import { MdOutlineDelete } from "react-icons/md";
import UpdateTask from "../../shared/UpdateTask/UpdateTask";
import Swal from "sweetalert2";
import axios from "axios";


// eslint-disable-next-line no-unused-vars
const AllTaskCard = ({refetch, tasks}) => {
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
        <div>
            {tasks.map((task) => (
          <div
            key={task?._id}
            className="p-5 m-3 rounded border border-black shadow-lg">
            <div className="flex justify-between items-center">
              <p>{task?.priority}</p>
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
          </div>
        ))}
        </div>
    );
};

export default AllTaskCard;