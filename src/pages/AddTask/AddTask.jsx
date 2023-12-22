import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdAddTask } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const AddTask = () => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const {user}= useAuth()
  const onSubmit = async(data) => {
    // console.log(data);
    const taskInfo = {
      title: data?.title,
      description: data?.description,
      deadlines: data?.deadlines,
      priority: data?.priority,
      status: "to-do",
      email: user?.email
    }

    try{
     const res = await axios.post('https://tast-management-server.vercel.app/task', taskInfo)
      if(res.data?.acknowledged){
        toast.success("Task create success !")
        reset()
      }
    }catch(err){
      console.log("task post error--->", err);
    }
    
  };
  const selectPriority = watch("priority");
  return (
    <div className="mt-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="flex justify-center items-center gap-1 text-2xl font-semibold">
          Create a new Task <MdAddTask />
        </h2>
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
