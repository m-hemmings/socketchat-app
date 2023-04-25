export function setUsername(event, setUsernameCallback) {
  event.preventDefault();
  const username = event.target.elements.username.value.trim();
  setUsernameCallback(username);
}
