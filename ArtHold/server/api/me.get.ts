import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  console.log(session);
  if (!session) {
    return { status: "unauthenticated!" };
  }

  return session;
});
