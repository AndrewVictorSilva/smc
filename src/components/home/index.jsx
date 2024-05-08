import useAuth from "../../contexts/authContext";
import { Grid } from "../Grid";

export function Home() {
  const { currentUser } = useAuth();

  // Extract the email check logic outside the JSX
  const emailContainsAtos = currentUser.email.includes("@atos");

  // Now you can conditionally render based on the email check
  return (
    <>
      <div className="text-2xl font-bold pt-14 bg-gradient-to-r">
        {/* Conditionally render based on the email check */}
        {emailContainsAtos ? (
          <>
            <Grid />
          </>
        ) : (
          <p>Email does not contain '@atos'.</p>
        )}
      </div>
    </>
  );
}
