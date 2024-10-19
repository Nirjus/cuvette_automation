import cuvette_logo from "../assets/cuvette_logo.png";
const AuthenticationLayout = () => (WrapedLayout) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    return (
      <div className="w-full min-h-screen lg:flex-row flex-col flex items-center justify-evenly">
        <div className=" py-4 fixed top-0 left-0 w-full flex justify-between items-center px-8">
          <img
            src={cuvette_logo}
            alt="cuvette_logo"
            className=" h-[43px] w-[165px]"
          />
          <p className=" text-blue-700/55">Contact</p>
        </div>
        <div className="max-w-md w-full">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
            vero magni necessitatibus omnis non sunt harum corporis recusandae
            in quaerat, temporibus, et dolores blanditiis. Quae cupiditate
            magnam necessitatibus corporis eius?
          </p>
        </div>
        <WrapedLayout {...props} />
      </div>
    );
  };
};

export default AuthenticationLayout;
