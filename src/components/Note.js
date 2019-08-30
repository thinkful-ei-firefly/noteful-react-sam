import React from "react";
import { Link } from "react-router-dom";
import "./note.css";
import UserContext from "./UserContext";

class Note extends React.Component {

  static contextType = UserContext;

  date = new Date(this.props.modified).toLocaleDateString();
  
  render() {
    return (
      <li className="note-list-item">
        <div className='note-box'>
          <div className='filler'/>
          <h3>
            <Link className="note-list-item__link" to={`/notes/${this.props.id}`}>
              {this.props.name}
            </Link>
          </h3>
          <button className='delete' onClick={() => this.context.handleDelete(this.props.id)}>Delete</button>
        </div>
        <div>Date modified: {this.date}</div>
      </li>
    );
  }
};

export default Note;
