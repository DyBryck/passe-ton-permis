const Button = ({ text }) => {
  return (
    <button className="rounded-lg bg-[rgb(var(--primary))] py-3 text-lg font-bold text-white">
      {text}
    </button>
  );
};

export default Button;
