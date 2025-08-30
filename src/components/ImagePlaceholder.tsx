import React from 'react';

interface ImagePlaceholderProps {
  width?: string;
  height?: string;
  text?: string;
  icon?: 'movie' | 'person' | 'image';
  className?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = 'w-full',
  height = 'h-full',
  text = 'Imagen no disponible',
  icon = 'image',
  className = ''
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'movie':
        return (
          <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v6H4V5h1zm0 8H4v2h1v-2z" clipRule="evenodd" />
          </svg>
        );
      case 'person':
        return (
          <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className={`${width} ${height} bg-gray-200 flex flex-col items-center justify-center rounded-lg ${className}`}>
      {getIcon()}
      <span className="text-gray-500 text-sm mt-2 text-center px-2">{text}</span>
    </div>
  );
};

export default ImagePlaceholder;