import { SignUp as Register } from "@clerk/nextjs";

const SignOut = () => {
  return (
    <div className="py-9 flex justify-center items-center">
      <Register />
    </div>
  );
};

export default SignOut;
