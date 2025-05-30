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
  const addWorker = () => {
    setAssignessArray([...assignessArray, null])
  }
  const deleteWorker = () => {
    if (assignessArray.length > 1) {
      setAssignessArray(assignessArray.slice(0, -1))
    } else {
      alert('Se requiere un trabajador como minimo')
    }
  }

  const onSubmit = async (e: any) => {
    const taskPostResp = await axios.post(
      'http://localhost:8000/task/createTask',
      { ...e, assignees: selectedWorkers },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(taskPostResp)
    if (taskPostResp.data.message) {
      alert(`${taskPostResp.data.message}`)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <span>+ Create task (Sale modal)</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="mt-2 flex flex-col gap-2">
                <Label>Descripcion</Label>
                <Input
                  type="text"
                  placeholder="Arreglar aire acondicionado..."
                  {...register('description')}
                />
              </div>
              <div className="flex w-full gap-2">
                <div className="flex w-full flex-col gap-1">
                  <Label>Direccion</Label>
                  <Input
                    type="text"
                    placeholder="Rivadavia 1200..."
                    {...register('location')}
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Label>Tiempo:</Label>
                  <Input
                    type="number"
                    placeholder="2 horas"
                    {...register('estimatedTime')}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex gap-2">
                  <Label>Asigna trabajadores:</Label>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      className="w-fit border-1 bg-white text-blue-400 hover:bg-inherit"
                      onClick={addWorker}
                    >
                      +
                    </Button>
                    <Button
                      type="button"
                      className="border-1 bg-white text-red-400 hover:bg-inherit"
                      onClick={deleteWorker}
                    >
                      -
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-wrap gap-2">
                  {assignessArray.map((_) => (
                    <ComboBoxWorkers />
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-400"
                >
                  Create Task
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
