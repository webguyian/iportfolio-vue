import {
  format,
  formatDistanceToNowStrict,
  differenceInCalendarWeeks,
  toDate
} from 'date-fns';
import type { Photo } from '@/composables/camera/types';

export const formatDate = (date: Date | number) =>
  format(date, `MMM d, yyyy 'at' h:mm a`);

export const getCreatedDate = (photo: Photo | null) => {
  if (!photo) {
    return +new Date();
  }

  return photo.metadata.dateCreated;
};

export const formatCreatedDate = (photo: Photo) => {
  return formatDate(getCreatedDate(photo));
};

export const formatCreatedDateRelative = (photo: Photo) => {
  const date = toDate(getCreatedDate(photo));
  const options = { addSuffix: true };
  const differentWeek = differenceInCalendarWeeks(new Date(), date);

  if (differentWeek < 2) {
    return formatDistanceToNowStrict(date, options);
  }

  return formatDate(date);
};
