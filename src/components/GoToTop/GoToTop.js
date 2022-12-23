import classNames from "classnames/bind";
import { memo, useEffect, useRef } from "react";
import { RxDoubleArrowUp } from "react-icons/rx";
import styles from "./GoToTop.module.scss";
const cx = classNames.bind(styles);

function GoToTop() {
  const btnRef = useRef();
  useEffect(() => {
    const handleScroll = (event) => {
      if (window.scrollY > 150) {
        btnRef.current.style.opacity = 1;
        btnRef.current.style.visibility = "visible";
      } else {
        btnRef.current.style.opacity = 0;
        btnRef.current.style.visibility = "hidden";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button id={cx("go-top")} ref={btnRef} onClick={() => scrollToTop()}>
      <RxDoubleArrowUp />
    </button>
  );
}

export default memo(GoToTop);
