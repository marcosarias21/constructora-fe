import { CardTask } from '@/components/CardTask'
import ModalAdminDetailTask from '@/components/ModalAdminDetailTask/ModalAdminDetailTask'
import { ModalAdminTask } from '@/components/ModalAdminTask'
import { Sidebar } from '@/components/Siderbar'
import MobileSidebar from '@/components/Siderbar/MobileSidebar'
import { useAuthStore } from '@/store/authStore'
import { useDataStore } from '@/store/dataStore'
import { Task } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardAdmin = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { setWorkers } = useDataStore()
  const [allTasksData, setAllTasksData] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const getWorkers = async () => {
    const workersResp = await axios.get('http://localhost:8000/user/workers')
    setWorkers(workersResp.data?.workers)
  }

  const getTasks = async () => {
    const tasksResp = await axios.get('http://localhost:8000/task')
    setAllTasksData(tasksResp.data.allTasks)
  }

  useEffect(() => {
    getWorkers()
    getTasks()
    if (user?.role != 'Admin') navigate('/dashboard')
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200">
      <div className="flex">
        <aside className="hidden h-screen w-64 flex-shrink-0 border-r border-white/10 bg-[#212121] p-4 lg:block">
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 lg:p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Panel</h1>
                <p className="text-sm text-gray-400">
                  Administrador Principal • Rol: {user?.role}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Aquí podrás gestionar y crear tareas.
            </p>
            <div className="lg:hidden">
              <MobileSidebar />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-gray-800 p-4 transition-shadow hover:bg-gray-700 hover:shadow-xl">
              <ModalAdminTask />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allTasksData.map((task, i) => (
                <CardTask
                  key={i}
                  index={i}
                  {...task}
                  onClick={() => setSelectedTask(task)}
                />
              ))}
            </div>
          </div>

          {selectedTask && (
            <ModalAdminDetailTask
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default DashboardAdmin
