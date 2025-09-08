import { Link } from "react-router-dom";
interface ButtonProps {
  styles?: string;
  link?: string | undefined;
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
const Button = ({ styles, link, text, onClick, type }: ButtonProps) => {
  if (link) {
    return (
      <div className="mt-10 flex justify-center items-center">
        <Link to={`/${link}`}>
          <button
            className={`bg-accent text-white font-bold rounded-full px-6 py-3 active:scale-95 transition duration:300 ${styles}`}
          >
            {text ? text : null}
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center">
        <button
          onClick={onClick}
          className={`bg-accent text-white font-bold rounded-full px-6 py-3 active:scale-95 transition duration:300 ${styles}`}
          type={type}
        >
          {text}
        </button>
      </div>
    );
  }
};

export default Button;
