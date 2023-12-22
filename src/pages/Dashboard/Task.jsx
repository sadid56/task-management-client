import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import TaskTabular from "./TaskTabular";

const Task = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState('To-Do')
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axios.get(
        `https://tast-management-server.vercel.app/task?email=${user?.email}`
      );
      return res.data;
    },
  });

 
  // console.log(tasks);
  const tabsList = ["To-Do","Ongoing","Completed"];
  const toDoTask = tasks.filter(task => task?.status === "to-do")
  const ongoingTask = tasks.filter(task => task?.status === "ongoing")
  const completedTask = tasks.filter(task => task?.status === "completed")
  return (
    <div>
      <h2 className="text-3xl text-center my-10 font-bold">All Task</h2>
      <div className="overflow-x-auto mx-10">
        <Tabs>
          <TabList className="flex justify-center gap-5 items-center cursor-pointer my-5 font-bold">
            {tabsList.map((tab) => (
              <Tab className={`outline-none ${currentTab === tab ? "border-b-2 border-black" : undefined}`} onClick={()=>setCurrentTab(tab)} key={tab}>{tab}</Tab>
            ))}
          </TabList>
          <TabPanel>
            <TaskTabular refetch={refetch} tasks={toDoTask}/>
          </TabPanel>
          <TabPanel>
          <TaskTabular refetch={refetch} tasks={ongoingTask}/>
          </TabPanel>
          <TabPanel>
          <TaskTabular refetch={refetch} tasks={completedTask}/>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Task;
