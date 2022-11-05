import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { withRouter } from "../../utils/with-router";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      username: "",
      password: "",
      passwordConfirm: "",
      errorMessage: {
        fullnameM: "",
        usernameM: "",
        passwordM: "",
        passwordConfirmM: "",
      },
    };
  }

  onChangeInput = (nameInput, value) => {
    const errorMessage = {
      ...this.state.errorMessage,
    };

    if (nameInput === "passwordConfirm" && this.state.password !== value) {
      errorMessage["passwordConfirmM"] = "Password ko giong nhau";
    } else {
      errorMessage["passwordConfirmM"] = "";
    }
    if (nameInput === "username") {
      this.checkUsernameExist(value);
    }
    this.setState({
      ...this.state,
      [nameInput]: value,
      errorMessage: errorMessage,
    });
  };

  checkUsernameExist(valueInput) {
    fetch(
      `https://635d3185fc2595be2655192d.mockapi.io/api/v1/users?username=${valueInput}`,
      { method: "GET" }
    )
      .then((respone) => respone.json())
      .then((users) => {
        if (users.filter((user) => user.username === valueInput).length > 0) {
          this.setState({
            ...this.state,
            errorMessage: {
              ...this.state.errorMessage,
              usernameM: "username da ton tai",
            },
          });
        } else {
          this.setState({
            ...this.state,
            errorMessage: {
              ...this.state.errorMessage,
              usernameM: "",
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { errorMessage, fullname, password, username } = this.state;

    if (
      Object.values(errorMessage).filter((value) => value !== "").length > 0
    ) {
      return; //nếu errorMessage mà có số giá trị trống > 0 thì trở lại
    }
    fetch("https://635d3185fc2595be2655192d.mockapi.io/api/v1/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: fullname,
        username: username,
        password: password,
      }),
    })
      .then((e) => {
        this.props.navigate("/login");
      })
      .catch((e) => {});
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmitForm}>
          <div>
            <label>Fullname</label>
            <input
              type="text"
              name="fullname"
              onChange={(e) => {
                this.onChangeInput("fullname", e.target.value);
              }}
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => {
                this.onChangeInput("username", e.target.value);
              }}
            />
            {errorMessage.usernameM !== "" ? (
              <div style={{ color: "red" }}>{errorMessage.usernameM}</div>
            ) : (
              <></>
            )}
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
          <div>
            <label>Password confirm</label>
            <input
              type="password"
              name="passwordConfirm"
              onChange={(e) => {
                this.onChangeInput("passwordConfirm", e.target.value);
              }}
            />
            {errorMessage.passwordConfirmM !== "" ? (
              <div style={{ color: "red" }}>
                {errorMessage.passwordConfirmM}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </>
    );
  }
}
export default withRouter(Counter);
