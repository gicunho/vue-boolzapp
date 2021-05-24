const app = new Vue({
    el: '#root',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        conversazioneAttuale: [],
        utenteAttivo: [],
        numeroUtente: null,
        messaggio: '',
        ricercaContatto: '',
        contactsFiltered: [],
    }, // data
    methods: {
        selezioneContatto(index) {
            document.getElementById('error').innerHTML = '';

            this.conversazioneAttuale = [];
            this.conversazioneAttuale.push(this.contattiFiltrati[index].messages);
            this.utenteAttivo = [];
            this.utenteAttivo.push(this.contattiFiltrati[index]);
            return this.numeroUtente = index
        },
        invioMessaggio(msg) {
            if (this.numeroUtente == null) {
                //alert('Attenzione, seleziona prima il contatto a cui inviare il messaggio')
                document.getElementById('error').innerHTML = 'seleziona prima il contatto a cui inviare il messaggio';
            } else if (this.messaggio.length === 0) {
                //alert('inserire almeno un carattere');
                document.getElementById('error').innerHTML = 'inserire almeno un carattere';

            } else {
                document.getElementById('error').innerHTML = '';
                let nuovoMessaggio = {};
                nuovoMessaggio.text = msg;
                nuovoMessaggio.status = 'sent';
                nuovoMessaggio.date = dayjs().format('DD/M/YYYY HH:mm:ss');
                this.contattiFiltrati[this.numeroUtente].messages.push(nuovoMessaggio);
                this.messaggio = '';
                setTimeout(() => {
                    let messaggioRisposta = {};
                    messaggioRisposta.text = 'ok!';
                    messaggioRisposta.status = 'received';
                    messaggioRisposta.date = dayjs().format('DD/M/YYYY HH:mm:ss');
                    this.contattiFiltrati[this.numeroUtente].messages.push(messaggioRisposta);
                }, 1000)
            }
        
        },
        lastMsgText(index) {
            return this.contattiFiltrati[index].messages[this.contattiFiltrati[index].messages.length - 1].text
        },
        lastMsgDate(index) {
            return this.contattiFiltrati[index].messages[this.contattiFiltrati[index].messages.length - 1].date
        },
        ulAccesso() {                
                return this.utenteAttivo[0].messages.filter((message, i) => {
                    if (message.status == 'received') {
                        console.log(message);
                        console.log(this.utenteAttivo[0].messages.length);
                    console.log(message.date, i);
                 return message                 }
                })
        }

        
    },
    
    computed: {
            contattiFiltrati() {
            return this.contacts.filter(contact => {
                return contact.name.toLowerCase().includes(this.ricercaContatto.toLowerCase());
            })
        },

    }
})
