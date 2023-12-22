/* eslint-disable react/prop-types */
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const UpdateTask = ({task, refetch}) => {
    const { register, handleSubmit, setValue, watch } = useForm();
  const onSubmit = async(data) => {
    // console.log(data);
    const taskInfo = {
      title: data?.title,
      description: data?.description,
      deadlines: data?.deadlines,
      priority: data?.priority
    }

    try{
     const res = await axios.patch(`https://tast-management-server.vercel.app/task/${task?._id}`,taskInfo)
      if(res.data?.acknowledged){
        toast.success("Update Success!")
        refetch()
        const modal = document.getElementById("updatetask")
        modal.close()
        
      }
    }catch(err){
      console.log("task update error--->", err);
    }
    
  };
  const selectPriority = watch("priority");
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="text-xl"
        onClick={() => document.getElementById("updatetask").showModal()}>
        <MdOutlineSystemUpdateAlt />
      </button>
      <dialog id="updatetask" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div>
          <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 p-5 rounded-md shadow-lg border">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                defaultValue={task?.title}
                {...register("title")}
                placeholder="Title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Descriptions</span>
              </label>
              <input
                type="text"
                defaultValue={task?.description}
                {...register("description")}
                placeholder="Descriptions"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Deadlines</span>
              </label>
              <input
                type="date"
                defaultValue={task?.deadlines}
                {...register("deadlines")}
                placeholder="Deadlines"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                {...register("priority")}
                onChange={(e) => setValue("priority", e.target.value)}
                defaultValue={task?.priority}
                value={selectPriority}
                className="select select-bordered"
                name=""
                id="">
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-active btn-neutral">
              Update
            </button>
          </div>
        </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateTask;
