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
  note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
  folder = this.note ? this.context.folders.find(folder => folder.id === this.note.folderId) : false;
  render() {
    return (
      <div>
        <Link to={`/folders/${this.folder.id}`}>Go Back</Link>
        <h2>{this.folder ? this.folder.name : ''}</h2>
      </div>
    )
  }
}

export default NoteSidebar;
