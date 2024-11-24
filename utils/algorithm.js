exports.matchUsersToCoaches = (userInput, coaches) => {
    const matches = coaches.map((coach) => {
      let score = 0;
  
      // Compare each input field to coach attributes (e.g., age range, specialization)
      if (coach.specialization === userInput.specialization) score += 3;
      if (coach.ageRange === userInput.ageRange) score += 2;
  
      return { coach, score };
    });
  
    // Sort matches by score in descending order
    return matches.sort((a, b) => b.score - a.score).slice(0, 5); // Top 5 matches
  };
  