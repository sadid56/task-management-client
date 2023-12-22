/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { googleLogin, loginUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const location = useLocation()
  const onSubmit = (data) => {
    console.log(data);
    try {
      loginUser(data.email, data.password)
        .then(() => {
          toast.success("Login success!");
          navigate(location?.state ? location?.state : "/")
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (err) {
      toast.error(err);
    }
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Google login success!");
        navigate(location?.state ? location?.state : "/")
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="p-10 rounded-md shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="">
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
                    Don't have an account ?{" "}
                    <Link to="/registration" className="font-bold">
                      Registration
                    </Link>
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-active btn-neutral">
                  Login
                </button>
              </div>
            </form>
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline text-xl mt-5 w-full">
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
