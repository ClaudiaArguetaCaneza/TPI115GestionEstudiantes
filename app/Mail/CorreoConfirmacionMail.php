<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CorreoConfirmacionMail extends Mailable
{
    use Queueable, SerializesModels;
    public $confirmation_code='';
    public $nombres = '';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($confirmation_code, $nombres)
    {
        //
        $this->confirmation_code=$confirmation_code;
        $this->nombres=$nombres;
    }

    public function build()
    {
        return $this->view('CorreoConfirmacionMail',['confirmation_code'=>$this->confirmation_code, 'nombres'=>$this->nombres]);
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    // public function envelope()
    // {
    //     return new Envelope(
    //         subject: 'Correo Confirmacion Mail',
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
