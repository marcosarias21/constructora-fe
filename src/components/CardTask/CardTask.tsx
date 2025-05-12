// CardTask.tsx
import { Task } from '@/types'
import { Button } from '../ui/button'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

type Props = {
  index: number
  _id: string
  description: string
  location: string
  status: 'Pending' | 'In progress' | 'Completed'
  completedOnTime?: boolean
}

const CardTask: React.FC<Props> = ({
  index,
  _id,
  description,
  location,
  status,
  completedOnTime,
}) => {
  const l = useLocation()

  const startTask = async () => {
    await axios.put(`http://localhost:8000/task/startTask/${_id}`, {})
    alert('Se empezó el trabajo')
  }

  const endTask = async () => {
    const endedTaskResp = await axios.put(
      `http://localhost:8000/task/endTask/${_id}`,
      {},
    )
    if (endedTaskResp.status === 200) alert('Se terminó el trabajo')
  }

  return (
    <div className="rounded-xl bg-zinc-800 p-4 text-white shadow-md transition hover:shadow-lg">
      <h3 className="mb-2 text-lg font-semibold">Tarea #{index + 1}</h3>
      <p className="text-sm">Descripción: {description}</p>
      <p className="text-sm">Lugar: {location}</p>
      <p
        className={`text-sm font-medium ${status === 'In progress' ? 'text-yellow-400' : status === 'Completed' ? 'text-green-400' : 'text-gray-300'}`}
      >
        Estado: {status}
      </p>
      {status === 'Completed' && (
        <p
          className={`${completedOnTime ? 'text-green-400' : 'text-red-400'} text-sm`}
        >
          {completedOnTime ? '✔ En tiempo' : '✖ Fuera de tiempo'}
        </p>
      )}
      <div className="mt-4">
        {l.pathname === '/dashboard' && status === 'Pending' && (
          <Button className="w-full" onClick={startTask}>
            Empezar
          </Button>
        )}
        {l.pathname === '/dashboard' && status === 'In progress' && (
          <Button
            className="w-full bg-green-600 hover:bg-green-500"
            onClick={endTask}
          >
            Finalizar
          </Button>
        )}
      </div>
    </div>
  )
}

export default CardTask
