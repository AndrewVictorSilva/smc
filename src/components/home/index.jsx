import useAuth from "../../contexts/authContext";
import { Grid } from "../Grid";

export function Home() {
  const { currentUser } = useAuth();

  // Extract the email check logic outside the JSX
  const emailContainsAtos = currentUser.email.includes("@atos");

  // Now you can conditionally render based on the email check
  return (
    <>
      <div className=" text-2xl font-bold bg-gradient-to-r relative w-full h-full py-20 min-h-screen">
        {/* Conditionally render based on the email check */}
        {emailContainsAtos ? <Grid /> : <p>Email does not contain '@atos'.</p>}
      </div>
    </>
  );
}
