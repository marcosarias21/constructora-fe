import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { ComboBoxWorkers } from '../ComboBoxWorkers'
import { FieldErrors, useForm } from 'react-hook-form'
import { useDataStore } from '@/store/dataStore'
import axios from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { stations } from '@/helpers/stationArray'
import { taskSchema } from '@/schemas/formSchema'

type TaskFormData = z.infer<typeof taskSchema>

type Prop = {
  getTasks: () => void
}

const ModalAdminTask: React.FC<Prop> = ({ getTasks }) => {
  const { register, handleSubmit, reset } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
  })

  const { selectedWorkers } = useDataStore()
  const [assignessArray, setAssignessArray] = useState(Array(1).fill(null))
  const [isOpen, setIsOpen] = useState(false)

  const addWorker = () => {
    setAssignessArray([...assignessArray, null])
  }
  const deleteWorker = () => {
    if (assignessArray.length > 1) {
      setAssignessArray(assignessArray.slice(0, -1))
    } else {
      toast.error('Se requiere un trabajador como minimo')
    }
  }
  const onSubmit = async (data: z.infer<typeof taskSchema>) => {
    try {
      if (selectedWorkers.length < 1) {
        toast.error('Debes asignar al menos un trabajador')
        return
      }

      await axios.post('http://localhost:8000/task/createTask', {
        ...data,
        assignees: selectedWorkers,
      })

      toast.success('¡Tarea creada con éxito!')
      getTasks()
      reset()
      setAssignessArray([null])
      setIsOpen(false)
    } catch (error) {
      toast.error('Error al crear la tarea. Intentalo de nuevo.')
    }
  }

  const onInvalid = (errors: FieldErrors<TaskFormData>) => {
    const values = Object.values(errors)
    if (values.length > 0 && values[0]?.message) {
      toast.error(values[0].message)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="m-0 flex h-full w-full items-center justify-center p-0 text-xl font-medium">
        <span className="tracking-wider">+ Crear Tarea</span>
      </DialogTrigger>
      <DialogContent className="border border-white/10 bg-[#2a2a2a] text-gray-300 shadow-lg">
        <DialogHeader className="border-b border-white/10 pb-4">
          <DialogTitle className="text-xl font-bold text-white">
            Creador de Tareas
          </DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleSubmit(onSubmit, onInvalid)}
              className="flex flex-col gap-4"
            >
              <div className="mt-2 flex flex-col gap-2">
                <Label className="text-gray-400">Seleccione estacion:</Label>
                <select
                  className="block w-full rounded-md border border-white/10 bg-[#1e1e1e] px-2 py-2 text-white focus:border-gray-500"
                  {...register('station')}
                >
                  {stations.map((station) => (
                    <option value={station}>{station}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-gray-400">
                  Nro Incidencia (Opcional)
                </Label>
                <Input
                  type="number"
                  placeholder="400090000..."
                  className="border border-white/10 bg-[#1e1e1e] text-white"
                  {...register('incidence')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-gray-400">Descripcion</Label>
                <Input
                  type="text"
                  placeholder="Arreglar aire acondicionado..."
                  className="border border-white/10 bg-[#1e1e1e] text-white"
                  {...register('description', { required: true })}
                />
              </div>
              <div className="flex w-full gap-2">
                <div className="flex w-full flex-col gap-1">
                  <Label className="text-gray-400">Direccion</Label>
                  <Input
                    type="text"
                    placeholder="Rivadavia 1200..."
                    className="border border-white/10 bg-[#1e1e1e] text-white"
                    {...register('location', { required: true })}
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Label className="text-gray-400">Tiempo:</Label>
                  <Input
                    type="number"
                    placeholder="2 horas"
                    className="border border-white/10 bg-[#1e1e1e] text-white"
                    {...register('estimatedTime', { required: true })}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex justify-between gap-2">
                  <Label className="text-gray-400">Asigna trabajadores:</Label>
                  <div className="flex justify-end gap-1">
                    <Button
                      type="button"
                      className="h-8 w-8 border border-white/10 bg-[#2a2a2a] font-extrabold text-blue-400 hover:bg-[#1e1e1e]"
                      onClick={addWorker}
                    >
                      +
                    </Button>
                    <Button
                      type="button"
                      className="h-8 w-8 border border-white/10 bg-[#2a2a2a] font-extrabold hover:bg-[#1e1e1e]"
                      onClick={deleteWorker}
                    >
                      -
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-wrap gap-2">
                  {assignessArray.map((_, i) => (
                    <ComboBoxWorkers key={i} i={i} />
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-green-500 text-white hover:bg-green-400"
                >
                  Crear Tarea
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAdminTask
