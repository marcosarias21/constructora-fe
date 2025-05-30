import { ModalAdminTask } from '@/components/ModalAdminTask'
import { Sidebar } from '@/components/Siderbar'
import { useAuthStore } from '@/store/authStore'
import { useDataStore } from '@/store/dataStore'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardAdmin = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { setWorkers } = useDataStore()

  const getWorkers = async () => {
    const workersResp = await axios.get('http://localhost:8000/user/workers')
    setWorkers(workersResp.data?.workers)
  }
  useEffect(() => {
    getWorkers()
    if (user?.role != 'Admin') navigate('/dashboard')
  }, [])

  return (
    <div className="grid grid-cols-1 bg-[#1a1a1a] px-4 py-2 text-gray-200 lg:grid-cols-12">
      <aside className="mb-4 h-[calc(100vh-2rem)] rounded-2xl border border-white/10 bg-[#212121] p-4 shadow-lg lg:col-span-2 lg:mr-4 lg:mb-0">
        <Sidebar />
      </aside>

      <main className="rounded-2xl border border-white/10 bg-[#212121] p-6 shadow-lg lg:col-span-10">
        <header className="mb-6">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
            Admin Dashboard
          </h2>
          <p className="text-sm text-gray-400">
            Manage your tasks efficiently and with style.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#2a2a2a] p-4 transition-shadow hover:shadow-xl">
            <ModalAdminTask />
          </div>
          {[...Array(21)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-[#2a2a2a] p-4 transition-shadow hover:shadow-xl"
            >
              <h3 className="mb-2 text-lg font-semibold">Task {i + 1}</h3>
              <p className="text-sm text-gray-400">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default DashboardAdmin
