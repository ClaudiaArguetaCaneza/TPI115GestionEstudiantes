<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
</head>
<body>
    <h2>Hola {{ $nombres }}, gracias por registrarte en <strong>Attendance app</strong> !</h2>
    <p>Por favor confirma tu correo electrónico.</p>
    <p>Para ello, dirigete al sitio y accede a la opción <b>"Confirmar Cuenta"</b></p>
    <p>Luego ingresa el siguiente codigo: <b>{{$confirmation_code}}</b></p>

    <!-- <a href="{{ url('/register/verify/' . $confirmation_code) }}">
        Clic para confirmar tu email
    </a> -->
</body>
</html>
