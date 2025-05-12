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
import { useForm } from 'react-hook-form'
import { useDataStore } from '@/store/dataStore'
import axios from 'axios'

const ModalAdminTask = () => {
  const { register, handleSubmit } = useForm()
  const { selectedWorkers } = useDataStore()
  const [assignessArray, setAssignessArray] = useState(Array(1).fill(null))

  const addWorker = () => setAssignessArray([...assignessArray, null])
  const deleteWorker = () => {
    if (assignessArray.length > 1) {
      setAssignessArray(assignessArray.slice(0, -1))
    } else {
      alert('Se requiere al menos un trabajador')
    }
  }

  interface TaskFormData {
    description: string
    location: string
    estimatedTime: number
  }

  const onSubmit = async (data: TaskFormData) => {
    const response = await axios.post(
      'http://localhost:8000/task/createTask',
      { ...data, assignees: selectedWorkers },
      { headers: { 'Content-Type': 'application/json' } },
    )
    if (response.data.message) alert(response.data.message)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-md bg-yellow-400 px-4 py-2 text-white shadow hover:bg-yellow-300">
          Crear tarea
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg bg-zinc-900 text-white shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Crear Nueva Tarea
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Completa los campos para asignar una nueva tarea.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <Label>Descripción</Label>
            <Input
              type="text"
              placeholder="Arreglar aire acondicionado..."
              className="border border-zinc-700 bg-zinc-800 text-white"
              {...register('description')}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Dirección</Label>
              <Input
                type="text"
                placeholder="Rivadavia 1200..."
                className="border border-zinc-700 bg-zinc-800 text-white"
                {...register('location')}
              />
            </div>
            <div className="flex-1">
              <Label>Tiempo estimado (horas)</Label>
              <Input
                type="number"
                placeholder="2"
                className="border border-zinc-700 bg-zinc-800 text-white"
                {...register('estimatedTime')}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label>Asignar trabajadores</Label>
              <div className="space-x-2">
                <Button type="button" onClick={addWorker} className="px-2">
                  +
                </Button>
                <Button type="button" onClick={deleteWorker} className="px-2">
                  -
                </Button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {assignessArray.map((_, idx) => (
                <ComboBoxWorkers key={idx} />
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="rounded-md bg-yellow-400 px-4 py-2 text-white hover:bg-yellow-300"
            >
              Crear tarea
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAdminTask
