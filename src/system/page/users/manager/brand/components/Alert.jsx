import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X, Lock } from 'lucide-react';
import PropTypes from 'prop-types';

const Alert = ({ 
  message, 
  type = 'info', 
  onClose, 
  duration = 3000,
  position = 'top-right'
}) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const alertConfig = {
    success: {
      bg: 'bg-green-200',
      border: 'border-green-400',
      text: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    error: {
      bg: 'bg-red-200',
      border: 'border-red-400',
      text: 'text-red-800',
      icon: <XCircle className="w-5 h-5" />,
    },
    warning: {
      bg: 'bg-yellow-200',
      border: 'border-yellow-400',
      text: 'text-yellow-800',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    info: {
      bg: 'bg-blue-200',
      border: 'border-blue-400',
      text: 'text-blue-800',
      icon: <Info className="w-5 h-5" />,
    },
    permission: {
      bg: 'bg-purple-200',
      border: 'border-purple-400',
      text: 'text-purple-800',
      icon: <Lock className="w-5 h-5" />,
    }
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'bottom-left': 'bottom-4 left-4'
  };

  const { bg, border, text, icon } = alertConfig[type] || alertConfig.info;

  return (
    <div className={`fixed ${positionClasses[position]} z-50 w-80`}>
      <div
        className={`${bg} ${border} ${text} border px-4 py-3 rounded-lg relative mb-4 transition-all duration-300 flex items-start gap-3 shadow-md`}
        role="alert"
      >
        <div className="flex-shrink-0 pt-0.5">{icon}</div>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 ml-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'permission']),
  onClose: PropTypes.func,
  duration: PropTypes.number,
  position: PropTypes.oneOf([
    'top-right', 
    'top-center', 
    'top-left', 
    'bottom-right', 
    'bottom-center', 
    'bottom-left'
  ])
};

export default Alert; 