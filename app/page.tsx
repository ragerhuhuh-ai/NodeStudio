'use client';
import { useState } from 'react';
export default function LoginPage() {
  const [email,setEmail] = useState('')
  const [password,setPassword] =useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function handleSubmit(e: React.FormEvent) {
    
    e.preventDefault();
    setError("");
    setLoading(true);

    try{
      const res = await fetch("/api/auth/login", {
        method: 'POST',
        headers:{ 'Content-type': 'application/json'
        },
        body: JSON.stringify({email,password}),
      });


      if (res.status === 401) {
        setError ('Неверная почта или пароль');
        return;
      }


        if (!res.ok) {
          setError('Ошибка сервера');
        return;
        }


         alert ('Успеншный вход через SSO!');
        } catch {
          setError('Не удалось покдлючиться к серверу');

        } finally {
          setLoading(false);

        }
       }

//разделение 

       async function handleForgot() {
      if (!email){
        setError('Введите почтуm,чтобы восстановить пароль');
        return;
      }

      setError('');
      setLoading(true);

      try {
        const res = await fetch('/api/auth/forgot', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        alert(data.message);
      }catch{
        setError('Не удалось отправить письмо');
      } finally{
        setLoading(false);
      }
      
    }
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black">
      <form onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-80">

  <div className="text-center text-2xl mb-2"><b>Node</b>Studio</div>

      <input
  type="email"
  placeholder="Почта"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#554288]"
/>

<input
  type="password"
  placeholder="Пароль"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#554288]"
/>

{error && <div className="text-red-500 text-sm text center">{error} </div>}

       <button 
       type="button"
       onClick={handleForgot}
       disabled={loading}
       className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#554288]"> Забыли пароль? </button>

       <button type="submit"
       disabled={loading}
       className="bg-[#554288] text-white py-3 rounded-xl disabled:opacity-50"
       >
        {loading ? 'Отпрвавка данных...': 'Войти через SSO'}
       
       </button>

      </form>
    </main>
    
 )        
 
 }
