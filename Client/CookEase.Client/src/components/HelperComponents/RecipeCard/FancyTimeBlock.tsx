// react component that takes a number of minutes and returns a string in the format "Xh Ym" where X is the number of hours and Y is the number of minutes

interface FancyTimeBlockProps {
    minutes: number;
}

export default function FancyTimeBlock({ minutes }: FancyTimeBlockProps) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return (
        <div>
            {hours > 0 && <span>{hours}h </span>}
            {remainingMinutes > 0 && <span>{remainingMinutes}m</span>}
        </div>
    );
}