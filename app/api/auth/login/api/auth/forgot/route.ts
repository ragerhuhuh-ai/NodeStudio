export async function POST(req:Request) {
    const {email} = await req.json();

    await new Promise((r) => setTimeout(r, 1500))

    return Response.json(
        {message:'Писмьмо для сброса пароля отправлено на ${email}'},
        {status:200}
    );
    
}