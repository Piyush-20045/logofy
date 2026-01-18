import { SignIn as Login } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <div className="min-h-screen py-9 flex justify-center items-center">
      <Login />
    </div>
  );
};

export default SignIn;
