import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const Banner = () => {
  return (
    <div
      className="hero h-[80vh]"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/dBTvfCy/pexels-shvets-production-7191994.jpg)",
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="md:w-1/2 md:mx-auto text-center space-y-4 mx-5">
        <h2 className="text-5xl md:text-6xl font-bold text-slate-300">Task Management !!</h2>
        <p className="text-gray-300">Empower your productivity with our intuitive task-management website! Seamlessly organize and prioritize your tasks, collaborate with ease, and stay on top of your goals. Experience efficiency redefined – your tasks, your way.</p>
        <div className="">
          <Link to="Dashboard" className="btn text-white text-xl hover:text-black bg-[#111423] outline-none border-none">Let's Explore</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
