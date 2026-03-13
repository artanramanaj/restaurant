type Props = {
  type: string;
  text: string;
};
const CreateBtn = ({ type, text }: Props) => {
  return (
    <button className="px-3 py-2 bg-primary rounded-lg text-white" type={type}>
      {text}
    </button>
  );
};

export default CreateBtn;
