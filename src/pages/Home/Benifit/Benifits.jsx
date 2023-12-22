import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Benifits = () => {
    const { data: benifits = [] } = useQuery({
        queryKey: ["benifit"],
        queryFn: async () => {
          const res = await axios.get("/benifit.json");
          return res.data;
        },
      });
    //   console.log(benifits);
    return (
        <div className="max-w-7xl mx-auto mb-10">
             <div className="text-center w-full mx-auto my-10">
        <h2 className="text-4xl font-bold">Benefits</h2>
        <p className="font-semibold">What benefits can user get from my website?</p>
      </div>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-5 mx-3">
        {
            benifits.map(benifit => <div key={benifit?.id} className="text-center border rounded shadow-md p-5 space-y-2">
                <div className="flex justify-center">
                    <img className="w-10" src={benifit?.icon} alt="" />
                </div>
                <h2 className="text-2xl font-semibold">{benifit?.title}</h2>
                <p className="text-gray-500 font-medium">{benifit?.description}</p>
            </div>)
        }
      </div>
        </div>
    );
};

export default Benifits;