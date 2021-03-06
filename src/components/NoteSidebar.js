import React from "react";
import { Link } from "react-router-dom";
import UserContext from './UserContext'

class NoteSidebar extends React.Component {
  static contextType = UserContext;

  // constructor(props, context) {
  //   super(props)
  //   this.note = context.notes.find(note => note.id === this.props.match.params.noteId);
  //   this.folder = context.folders.find(folder => folder.id === this.note.folderId);
  // }
  render() {
    const note = this.context.notes.find(note => Number(note.id) === Number(this.props.match.params.noteId));
    const folder = note ? this.context.folders.find(folder => folder.id === note.list_id) : false;
    return (
      <div>
        <Link to={`/folders/${folder.id}`}>Go Back</Link>
        <h2>{folder ? folder.list_name : ''}</h2>
      </div>
    )
  }
}

export default NoteSidebar;
