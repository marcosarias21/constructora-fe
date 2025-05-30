import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { useDataStore } from '@/store/dataStore'
import { User } from '@/types'

interface Prop {
  _id?: string
  firstName?: string
  lastName?: string
  isEdit?: boolean
  i: number
}

const ComboBoxWorkers: React.FC<Prop> = ({ _id, i }) => {
  const {
    workers,
    setSelectedWorkers,
    selectedWorkers,
    setWorkersList,
    replaceWorkerAtIndex,
  } = useDataStore()
  const [open, setOpen] = useState(false)
  const [selectAssigneed, setSelectAssigneed] = useState<User>()
  const selectedWorker = workers?.find((w) => w._id == _id)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const toggleWorkers = (index: number, worker: User) => {
    setSelectAssigneed(worker)
    replaceWorkerAtIndex(i, worker)
    const updated = [...selectedWorkers]
    updated[index] = worker
    setSelectedWorkers(updated)
    setCurrentIndex(index)
  }

  useEffect(() => {
    setSelectAssigneed(selectedWorker)
    selectedWorker && setWorkersList(selectedWorker)
  }, [selectedWorker])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedWorker
            ? `${selectAssigneed?.firstName} ${selectAssigneed?.lastName}`
            : selectedWorkers.length > 0
              ? `${selectedWorkers[currentIndex]?.firstName} ${selectedWorkers[currentIndex]?.lastName}`
              : 'Selecciona un trabajador...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar un trabajador..." className="h-9" />
          <CommandList>
            <CommandGroup>
              {workers?.map((worker, index) => (
                <CommandItem
                  key={worker._id}
                  onSelect={() => toggleWorkers(index, worker)}
                >
                  {worker.firstName} {worker.lastName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboBoxWorkers
