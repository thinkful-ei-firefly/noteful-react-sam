import React from 'react'
import UserContext from './UserContext';

class FolderAdder extends React.Component {
  
  static contextType = UserContext;

  render() {
    return (
      <form onSubmit={(event) => this.context.handleFolderSubmit(event)}>
        <label>Add a new folder:</label>
        <input type="text" name="folderAdderInput" required></input>
        <button type="submit">Add</button>
      </form >
    )
  }
}

export default FolderAdder

