import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      editedText: props.todoDetails.inputTodo,
    }
  }

  toggleChecked = () => {
    const {todoDetails, isCheckedToggle} = this.props
    isCheckedToggle(todoDetails.id)
  }

  handleEditToggle = () => {
    console.log('Toggling edit mode')
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }))
  }

  handleInputChange = event => {
    console.log('Input changed:', event.target.value)
    this.setState({editedText: event.target.value})
  }

  handleEditSave = () => {
    console.log('Saving edit')
    const {editTodoText, todoDetails} = this.props
    const {editedText} = this.state

    if (editedText.trim() !== '') {
      console.log(
        `Updating todo with id ${todoDetails.id} to new text: ${editedText}`,
      )
      editTodoText(todoDetails.id, editedText)
      this.setState({isEditing: false})
    } else {
      console.log('Edit text is empty. Not saving.')
    }
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleEditSave()
    }
  }

  render() {
    console.log('Rendering TodoItem component')
    const {todoDetails, deleteTodo} = this.props
    const {id, inputTodo, isChecked} = todoDetails
    const {isEditing, editedText} = this.state

    const itemStyle = {
      textDecoration: isChecked ? 'line-through' : 'none',
    }

    const onDeleteTodo = () => {
      deleteTodo(id)
    }

    return (
      <li className="todo-item">
        <input
          type="checkbox"
          className="checkbox-container"
          checked={isChecked}
          onChange={this.toggleChecked}
        />
        <div className="container">
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              className="edit-input"
            />
          ) : (
            <p className="single-todo-item" style={itemStyle}>
              {inputTodo}
            </p>
          )}
          <div className="center-buttons">
            {isEditing ? (
              <>
                <button
                  className="button save-button"
                  type="button"
                  onClick={this.handleEditSave}
                >
                  Save
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={this.handleEditToggle}
                >
                  <img
                    src="https://img.icons8.com/?size=512&id=4inUm0sDhosK&format=png"
                    alt="cancel-image"
                    className="cancel-image"
                  />
                </button>
              </>
            ) : (
              <button
                className="button"
                type="button"
                onClick={this.handleEditToggle}
              >
                <img
                  src="https://img.icons8.com/?size=512w&id=49&format=png"
                  alt="edit-image"
                  className="edit-image"
                />
              </button>
            )}
            <button type="button" className="button" onClick={onDeleteTodo}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
                className="delete-image"
                alt="delete"
              />
            </button>
          </div>
        </div>
      </li>
    )
  }
}

export default TodoItem
