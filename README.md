dafmContactList
===============

Just follow these simple steps to run the DAFM Contact List:

1. First of all, to download all modules used on this project
```shell
	npm install
```
2. Generate files from Compass ( You need to have Ruby and Compass installed )
```shell
    grunt style
``` 
3. Almost there, just execute the next command and you are can see the Contact List
```shell
    grunt server
```
> Optional steps (Tests)
4. To run the Karma/Jasmine test
```shell
	grunt test-jasmine
```
5. To run the Protractor test ( You need to use 2 terminals )
```shell
	grunt server 
```    
```shell
    grunt test-protractor
```
