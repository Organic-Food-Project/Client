import toast from 'react-hot-toast';

interface ToastProps {
  Message: string;
  type: 'success' | 'error' | 'loading';
}

const Toast: React.FC<ToastProps> = ({ Message, type }) => {
  return toast[type](Message);
};

export default Toast;
