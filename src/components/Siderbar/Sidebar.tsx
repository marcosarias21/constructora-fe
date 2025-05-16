import { useAuthStore } from '@/store/authStore'
import {
  ArrowBigLeft,
  Check,
  House,
  Logs,
  ShieldUser,
  User,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const { user } = useAuthStore()
  const { pathname } = useLocation()
  const basePath = user?.role === 'Admin' ? 'admin' : 'user'

  const handleSignOut = () => {
    useAuthStore.persist.clearStorage()
    useAuthStore.setState({ user: null, token: null })
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="r mt-10 flex w-full items-center gap-4">
        <div className="flex">
          <span className="rounded-full border-2 border-white/65 px-4 py-4">
            {user?.role === 'Admin' ? (
              <ShieldUser className="text-amber-500" />
            ) : (
              <User />
            )}
          </span>
        </div>
        <div className="flex flex-col gap-1 text-lg tracking-wide">
          <div className="flex max-w-[120px] gap-1 font-medium break-words">
            <h4 className="break-words">
              {user?.firstName} {user?.lastName}
            </h4>
          </div>
          <div className="text-sm">
            <p>Rol: {user?.role}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full cursor-pointer flex-col items-center">
        <Link
          to={`/${basePath}/home`}
          className={`flex w-full gap-2 rounded px-2 py-2 hover:bg-white/30 ${pathname === `/${basePath}/home` && 'bg-white/30'}`}
        >
          <House className="h-5 w-5" />
          <span className="text-sm">Home</span>
        </Link>
        <Link
          to={`/${basePath}/important-tasks`}
          className={`flex w-full gap-2 rounded px-2 py-2 hover:bg-white/30 ${pathname === `/${basePath}/important-tasks` && 'bg-white/30'}`}
        >
          <Logs className="h-5 w-5" />
          <span className="text-sm">Importantes</span>
        </Link>
        <Link
          to={`/${basePath}/completed-tasks`}
          className={`flex w-full gap-2 rounded px-2 py-2 hover:bg-white/30 ${pathname === `/${basePath}/completed-tasks` && 'bg-white/30'}`}
        >
          <Check className="h-5 w-5" />
          <span className="text-sm">Completadas!</span>
        </Link>
      </div>

      <div
        className="mb-4 flex cursor-pointer items-center justify-center rounded-md border-2 border-white/25 bg-inherit py-6 font-bold text-gray-300 hover:bg-white/30"
        onClick={() => handleSignOut()}
      >
        <ArrowBigLeft />
        <span>Sign Out</span>
      </div>
    </div>
  )
}

export default Sidebar
