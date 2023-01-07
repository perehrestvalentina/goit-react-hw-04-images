import { Audio } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="grey"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
  );
};
export default Loader;