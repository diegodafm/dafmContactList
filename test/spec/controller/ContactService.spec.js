describe( 'ContactService - Testing Add and Edit', function () {

    var myService, contacts;

    beforeEach( module( 'dafmContactList' ) );


    beforeEach( inject( function ( ContactService ) {
        contactService = ContactService;
        contacts = contactService.getAllContacts();
    } ) );

    it( 'Should start with empty contact list', function () {
        expect( contacts.length ).toEqual( 0 );
    } );

    it( 'Should add a contact', function () {
        var contact = {
            id: 1,
            name: 'Diego DAFM',
            phone: '+55 3182079696',
            Address: 'Tropical Avenue, 2790'
        };
        contactService.add( contact );

        expect( contactService.getAllContacts().length ).toEqual( 1 );
    } );

    it( 'should edit contact', function () {
        var contact = contactService.getAllContacts()[ 0 ];
        var name = contact.name;

        contact.name = 'Diego Alisson Fernandes de Mendonca';
        contactService.edit( contact );

        var editedContact = contactService.getAllContacts()[ 0 ];
        expect( editedContact.name ).not.toEqual( 'Diego DAFM' );

    } );

    it( 'should delete contact', function () {

        var contact = contactService.getAllContacts()[ 0 ];
        contactService.remove( contact );
        expect( contactService.getAllContacts().length ).toEqual( 0 );

    } );

} );
