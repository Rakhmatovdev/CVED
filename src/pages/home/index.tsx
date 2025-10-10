import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Redirecting to dashboard...");
    navigate("/dashboard");
  }, []);

  return (
    <div className={"flex justify-center h-screen items-center dark:bg-dbody"}>
      <Spin className={""} />
    </div>
  );
};

export default Home;
