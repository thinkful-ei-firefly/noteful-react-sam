import React from "react";
import Folder from "./Folder";
import UserContext from "./UserContext"
import FolderAdder from "./FolderAdder"

class FolderList extends React.Component {
  static contextType = UserContext;
  render() {
    const { folders } =this.context;
    return (
      <div>
        <ul className="folder-list">
          {folders.map(folder => (
            <Folder name={folder.name} id={folder.id} key={folder.id} />
          ))}
        </ul>
        <FolderAdder />
      </div>
    );
  }
};

export default FolderList;
