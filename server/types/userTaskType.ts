export interface UserTaskType {
  user_id: string;
  task_id: string;
}

export interface UserTasksDueType extends UserTaskType {
  due_date: string;
}
