import { useState } from 'react'
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

const ComboBoxWorkers = () => {
  const { workers, setSelectedWorkers, selectedWorkers } = useDataStore()
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const toggleWorkers = (index: number, worker: User) => {
    const existWorker = selectedWorkers.some((w) => w._id === worker._id)
    if (existWorker) {
      alert('Ya asignaste este trabajador')
    } else {
      const updated = [...selectedWorkers]
      console.log(updated)
      updated[index] = worker
      setSelectedWorkers(updated)
      setCurrentIndex(index)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-zinc-800"
        >
          {selectedWorkers.length > 0
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
