import useAuth from "../../hooks/useAuth";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { CiMail } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoMdHome } from "react-icons/io";

const SIdebar = () => {
  const { user } = useAuth();
  return (
    <div className="">
      <div className="flex justify-center mt-10">
        <div className="avatar online">
          <div className="w-28  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} />
          </div>
        </div>
      </div>
      <h2 className="text-center text-3xl text-slate-300 font-bold mt-2 flex justify-center gap-1 items-center">
        {user?.displayName} <RiVerifiedBadgeFill className="text-blue-500" />
      </h2>
      <p className="text-xl font-medium flex items-center gap-1 justify-center text-slate-400">
        <CiMail /> {user?.email}
      </p>
      <hr className="my-5 border border-slate-400" />
      <ul className="pl-10 space-y-4">
        <li className="">
          <NavLink
            className="text-xl font-medium flex items-center gap-1 text-slate-400"
            to="/dashboard">
            <MdDashboard /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-xl font-medium flex items-center gap-1  text-slate-400"
            to="/">
            <IoMdHome /> Home
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SIdebar;
