export async function POST(req:Request) {
    const {email, password} = await req.json();
    
//ждем 2 секнуды для ожидании формы ('Отправка данных')
await new Promise((r) => setTimeout(r,2000));

//if password 12345, to go next 
if (password === '12345'){
    return Response.json ({ ok:true}, { status:200
    });

}
//иначе возвращаем ошибку 401 (Неверный ввод пароля)
return Response.json({message:'Неверный пароль'},
    {status:401});
}