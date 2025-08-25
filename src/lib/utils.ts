import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLocalImagePath = (url: string) => {
    if (!url || !url.includes('/')) return 'https://placehold.co/400x300.png';
    try {
        const urlObject = new URL(url);
        const imageName = urlObject.pathname.split('/').pop();
        return `/image/${imageName}`;
    } catch (e) {
        // Fallback for cases where URL is not valid, like a local path already
        if (typeof url === 'string' && url.startsWith('/image/')) {
            return url;
        }
        const imageName = url.split('/').pop();
        return `/image/${imageName}`;
    }
}
