import React from "react";
import { withRouter } from "../../utils/with-router";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
    };
  }

  onChangeInput = (nameInput, value) => {
    this.setState({
      [nameInput]: value,
    });
  };

  checkUsernameExist(valueInput) {
    const { errorMessage, password, username } = this.state;
    fetch(`https://635d3185fc2595be2655192d.mockapi.io/api/v1/users`, {
      method: "GET",
    })
      .then((respone) => respone.json())
      .then((users) => {
        users.filter((user) => {
          if (username === user.username && password === user.password) {
            this.props.navigate("/homepage");
          } else {
            this.setState({
              errorMessage: "Tài khoản hoặc mật khẩu không đúng",
            });
          }
        });
      })
      .catch((e) => {});
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    this.checkUsernameExist();
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmitForm}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => {
                this.onChangeInput("username", e.target.value);
              }}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                this.onChangeInput("password", e.target.value);
              }}
            />
          </div>
          <div style={{ color: "red" }}>{errorMessage}</div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </>
    );
  }
}
export default withRouter(Login);
