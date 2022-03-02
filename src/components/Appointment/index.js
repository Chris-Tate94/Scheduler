import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETEING = "DELETING";
  const ERROR_SAVE = "SAVE ERROR";
  const ERROR_DELETE = "DELETE ERROR";
  //const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function edit(id) {
    transition(EDIT);
  }

  function remove(id) {
    //transition(CONFIRM);
    transition(DELETEING, true);
    props
      .deleteInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.student}
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}

      {mode === SAVING && <Status message={SAVING} />}
      {mode === ERROR_SAVE && <Error message={"Could Not Save Appointment"} />}

      {/* {mode === CONFIRM && <Status message={CONFIRM} />} */}
      {mode === DELETEING && <Status message={DELETEING} />}
      {mode === ERROR_DELETE && (
        <Error message={"Could Not Delete Appointment"} />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit}
          onDelete={remove}
          appointmentId={props.id}
        />
      )}
    </article>
  );
}
