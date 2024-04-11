import React, { useState } from "react";
import { Checkbox, List, Button, Space, message } from "antd";
import { CloseOutlined } from '@ant-design/icons';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleCheckboxChange = (index, checked) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = checked;
    setTasks(updatedTasks);
  };

  const deleteAllCompleted = () => {
    const filteredTasks = tasks.filter((task) => !task.completed);
    setTasks(filteredTasks);
    message.success("Deleted all completed tasks!");
  };

  return (
    <div className="bg-indigo-600 h-20 w-screen items-center shadow-lg">
      <div className="pt-16 flex flex-col items-center">
        <div className="bg-indigo-600 flex flex-col items-center h-20">
          <div className="text-4xl font-bold items-center text-white pb-5 m-5">
            To Do List
          </div>

          <div className="p-6 shadow-lg">
            <input
              className="bg-slate-100 border-b-2 border-indigo-600 rounded-md p-2 m-4"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Create a new todo"
            />
            <Button type="primary" style={{ height: "35px" }} onClick={addTask} className="bg-indigo-500 text-white font-bold hover:bg-indigo-600">
              Add Todo
            </Button>

            {tasks.length > 0 && (
              <List
                itemLayout="horizontal"
                dataSource={tasks}
                renderItem={(task, index) => (
                  <List.Item>
                    <Checkbox checked={task.completed} onChange={() => handleCheckboxChange(index, !task.completed)}>
                      {task.text}
                    </Checkbox>
                    <Space offset={16}>
                      <Button icon={<CloseOutlined />} type="primary" shape="circle" danger onClick={() => deleteTask(index)}>
                      </Button>
                    </Space>
                  </List.Item>
                )}
              />
            )}

            {tasks.length > 0 && (
              <Button type="primary" danger style={{ height: "35px" }}  onClick={deleteAllCompleted} className=" text-white font-bold"> 
                Delete All Completed
              </Button>
            )}

            {tasks.length === 0 && (
              <div className="pl-20 ml-10">
                <p>No Task Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
