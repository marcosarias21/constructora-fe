export interface User {
  _id: string
  username: string
  password: string
  firstName: string
  lastName: string
  role: string
}

interface UserSender {
  _id: string
  firstName: string
  lastName: string
}

interface NoteContent {
  sender: UserSender
  content: string
}

export interface Task {
  _id: string
  station: string
  incidence?: number
  description: string
  location: string
  estimatedTime: number
  startDateTime: Date
  enDateTime: Date
  status: string
  assignees: User[]
  notes: NoteContent[]
  completedOnTime: boolean
}
