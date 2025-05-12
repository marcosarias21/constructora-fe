import { CardTask } from '@/components/CardTask'
import { ModalAdminTask } from '@/components/ModalAdminTask'
import { Sidebar } from '@/components/Siderbar'
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

  const getWorkers = async () => {
    const workersResp = await axios.get('http://localhost:8000/user/workers')
    setWorkers(workersResp.data?.workers)
  }

  const getTasks = async () => {
    const tasksResp = await await axios.get('http://localhost:8000/task')
    setAllTasksData(tasksResp.data.allTasks)
  }

  useEffect(() => {
    getWorkers()
    getTasks()
    if (user?.role != 'Admin') navigate('/dashboard')
  }, [])
  console.log(user)

  return (
    <div className="grid grid-cols-1 bg-[#1a1a1a] px-4 py-2 text-gray-200 lg:grid-cols-12">
      <aside className="mb-4 h-[calc(100vh-2rem)] rounded-2xl border border-white/10 bg-[#212121] p-4 shadow-lg lg:col-span-2 lg:mr-4 lg:mb-0">
        <Sidebar />
      </aside>

      <main className="rounded-2xl border border-white/10 bg-[#212121] p-6 shadow-lg lg:col-span-10">
        <header className="mb-6">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
            Panel de Administrador
          </h2>
          <p className="text-sm text-gray-400">
            Bienvenido {user?.firstName}, aqui podras administrar las tareas de
            los trabajadores.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#2a2a2a] p-4 transition-shadow hover:shadow-xl">
            <ModalAdminTask />
          </div>
          {allTasksData.map((task, i) => (
            <CardTask key={i} index={i} {...task} />
          ))}
        </section>
      </main>
    </div>
  )
}

export default DashboardAdmin
