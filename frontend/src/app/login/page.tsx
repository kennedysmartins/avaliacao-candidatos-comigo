import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col justify-center px-8 md:w-1/2">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6">Entre na sua conta</h2>
          <p className="text-gray-600 mb-8">
            Boas-vindas! Por favor, insira suas credenciais para acessar os sistemas da Comigo.
          </p>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="E-mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Senha"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Mantenha-me conectado
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary">
                  Esqueci minha senha
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-primary">
        <div className="flex items-center justify-center h-full">
          <Image
            src="/login.svg"
            alt="Login illustration"
            width={400}
            height={400}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  )
}