
function logout(req, res) {
  fetch("/logout", {
    method: "delete"
  })
};