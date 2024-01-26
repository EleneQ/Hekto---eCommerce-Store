import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";

function Dropdown({ options, initialValue, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef(null);

  //close on outside click
  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => (
    <div onClick={() => handleOptionClick(option)} key={option}>
      {option}
    </div>
  ));

  return (
    <div ref={divEl}>
      <div onClick={handleClick}>
        {initialValue || "Select..."}
        <GoChevronDown />
      </div>
      {isOpen && <div>{renderedOptions}</div>}
    </div>
  );
}

export default Dropdown;
