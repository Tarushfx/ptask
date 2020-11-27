import React from "react";
import authservice from "../../services/authservice.js";
import jwt from 'jsonwebtoken';
import graphQLFetch from "../graphQLFetch";

const MsgItem = (props) => {

  async function updateTask(status){
    const query = `mutation updateTask($task: TaskUpdate!){
      TaskStateUpdate(task:$task)
    }`;
    const task = {
      _id: jwt.decode(authservice.getToken())._id,
      task_id: props._id,
    };

    if(status === 1){
      task.state = "Completed";
    }
    else {
      task.state = "InProgress";
    }

    const data = await graphQLFetch(query, {task: task});
    // if(data.TaskStateUpdate === "Updated" && status === 1){
    //   props.state = "Completed";
    // }
    // else if(data.TaskStateUpdate === "Updated" && status === 0){
    //   props.state = "InProgress";
    // }
  }

  async function handleChangeCheckbox() {
    const id = "mail-"+ String(props._id);
    const checkbox = document.getElementById(id);
    if(checkbox.checked == true){
      await updateTask(1);
    }
    else{
      await updateTask(0)
    }
  }

  let date = new Date(Date.parse(props.deadline)).toDateString();
  date = date !== "Invalid Date" ? date : "";
  return (
    <div className={props.classes}>
      <InputSelect task={props} handleChangeCheckbox={handleChangeCheckbox} />
      <label htmlFor={`mail-${props._id}`}></label>
      <div className="msg-content">
        <div className="msg-title">{props.title}</div>
        <div className="msg-title">{props.state}</div>
        <div className="msg-date">{date} </div>
      </div>
      <img src="images/User-Icon.jpg" alt="" className="members mail-members" />
    </div>
  );
};


const InputSelect = (props) => {
  if(props.task.state === "Completed"){
    return(
      <input
        type="checkbox"
        name="msg"
        id={`mail-${props.task._id}`}
        className="mail-choice"
        onClick={props.handleChangeCheckbox}
        checked
      />
    )
  }
  else {
    return (
      <input
        type="checkbox"
        name="msg"
        id={`mail-${props.task._id}`}
        className="mail-choice"
        onClick={props.handleChangeCheckbox}
      />
    )
  }
}

export default MsgItem;
