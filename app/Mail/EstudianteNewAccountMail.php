<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EstudianteNewAccountMail extends Mailable
{
    use Queueable, SerializesModels;
    public $password='';
    public $nombres='';
    public $email ='';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($password, $nombres,$email)
    {
        $this->password = $password;
        $this->nombres = $nombres;
        $this->email =$email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('EstudianteNewAccountMail',['password'=>$this->password, 'nombres'=>$this->nombres,'email'=>$this->email]);
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    // public function envelope()
    // {
    //     return new Envelope(
    //         subject: 'Estudiante New Account Mail',
    //     );
    // }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    // public function content()
    // {
    //     return new Content(
    //         view: 'view.name',
    //     );
    // }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    // public function attachments()
    // {
    //     return [];
    // }
}
