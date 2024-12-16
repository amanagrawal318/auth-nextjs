// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function UserProfile({ params }: any) {
  const { id } = await params;

  return (
    <div className="text-3xl font-bold ">
      <h1>User Profile {id} </h1>
    </div>
  );
}
