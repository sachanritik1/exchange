export const PrimaryButton = ({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      className="focus:none relative mr-4 h-[32px] overflow-hidden rounded-lg px-3 py-1.5 text-center text-sm font-semibold hover:opacity-90 focus:outline-none focus:ring-blue-200 disabled:opacity-80 disabled:hover:opacity-80"
    >
      <div className="absolute inset-0 bg-blue-500 opacity-[16%]"></div>
      <div className="flex flex-row items-center justify-center gap-4">
        <p className="text-blue-500">{children}</p>
      </div>
    </button>
  );
};

export const SuccessButton = ({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      className="focus:none relative mr-4 h-[32px] overflow-hidden rounded-lg px-3 py-1.5 text-center text-sm font-semibold hover:opacity-90 focus:outline-none focus:ring-green-200 disabled:opacity-80 disabled:hover:opacity-80"
    >
      <div className="absolute inset-0 bg-green-500 opacity-[16%]"></div>
      <div className="flex flex-row items-center justify-center gap-4">
        <p className="text-green-500">{children}</p>
      </div>
    </button>
  );
};
