"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";

export default function Page() {
  const { data: session, status } = useSession();

  const addUserToDB = async () => {
    if (session) {
      if (status === "authenticated") {
        try {
          const postData = {
            email: session.user.email,
            name: session.user.name,
          };

          const response = await axios.post(
            "/api/auth/mongo/createUser",
            postData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Response from server:", response.data);
        } catch (error) {
          console.error("Error sending post request to backend", error);
        }
      } else {
        console.log("session not authenticated");
      }
    }
  };

  const deleteUser = async () => {
    const { session, status } = useSession(); // Assuming you have access to session and status

    if (session && status === "authenticated") {
      try {
        const userEmail = session.user.email;

        const response = await axios
          .delete(`/api/auth/mongo/deleteUser/${userEmail}`)
          .then((res) => {
            console.log("Responsessssssss from server:", res.data);
          });

        console.log("Response from server:", response.data);
      } catch (error) {
        console.error("Error sending delete request to backend:", error);
      }
    } else {
      console.log("Session not authenticated");
    }
  };
  useEffect(() => {
    addUserToDB();
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen w-full bg-blue-400">
      {session ? (
        <div className="h-screen w-full bg-green-400 flex justify-center items-center  gap-10 text-4xl">
          Signed in user {session.user.email}
          <button
            className="border-2 border-white rounded-2xl p-4"
            onClick={() => signOut()}
          >
            Sign out
          </button>
          <button onClick={() => addUserToDB()}>Add user to db</button>
          <button onClick={() => deleteUser()}>Delete</button>
        </div>
      ) : (
        <div className="min-h-screen w-full bg-red-400">
          <button
            className="border-2 border-white rounded-2xl p-4"
            onClick={() => signIn("google")}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}
