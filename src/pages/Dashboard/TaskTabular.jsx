/* eslint-disable react/prop-types */
import { MdOutlineDelete } from "react-icons/md";
import UpdateTask from "../../shared/UpdateTask/UpdateTask";
import Swal from "sweetalert2";
import axios from "axios";


const TaskTabular = ({tasks, refetch}) => {
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
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Deadlines</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, indx) => (
                  <tr key={task?._id}>
                    <th>{indx + 1}</th>
                    <td>{task?.title}</td>
                    <td>{task?.description}</td>
                    <td>{task?.priority}</td>
                    <td>{task?.deadlines}</td>
                    <td className="text-xl flex gap-3">
                      <button onClick={() => handleDelete(task)}>
                        <MdOutlineDelete />
                      </button>
                      <button>
                        <UpdateTask task={task} refetch={refetch} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
};

export default TaskTabular;