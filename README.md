# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

##  What does it do?

This React application is a single page app that allow's users the ability to do the following:

* Interviews can be booked between Monday and Friday.
* A user can switch between weekdays.
* A user can book an interview in an empty appointment slot.
* Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
* A user can cancel an existing interview.
* A user can edit the details of an existing interview.
* The list of days informs the user how many slots are available for each day.
* The expected day updates the number of spots available when an interview is booked or canceled.
* A user is presented with a confirmation when they attempt to cancel an interview.
* A user is shown an error if an interview cannot be saved or deleted.
* A user is shown a status indicator while asynchronous operations are in progress.
* When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
* The application makes API requests to load and persist data. We do not lose data after a browser refresh.

!["Appointment Form"](https://github.com/Chris-Tate94/Scheduler/blob/master/docs/appointment-form.png?raw=true)

!["Homepage with a confirmation notice and a different day hovered "](https://github.com/Chris-Tate94/Scheduler/blob/master/docs/confirmation-and-diff-day-highlighted.png?raw=true)

!["Homepage with an appointment booked and an appropriate error message ](https://github.com/Chris-Tate94/Scheduler/blob/master/docs/home-page-with-booked-appt-and-error.png?raw=true)
