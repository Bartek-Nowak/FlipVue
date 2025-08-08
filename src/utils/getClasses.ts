import { twMerge } from 'tailwind-merge';

export const getClasses = (
  base: string | string[],
  ...classGroups: string[]
): string => twMerge(base, ...classGroups);
