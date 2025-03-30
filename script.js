document.addEventListener('DOMContentLoaded', () => {
    const birthdateInput = document.getElementById('birthdate');
    const workingHoursInput = document.getElementById('workingHours');
    const routineHoursInput = document.getElementById('routineHours');
    const exerciseHoursInput = document.getElementById('exerciseHours');
    const familyHoursInput = document.getElementById('familyHours');
    const calculateButton = document.getElementById('calculate');
    const resultsDiv = document.getElementById('results');
    const weeksLivedValue = document.getElementById('weeks-lived-value');
    const totalWeeksValue = document.getElementById('total-weeks-value');
    const workingWeeksValue = document.getElementById('working-weeks');
    const routineWeeksValue = document.getElementById('routine-weeks');
    const exerciseWeeksValue = document.getElementById('exercise-weeks');
    const familyWeeksValue = document.getElementById('family-weeks');
    const personalWeeksValue = document.getElementById('personal-weeks');
    const dotDisplay = document.getElementById('dot-display');
  
    calculateButton.addEventListener('click', () => {
      const birthdate = birthdateInput.value;
      if (birthdate) {
        const {
          weeksLived,
          totalWeeks,
          workingWeeks,
          dailyRoutineWeeks,
          exerciseWeeks,
          familyWeeks,
          personalWeeks,
        } = calculateWeeks(birthdate, workingHoursInput.value, routineHoursInput.value, exerciseHoursInput.value, familyHoursInput.value);
  
        weeksLivedValue.textContent = weeksLived;
        totalWeeksValue.textContent = totalWeeks;
        workingWeeksValue.textContent = workingWeeks;
        routineWeeksValue.textContent = dailyRoutineWeeks;
        exerciseWeeksValue.textContent = exerciseWeeks;
        familyWeeksValue.textContent = familyWeeks;
        personalWeeksValue.textContent = personalWeeks;
  
        displayDots(totalWeeks, workingWeeks, dailyRoutineWeeks, exerciseWeeks, familyWeeks, personalWeeks);
        resultsDiv.style.display = 'block';
      } else {
        alert('Please enter your birthdate.');
      }
    });
  
    function calculateWeeks(birthDate, workingHours, routineHours, exerciseHours, familyHours) {
      const now = new Date();
      const birth = new Date(birthDate);
      const diffInMs = now.getTime() - birth.getTime();
      const weeksLived = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
      const totalWeeks = 100 * 52;
  
      const workingWeeks = Math.floor(workingHours);
      const dailyRoutineWeeks = Math.floor((routineHours * 7 / 24) * totalWeeks);
      const exerciseWeeks = Math.floor(exerciseHours / 24 / 7 * totalWeeks);
      const familyWeeks = Math.floor(familyHours / 24 / 7 * totalWeeks);
      const personalWeeks = totalWeeks - workingWeeks - dailyRoutineWeeks - exerciseWeeks - familyWeeks;
  
      return {
        weeksLived,
        totalWeeks,
        workingWeeks,
        dailyRoutineWeeks,
        exerciseWeeks,
        familyWeeks,
        personalWeeks,
      };
    }
  
    function displayDots(totalWeeks, workingWeeks, dailyRoutineWeeks, exerciseWeeks, familyWeeks, personalWeeks) {
      dotDisplay.innerHTML = '';
      const colors = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'];
      const weekCounts = [workingWeeks, dailyRoutineWeeks, exerciseWeeks, familyWeeks, personalWeeks];
  
      for (let i = 0; i < weekCounts.length; i++) {
        for (let j = 0; j < weekCounts[i]; j++) {
          const dot = document.createElement('div');
          dot.className = 'dot';
          dot.style.backgroundColor = colors[i];
          dotDisplay.appendChild(dot);
        }
      }
    }
  });