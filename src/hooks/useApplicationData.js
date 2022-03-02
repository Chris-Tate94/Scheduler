import { useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  return {
    state: {
      setState: useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {},
      }),
    },
    setDay: function (day) {
      return this.state.setState(day);
    },
    bookInterview: function (id, interview) {
      const appointment = {
        ...this.state.appointments[id],
        interview: { ...interview },
      };
      const appointments = {
        ...this.state.appointments,
        [id]: appointment,
      };

      return axios
        .put(`http://localhost:8001/api/appointments/${id}`, { interview })
        .then((response) => {
          this.setState({ ...this.state, appointments });
        });
    },

    deleteInterview: function (id) {
      const appointment = {
        ...this.state.appointments[id],
        interview: null,
      };
      const appointments = {
        ...this.state.appointments,
        [id]: appointment,
      };

      return axios
        .delete(`http://localhost:8001/api/appointments/${id}`)
        .then((response) => {
          this.setState({ ...this.state, appointments });
        });
    },
  };
}
