import {Component} from 'react'
import './index.css'

class Home extends Component {
  state = {id: '', username: '', password: '', email: '', userList: []}

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const getDataUrl = 'https://login-users-web.herokuapp.com/users/'
    const options = {
      method: 'GET',
    }
    const response = await fetch(getDataUrl, options)
    const data = await response.json()
    this.setState({userList: data})
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {id, username, password, email} = this.state
    const userDetails = {
      id,
      username,
      password,
      email,
    }
    const url = 'https://login-users-web.herokuapp.com/user/update/'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      this.getUserDetails()
    }
  }

  onChangeId = event => {
    this.setState({id: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  render() {
    const {id, username, password, email, userList} = this.state
    return (
      <div className="bg-container">
        <form onSubmit={this.onSubmitUserDetails} className="form-container">
          <h1 className="main-heading">Update Users</h1>
          <label className="label-title" htmlFor="id">
            Id
          </label>
          <input
            value={id}
            onChange={this.onChangeId}
            type="text"
            id="id"
            className="input-container"
          />
          <label className="label-title" htmlFor="username">
            Username
          </label>
          <input
            value={username}
            onChange={this.onChangeUsername}
            type="text"
            id="username"
            className="input-container"
          />
          <label className="label-title" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={this.onChangePassword}
            type="text"
            id="password"
            className="input-container"
          />
          <label className="label-title" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={this.onChangeEmail}
            type="text"
            id="email"
            className="input-container"
          />
          <button className="btn" type="submit">
            Add User
          </button>
        </form>
        <div className="result-container">
          <h1 className="main-heading">User Details</h1>
          <ul className="ul-container">
            {userList.map(eachUser => (
              <li className="li-container" key={eachUser.id}>
                <p className="para">{eachUser.username}</p>
                <p className="para">{eachUser.password}</p>
                <p className="para">{eachUser.email}</p>
                <p className="para">{eachUser.id}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
