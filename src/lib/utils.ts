import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLocalImagePath = (url: string) => {
    if (!url || typeof url !== 'string' || !url.includes('/')) {
        return 'https://placehold.co/400x300.png';
    }
    const imageName = url.substring(url.lastIndexOf('/') + 1);
    if (!imageName) {
        return 'https://placehold.co/400x300.png';
    }
    return `/image/${imageName}`;
}
