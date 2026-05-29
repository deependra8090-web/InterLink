const calculateMatchScore = (user1, user2) => {

  let score = 0;

  // Interests
  const commonInterests = user1.interests.filter(i =>
    user2.interests.includes(i)
  );

  score += commonInterests.length * 10;

  // Budget
  if (user1.budget === user2.budget)
    score += 20;

  // Travel Style
  if (user1.travelStyle === user2.travelStyle)
    score += 10;

  // Language
  if (user1.language === user2.language)
    score += 10;

  // Food Preference
  if (user1.foodPreference === user2.foodPreference)
    score += 5;

  // Trip Duration
  if (
    Math.abs(
      user1.preferredTripDuration -
      user2.preferredTripDuration
    ) <= 2
  ) {
    score += 5;
  }

  // Destination Match
  const commonDestinations =
    user1.destinationPreferences.filter(d =>
      user2.destinationPreferences.includes(d)
    );

  score += commonDestinations.length * 10;

  return Math.min(score, 100);
};
export default calculateMatchScore;