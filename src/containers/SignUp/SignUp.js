import React, {
  Component
} from 'react';
import {
  updateCurrentUser
} from '../../actions';
import {
  connect
} from 'react-redux';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      verification: ''
    };
  }

  handleChange = (event) => {
    const {
      name,
      value
    } = event.target;
    const newValue = value.toLowerCase();

    this.setState({
      [name]: newValue
    });
  }

  verifyPassword = () => this.state.password === this.state.verification;

  verifyEmail = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      if (response.status === 200) {
        const data = await response.json();
        const emailMatch = data.data.find(user => {
          return user.email === this.state.email;
        });
        if (emailMatch) {
          return false;
        } else {
          return true;
        }
      } else {
        throw Error( response.status)
      }
    } catch (error) {
      throw Error(error);
    }
  }

  postUser = () => {
    const {
      name,
      email,
      password
    } = this.state;
    const newUserData = {
      name,
      email,
      password
    };
    const url = 'http://localhost:3000/api/users/new';
    const optionsObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserData)
    };
    try {
      fetch(url, optionsObject);
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const verifiedPassword = this.verifyPassword();
    const verifiedEmail = this.verifyEmail();
    if (verifiedPassword && verifiedEmail) {
      const userId = Date.now();
      this.props.updateCurrentUser(userId);
      this.postUser();
    } else {
      alert('Check yo self');
    }
  }

  render() {
    return ( <
      form onSubmit = {
        this.handleSubmit
      } >
      <
      input type = 'text'
      value = {
        this.state.name
      }
      name = 'name'
      placeholder = 'Name'
      onChange = {
        this.handleChange
      }
      /> <
      input type = 'text'
      value = {
        this.state.email
      }
      name = 'email'
      placeholder = 'Email'
      onChange = {
        this.handleChange
      }
      /> <
      input type = 'password'
      value = {
        this.state.password
      }
      name = 'password'
      placeholder = 'Password'
      onChange = {
        this.handleChange
      }
      /> <
      input type = 'password'
      value = {
        this.state.verification
      }
      name = 'verification'
      placeholder = 'Retype password'
      onChange = {
        this.handleChange
      }
      /> <
      button > Sign up < /button> < /
      form >
    );

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentUser: (id) => dispatch(updateCurrentUser(id))
  };
};


export {
  SignUp,
  mapDispatchToProps
};

export default connect(null, mapDispatchToProps)(SignUp);