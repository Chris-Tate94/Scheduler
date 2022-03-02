export function getAppointmentsForDay(state, day) {
  let appointmentDay = state.days.find((element) => element.name === day);
  if (appointmentDay) {
    let appointmentsIDsForDay = appointmentDay.appointments;

    let appointmentsForDay = appointmentsIDsForDay.map((id) => {
      return state.appointments[id];
    });

    return appointmentsForDay;
  } else {
    return [];
  }
}

export function getInterview(state, interview) {
  return (
    interview && {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    }
  );
}

export function getInterviewersForDay(state, day) {
  if (!day) {
    return [];
  }

  let interviewrsForDay = state.days.find((element) => element.name === day);

  if (!interviewrsForDay) {
    return [];
  }

  const listOfInterviewers = interviewrsForDay.interviewers;

  return listOfInterviewers.map((id) => {
    return state.interviewers[id];
  });
}
