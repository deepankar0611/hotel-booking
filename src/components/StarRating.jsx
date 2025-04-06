import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export const StarRating = ({ rating, setRating, readonly = false }) => {
  const renderStar = (index) => {
    const number = index + 1;
    const isHalfStar = rating - index > 0 && rating - index < 1;
    const isFullStar = rating >= number;

    if (readonly) {
      if (isFullStar) return <FaStar key={index} className="text-yellow-400" />;
      if (isHalfStar) return <FaStarHalfAlt key={index} className="text-yellow-400" />;
      return <FaRegStar key={index} className="text-yellow-400" />;
    }

    return (
      <button
        key={index}
        type="button"
        className="focus:outline-none"
        onClick={() => setRating?.(number)}
        onMouseEnter={() => setRating?.(number)}
      >
        {isFullStar ? (
          <FaStar className="text-yellow-400" />
        ) : (
          <FaRegStar className="text-yellow-400" />
        )}
      </button>
    );
  };

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => renderStar(index))}
    </div>
  );
}; 