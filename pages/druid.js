import { withSessionSsr } from "../utils/session";

export default function Druid() {
  // Users will never see this unless they're logged in.
  return <h1>Secure page</h1>;
}

export const getServerSideProps = withSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  // You can return data here from a database knowing only authenticated users (you) will see it.
  return { props: {} };
});
