import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = function (appointments, state) {
    //check appointment for interveiw === null

    const currentDay = state.days.find((dayObj) => dayObj.name === state.day);

    const dailyAppointmentIds = currentDay.appointments;

    const filteredIds = dailyAppointmentIds.filter(
      (id) => appointments[id].interview === null
    );

    const spots = filteredIds.length;

    //update spots

    const updatedCurrentDay = { ...currentDay, spots };

    const currentDayIndex = state.days.findIndex(
      (dayObj) => dayObj.name === state.day
    );

    const updatedDays = [...state.days];
    updatedDays[currentDayIndex] = updatedCurrentDay;

    const updatedState = { ...state, days: updatedDays };

    return updatedState;
  };

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((response) => {
        console.log(response);
        const updatedState = updateSpots(appointments, state);
        setState({ ...updatedState, appointments });
      });
  };

  const deleteInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        console.log(response);
        const updatedState = updateSpots(appointments, state);
        setState({ ...updatedState, appointments });
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, deleteInterview };
}
