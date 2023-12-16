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

export default LoginForm;
