import React from 'react'
import UserContext from './UserContext'



class NoteAdder extends React.Component {

  state = {
    name: {
      value: '',
      touched: false
    },
    content: {
      value: '',
      touched: false
    }
  };

  setName = name => { this.setState({name: {value: name, touched: true}})};

  setContent = content => { this.setState({content: {value: content, touched: true}})};

  validateName = () => {
    const {name} = this.state
    if (!name.touched) return true
    if (!name.value.length) return 'Must provide a name'
  }

  validateContent = () => {
    const {content} = this.state
    if (!content.touched) return true
    if (!content.value.length) return 'Must provide a description'
  }

  static contextType = UserContext;
  
  render() {
    const folderOptions= [];
    this.context.folders.forEach(
        folder=>folderOptions.push(<option key={folder.id} value={folder.id}>{folder.name}</option>)
    )
    return (
      <form onSubmit={(e) => this.context.handleAdd(e)}name="NoteAdder">
          <h3>Add New Note</h3>
          <div className="error">
            <p>{this.validateName()}</p>
            <p>{this.validateContent()}</p>
          </div>
          <label htmlFor="name">Name</label>
          <input
            type= 'text' 
            name='newNoteName' 
            id="name" 
            value={this.state.name.value}
            onChange={e=>this.setName(e.target.value)}>
          </input>
          <label htmlFor="folder">folder</label>
          <select name= 'newNoteFolder' id="folder">
            {folderOptions}              
          </select>
          <label htmlFor="content" >content</label>
          <input 
            type='textarea' 
            name='newNoteContent' 
            id="content" 
            value={this.state.content.value}
            onChange={e=>this.setContent(e.target.value)}>
          </input>
          <button type='submit' disabled={this.validateName() || this.validateContent()}>Add</button>        
          
      </form>
    )
  }
}
    


export default NoteAdder;
