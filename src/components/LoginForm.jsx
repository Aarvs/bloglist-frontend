import PropTypes from 'prop-types'

const LoginForm = ({
  userName,
  password,
  handleUserNameChange,
  handlePasswordChange,
  handleSubmit,
}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleSubmit}>
      <div>
        userName:
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleUserNameChange}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
);

LoginForm.propTypes = {
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUserNameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm;
