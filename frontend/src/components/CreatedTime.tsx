import { useMemo } from 'react';

type TimeAgoProps = {
  date: string | number | Date;
};

const CreatedTime = ({ date }: TimeAgoProps) => {
  const timeAgoText = useMemo(() => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 0) return 'в будущем';

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const getDeclension = (number: number, forms: [string, string, string]) => {
      const cases = [2, 0, 1, 1, 1, 2];
      return forms[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    };

    if (days > 0) {
      return `${days} ${getDeclension(days, ['день', 'дня', 'дней'])} назад`;
    }
    if (hours > 0) {
      return `${hours} ${getDeclension(hours, ['час', 'часа', 'часов'])} назад`;
    }
    if (minutes > 0) {
      return `${minutes} ${getDeclension(minutes, ['минуту', 'минуты', 'минут'])} назад`;
    }

    return 'только что';
  }, [date]);

  return <span className="post-created">{timeAgoText}</span>;
};

export default CreatedTime;
