export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_JWT = 'SET_JWT'
export const SET_CURRENT_TASK = 'SET_CURRENT_TASK'
export const SET_NEXT_TASK = 'SET_NEXT_TASK'
export const SET_NEXT_BREAK_DUR = 'SET_NEXT_BREAK_DUR'
export const SET_TASKS = 'SET_TASKS'

export function setUsername(name) {
  return { type: SET_USER_NAME, name }
}

export function setJWT(jwt) {
  return { type: SET_JWT, jwt }
}

export function setCurrentTask(id) {
  return { type: SET_CURRENT_TASK, id}
}

export function setNextTask(id) {
  return { type: SET_NEXT_TASK, id }
}

export function setNextBreakDur(dur) {
  return { type: SET_NEXT_BREAK_DUR, dur}
}

export function setTasks(tasks) {
  return { type: SET_TASKS, tasks}
}