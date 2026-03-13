type Props = {
  type: string;
  text: string;
  btnAction: () => void;
};
const CreateBtn = ({ type, text, btnAction }: Props) => {
  return (
    <button
      className="px-3 py-2 bg-primary rounded-lg text-white"
      type={type}
      onClick={btnAction}
    >
      {text}
    </button>
  );
};

export default CreateBtn;
