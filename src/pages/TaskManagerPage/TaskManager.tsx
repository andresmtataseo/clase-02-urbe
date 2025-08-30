import { useEffect, useState } from "react"

const TaskManager = () => {

  const [taskCounter, setTaskCounter ] = useState(0);
  const [timeCounter, setTimeCounter ] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
        setTimeCounter(prev => prev + 1)
    }, 1000);

    return () => {
        clearInterval(intervalId)
    } 
  }, [])

  const getProgressPercent = () => {
    const maxTasks = 10;
    return Math.min((taskCounter / maxTasks) * 100, 100);
  }

  return (
    <div className="min-h-screen p-4 ">
      <div className="max-w-4xl mx-auto">

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="#fff" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957"/><path fill="#e3e3e3" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M4.826 1v4.304M9.609 1v4.304M14.391 1v4.304M19.174 1v4.304M9.609 7.696l-2.87 2.87L5.305 9.13m4.304 3.827l-2.87 2.87l-1.434-1.436m6.217-4.782h6.217m-6.217 4.782h6.217" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z" strokeWidth="1"/></g></svg>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Gestion de Tareas
          </h1>
          <p className=" text-lg"> Sistema de control de actividades</p>

        </div>

        {/*Cards de Stats */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="card shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <div className="card-body text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="#fff" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957"/><path fill="#e3e3e3" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M4.826 1v4.304M9.609 1v4.304M14.391 1v4.304M19.174 1v4.304M9.609 7.696l-2.87 2.87L5.305 9.13m4.304 3.827l-2.87 2.87l-1.434-1.436m6.217-4.782h6.217m-6.217 4.782h6.217" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z" strokeWidth="1"/></g></svg>
              </div>

              <h3 className="card-title justify-center">Tareas Completadas</h3>

              <div className="text-4xl font-bold text-green-600">{ taskCounter }</div>
            </div>
          </div>

          <div className="card shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <div className="card-body text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="#fff" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957"/><path fill="#e3e3e3" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M4.826 1v4.304M9.609 1v4.304M14.391 1v4.304M19.174 1v4.304M9.609 7.696l-2.87 2.87L5.305 9.13m4.304 3.827l-2.87 2.87l-1.434-1.436m6.217-4.782h6.217m-6.217 4.782h6.217" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z" strokeWidth="1"/></g></svg>
              </div>

              <h3 className="card-title justify-center">Tiempo Transcurrido</h3>

              <div className="text-4xl font-bold text-blue-600">{ timeCounter }</div>
            </div>
          </div>

        </div>

        {/* <!--* Botones de acciones --> */}
        <div className="card shadow-xl border-0 mb-8">
          <div className="card-body">
            <h3 className="card-title mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="#fff" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957"/><path fill="#e3e3e3" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M4.826 1v4.304M9.609 1v4.304M14.391 1v4.304M19.174 1v4.304M9.609 7.696l-2.87 2.87L5.305 9.13m4.304 3.827l-2.87 2.87l-1.434-1.436m6.217-4.782h6.217m-6.217 4.782h6.217" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z" strokeWidth="1"/></g></svg>
              Acciones
            </h3>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform duration-200" onClick={() => setTaskCounter(taskCounter + 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="#fff" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957"/><path fill="#e3e3e3" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M4.826 1v4.304M9.609 1v4.304M14.391 1v4.304M19.174 1v4.304M9.609 7.696l-2.87 2.87L5.305 9.13m4.304 3.827l-2.87 2.87l-1.434-1.436m6.217-4.782h6.217m-6.217 4.782h6.217" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z" strokeWidth="1"/></g></svg>
                Completar Tarea
              </button>

              <button className="btn btn-secondary btn-lg shadow-lg hover:scale-105 transition-transform duration-200"  onClick={() => setTaskCounter(taskCounter > 0 ? taskCounter - 1 : 0)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="#fff" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957"/><path fill="#e3e3e3" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M4.826 1v4.304M9.609 1v4.304M14.391 1v4.304M19.174 1v4.304M9.609 7.696l-2.87 2.87L5.305 9.13m4.304 3.827l-2.87 2.87l-1.434-1.436m6.217-4.782h6.217m-6.217 4.782h6.217" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z" strokeWidth="1"/></g></svg>
                Deshacer
              </button>

              <button className="btn btn-error btn-lg shadow-lg hover:scale-105 transition-transform duration-200"  onClick={() => setTaskCounter(0)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="#fff" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957"/><path fill="#e3e3e3" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M4.826 1v4.304M9.609 1v4.304M14.391 1v4.304M19.174 1v4.304M9.609 7.696l-2.87 2.87L5.305 9.13m4.304 3.827l-2.87 2.87l-1.434-1.436m6.217-4.782h6.217m-6.217 4.782h6.217" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z" strokeWidth="1"/></g></svg>
                Reiniciar
              </button>
            </div>
          </div>
        </div>

        {/* // <!-- TODO. Panel de informacion --> */}
        <div className="card bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-2xl border-0">
          <div className="card-body">
            <h4 className="card-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="#fff" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957"/><path fill="#e3e3e3" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M4.826 1v4.304M9.609 1v4.304M14.391 1v4.304M19.174 1v4.304M9.609 7.696l-2.87 2.87L5.305 9.13m4.304 3.827l-2.87 2.87l-1.434-1.436m6.217-4.782h6.217m-6.217 4.782h6.217" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.044 3.87v13.39H17.26a.957.957 0 0 0-.957.957V23H2.914a.956.956 0 0 1-.957-.957V3.87a.957.957 0 0 1 .956-.957h18.174a.956.956 0 0 1 .957.957" strokeWidth="1"/><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.043 17.26L16.304 23v-4.783a.957.957 0 0 1 .957-.956z" strokeWidth="1"/></g></svg>
              Informacion del sistema
            </h4>

            <p className="text-indigo-100 mb-6">
              Este panel muestra estadisticas en tiempo real de las actividades gestionadas.
            </p>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progreso</span>
                {/* <!-- TODO: Metodo que devuelva el porcentaje --> */}
                <span className="text-sm font-bold">{ getProgressPercent() }%</span>
              </div>

              <div  className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounder-full transition-all duration-500 ease-in-out shadow-inner"
                  style={{width: `${getProgressPercent()}%`}}
                  >
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{ taskCounter }</div>
                  <div className="text-xs text-indigo-200">Total Tareas</div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{ timeCounter }</div>
                  <div className="text-xs text-indigo-200">Segundos</div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default TaskManager
