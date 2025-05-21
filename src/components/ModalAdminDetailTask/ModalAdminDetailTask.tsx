import { Task } from '@/types'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ComboBoxWorkers } from '../ComboBoxWorkers'
import axios from 'axios'
import { useDataStore } from '@/store/dataStore'
import { toast } from 'sonner'

type Props = {
  task: Task
  onClose: () => void
}

const ModalAdminDetailTask: React.FC<Props> = ({ task, onClose }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { workersList } = useDataStore()
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { description: task.description, location: task.location },
  })

  const handleEdit = async (e: any) => {
    console.log(e)
    const hasChanged =
      e.description !== task.description || e.location !== task.location

    if (!hasChanged) {
      toast.info('No se detectaron cambios.')
      return
    }

    const taskEditResp = await axios.put(
      `http://localhost:8000/task/editTask/${task._id}`,
      { ...e, assignees: workersList },
      { headers: { 'Content-Type': 'application/json' } },
    )
    console.log(taskEditResp.data)
    if (taskEditResp.status === 200) {
      toast.success('Tarea editada con exito!')
      setIsEdit(false)
    }
  }

  const handleClose = () => {
    reset({
      description: task.description,
      location: task.location,
    })
    setIsEdit(false)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-[80vh] w-full max-w-md flex-col rounded-xl border border-white/10 bg-[#2a2a2a] shadow-lg">
        {/* Header */}
        <div className="flex flex-col border-b border-white/10 p-6">
          <div className="min-h-[1rem]">
            {isEdit && (
              <p className="text-xs text-green-500">Modo de edicion de tarea</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Estacion</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              &times;
            </button>
          </div>
        </div>
        {/* Contenido con scroll */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6 text-gray-400">
          <div>
            <h4 className="text-sm">Descripcion</h4>
            <input
              className="w-full text-sm"
              {...register('description')}
              readOnly={!isEdit}
            />
          </div>
          <div>
            <h4 className="text-sm">Ubicación</h4>
            <input
              className="w-full text-sm"
              {...register('location')}
              readOnly={!isEdit}
            />
          </div>
          <div>
            <h4 className="text-sm">Estado</h4>
            <p
              className={`w-full text-sm font-medium ${
                task.status === 'In progress'
                  ? 'text-red-500'
                  : task.status === 'Completed'
                    ? 'text-green-500'
                    : 'text-gray-400'
              }`}
            >
              {task.status}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Asignados:</p>
            <div className="mt-2 flex flex-col gap-2">
              {isEdit ? (
                task.assignees.map((user, index) => (
                  <ComboBoxWorkers {...user} isEdit={isEdit} i={index} />
                ))
              ) : (
                <div className="flex w-fit flex-col gap-2">
                  {task.assignees.map((user) => (
                    <Button disabled>
                      {user.firstName} {user.lastName}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            {task.status === 'Completed' && (
              <div>
                <p className="text-sm text-gray-400">Completado a tiempo</p>
                <p
                  className={
                    task.completedOnTime ? 'text-green-500' : 'text-red-500'
                  }
                >
                  {task.completedOnTime ? 'Sí' : 'No'}
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <div className="flex justify-between">
            {isEdit ? (
              <div className="flex gap-2">
                <Button
                  className="bg-green-500 hover:bg-green-400"
                  onClick={handleSubmit(handleEdit)}
                >
                  Guardar
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="bg-red-500"
                >
                  Cancelar Cambios
                </Button>
              </div>
            ) : (
              <Button
                className="bg-green-500 hover:bg-green-400"
                onClick={() => setIsEdit(true)}
              >
                Editar
              </Button>
            )}

            <Button className="bg-red-500 hover:bg-red-400" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAdminDetailTask
