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
  if (!interview) return null;

  for (const appointment in state.appointments) {
    if (state.appointments[appointment].interview) {
      if (
        state.appointments[appointment].interview.student ===
          interview.student &&
        state.appointments[appointment].interview.interviewer ===
          interview.interviewer
      ) {
        const interviewOBJ = {
          student: interview.student,
          interviewer: {
            id: interview.interviewer,
            name: state.interviewers[interview.interviewer].name,
            avatar: state.interviewers[interview.interviewer].avatar,
          },
        };
        return interviewOBJ;
      }
    }
  }
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
