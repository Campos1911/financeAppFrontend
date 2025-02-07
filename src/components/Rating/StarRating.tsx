"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { FeedbackProps } from "@/app/dashboard/page";

interface StarRatingProps {
  totalStars?: number;
  initialRating?: number;
  onChange?: (rating: number) => void;
  feedback: FeedbackProps;
  setFeedback: React.Dispatch<React.SetStateAction<FeedbackProps>>;
}

export function StarRating({
  totalStars = 5,
  initialRating = 0,
  onChange,
  feedback,
  setFeedback,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRating = (currentRating: number) => {
    setRating(currentRating);
    setFeedback({ ...feedback, nota: currentRating });
    if (onChange) {
      onChange(currentRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <button
            key={index}
            className={`p-0 ${
              currentRating <= (hover || rating)
                ? "text-green-500"
                : "text-gray-300"
            }`}
            onClick={() => handleRating(currentRating)}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(0)}
          >
            <Star className="h-6 w-6 fill-current" />
            <span className="sr-only">{`${currentRating} stars`}</span>
          </button>
        );
      })}
    </div>
  );
}
