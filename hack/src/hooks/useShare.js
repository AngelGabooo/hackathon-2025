import { useState } from 'react';

export const useShare = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const shareMovie = (movie, platform) => {
    const url = window.location.href;
    const title = `Mira ${movie.Title} (${movie.Year}) en CineVerse`;
    const text = `Descubre "${movie.Title}" - ${movie.Plot?.substring(0, 100)}...`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async (movie) => {
    const url = window.location.href;
    const text = `Mira "${movie.Title}" (${movie.Year}) en CineVerse: ${url}`;
    
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  };

  return {
    isShareOpen,
    setIsShareOpen,
    shareMovie,
    copyToClipboard
  };
};