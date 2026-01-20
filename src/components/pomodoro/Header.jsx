import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faGear } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="flex w-md h-16 pl-2 items-center">
      <FontAwesomeIcon
        className={`cursor-pointer text-2xl text-white`}
        icon={faCircleCheck}
      />
      <h1 className="basis-3/4 text-xl font-medium text-white ml-2">
        Pomofocus
      </h1>
      <div className="basis-1/4 flex flex-row items-center bg-white rounded-md">
        <FontAwesomeIcon
          className={`cursor-pointer text-md text-white`}
          icon={faGear}
        />
        <button className="ml-2 text-right">Settings</button>
      </div>
    </div>
  );
};

export default Header;
