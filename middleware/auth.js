export default function({ store, error }) {
  if (!store.auth.loggedIn) {
    error({
      message: "You're not logged in.",
      statusCode: 403
    })
  }
}