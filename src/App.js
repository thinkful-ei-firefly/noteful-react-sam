import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import FolderList from "./components/FolderList";
import NoteList from "./components/NoteList";
import NotePage from "./components/NotePage";
import NoteSidebar from "./components/NoteSidebar";
import UserContext from "./components/UserContext";
import ErrorPage from './ErrorPage';

import "./App.css";

class App extends Component {

  state = {
    folders: [],
    notes: [],
    loading: true,
  };
  
  componentDidMount() {
    fetch('http://localhost:8080/lists')
      .then(res=> {
        if (!res.ok) {
          throw new Error('Errror: '+res.status)
        }
        return res
      })
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          folders: resJson,
          loading: false
        })
      })
      .catch(error => console.log(error));
      fetch('http://localhost:8080/notes')
      .then(res=> {
        if (!res.ok) {
          throw new Error('Errror: '+res.status)
        }
        return res
      })
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          notes: resJson,
          loading: false
        })
      })
      .catch(error => console.log(error));
  }

  handleDelete = (id) => {
    fetch(`http://localhost:8080/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res=> {
        if (!res.ok) {
          throw new Error('Errror: '+res.status)
        }
        return res
      })
      .then(() => {
        this.setState({
          notes: this.state.notes.filter(note => note.id !== id)
        })
      })
      .catch(error => console.log(error));
  }

  addFolder = (event) => {
    event.preventDefault();
    const name = event.target.folderAdderInput.value
    let folder = {
      list_name: name
    }
    event.target.folderAdderInput.value=''
    fetch(`http://localhost:8080/lists`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder)
    })
      .then(res=> {
        if (!res.ok) {
          throw new Error('Errror: '+res.status)
        }
        return res
      })
      .then(() => {
        this.setState({folders: [...this.state.folders, folder]})
      })
      .catch(error => console.log(error));
  }

  addNote = (event) => {
    event.preventDefault();
    const note = {
      note_name: event.target.newNoteName.value,
      modified: new Date(),
      content: event.target.newNoteContent.value
    }
    fetch(`http://localhost:8080/notes/list/${event.target.newNoteFolder.value}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then(res=> {
        if (!res.ok) {
          throw new Error('Errror: '+res.status)
        }
        return res
      })
      .then(() => {
        this.setState({notes: [...this.state.notes, note]})
      })
      .catch(error => console.log(error));
  }
  

  render() {
    const { folders, notes, loading } = this.state;
    if (loading) return <div>loading</div>
    return (
      <div className="App">
        <ErrorPage>
        <Header />
        <div className="sidebar">
        <UserContext.Provider value ={{
          folders: folders,
          notes: notes,
          handleFolderSubmit: this.addFolder
        }}>
          <Switch>
            <Route
              exact
              path="/notes/:noteId"
              render={({ match }) => (
                  <NoteSidebar match={match}/>
              )}
            />
            <Route
              render={() => (
                  <FolderList />
              )}
            />
          </Switch>
        </UserContext.Provider>
        </div>
        <div className="main">
          <Switch>
            <Route
              exact
              path="/"
              render={({match}) =>
                <UserContext.Provider value ={{
                  notes: notes,
                  match: match,
                  handleDelete: this.handleDelete,
                  folders: this.state.folders,
                  handleAdd: this.addNote
                }}> 
                  <NoteList />
                </UserContext.Provider>
              }  
            />
            <Route
              exact
              path="/folders/:folderId"
              render={({match}) => 
                <UserContext.Provider value ={{
                  notes: notes,
                  match: match,
                  handleDelete: this.handleDelete,
                  folders: this.state.folders,
                  handleAdd: this.addNote
                }}> 
                  <NoteList />
                </UserContext.Provider>
              }
            />
            <Route
              exact
              path="/notes/:notesId"
              render={({match}) => 
                <UserContext.Provider value ={{
                  notes: notes,
                  match: match,
                  handleDelete: this.handleDelete
                }}> 
                  <NotePage />
                </UserContext.Provider>
              }
            />
          </Switch>
        </div>
        </ErrorPage>
      </div>
    );
  }
}

export default App;
