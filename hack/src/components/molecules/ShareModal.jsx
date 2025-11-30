import React from 'react';
import { 
  Facebook, 
  Twitter, 
  MessageCircle, 
  Send, 
  Mail,
  Copy
} from 'lucide-react';

const ShareModal = ({ isOpen, onClose, movie }) => {
  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const title = `Mira ${movie.Title} (${movie.Year}) en CineVerse`;
  const text = `Descubre "${movie.Title}" en CineVerse`;

  const sharePlatforms = [
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
      share: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Twitter',
      icon: <Twitter size={20} />,
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
      share: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      color: 'hover:bg-green-50 dark:hover:bg-green-900/20',
      share: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Telegram',
      icon: <Send size={20} />,
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
      share: () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Email',
      icon: <Mail size={20} />,
      color: 'hover:bg-red-50 dark:hover:bg-red-900/20',
      share: () => {
        const url = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + shareUrl)}`;
        window.open(url, '_self');
      }
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Enlace copiado al portapapeles');
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Compartir {movie.Title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-5 gap-4 mb-4">
          {sharePlatforms.map((platform) => (
            <button
              key={platform.name}
              onClick={platform.share}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${platform.color}`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {platform.icon}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {platform.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
          >
            <Copy size={16} />
            Copiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;