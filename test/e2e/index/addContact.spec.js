describe( 'Shold add a new contact', function () {
    ptor = protractor.getInstance();

    beforeEach( function () {
        ptor.get( '#/' );

        button = ptor.findElement( protractor.By.className( 'btn-primary' ) );
        button.click();

    } );

    it( 'Should open a modal', function () {
        modal = ptor.findElement( protractor.By.className( 'modal' ) );
    } );

    it( 'Should click to cancel modal', function () {
        button = ptor.findElement( protractor.By.className( 'btn-warning' ) );
        button.click();
    } );
} );
