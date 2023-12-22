import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Registration = () => {
  const { creteUser, profileUpdate } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    try {
      creteUser(data.email, data.password)
        .then(() => {
          profileUpdate(data.name, data.photo)
            .then(() => {
              toast.success("User create success!");
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => toast.error(err));
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="p-10 rounded-md shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photo")}
                placeholder="Photo"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <p href="#" className="">
                  Already have an account ?{" "}
                  <Link to="/login" className="font-bold">
                    Login
                  </Link>
                </p>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-active btn-neutral">
                Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
